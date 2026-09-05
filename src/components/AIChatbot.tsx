import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  AlertTriangle,
  Phone,
  Sparkles,
  ShieldAlert,
  Loader2,
  Clock,
  MapPin,
  Flame,
  Droplets,
  Wrench,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Headphones,
  FileText,
} from "lucide-react";
import { ChatMessage, QuoteFormData } from "../types";
import { COMPANY_INFO } from "../data/siteData";

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInlineLead, setShowInlineLead] = useState(false);
  const [leadForm, setLeadForm] = useState<Partial<QuoteFormData>>({
    name: "",
    phone: "",
    postcode: "",
    service: "Emergency Plumbing",
    urgency: "emergency",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: "msg-welcome-1",
      role: "assistant",
      content:
        "Hello! I'm Sarah, Senior Service Coordinator at My London Plumbers Ltd. How can I help you today?\n\nWhether you have an urgent burst pipe, boiler breakdown, heating issue, or need a transparent quote, I'm here 24/7 across all London boroughs.",
      timestamp: "Just now",
    },
    {
      id: "msg-gas-warning",
      role: "system",
      content:
        "⚠️ CRITICAL GAS SAFETY: If you smell gas, suspect a carbon monoxide leak, or hear hissing pipes, evacuate immediately, extinguish open flames, do not use light switches, and call our 24/7 dispatch at +44 7988 756241 or 0800 111 999.",
      timestamp: "Safety Active",
      isGasAlert: true,
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const quickActions = [
    { label: "🚨 Emergency Water Leak", prompt: "I have an urgent water leak / burst pipe. What should I do and how fast can a plumber arrive?" },
    { label: "🔥 Boiler Repair / No Heat", prompt: "My boiler stopped working and I have no heating or hot water. What is the diagnosis process?" },
    { label: "⚡ Same-Day Boiler Replacement", prompt: "I need an emergency boiler replacement quote. What are the options and warranty?" },
    { label: "📍 London Postcode Coverage", prompt: "Do you cover my London postcode and what is the typical emergency arrival time?" },
    { label: "💰 Pricing & Callouts", prompt: "What is your pricing structure and how do callouts work?" },
    { label: "📋 Book Engineer Callback", prompt: "I would like to arrange an engineer visit and request a quote." },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading, showInlineLead]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    // If user clicked or typed booking/quote, show inline lead form for ease
    const lower = text.toLowerCase();
    if (
      lower.includes("book") ||
      lower.includes("callback") ||
      lower.includes("quote") ||
      lower.includes("arrange")
    ) {
      setShowInlineLead(true);
    }

    try {
      const historyPayload = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: historyPayload,
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        "Thank you for contacting My London Plumbers Ltd. Our on-call engineers are available 24/7 across London. Please call us directly on +44 7988 756241 for immediate dispatch.";

      const isGasRelated =
        text.toLowerCase().includes("gas") ||
        text.toLowerCase().includes("smell") ||
        replyText.toLowerCase().includes("national gas emergency") ||
        replyText.toLowerCase().includes("gas safety");

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isGasAlert: isGasRelated,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          role: "assistant",
          content:
            "Thank you for contacting My London Plumbers Ltd. Our Gas Safe registered engineers are available 24/7 across all London boroughs. For immediate attendance, please call our dispatch team directly on +44 7988 756241.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
    setShowInlineLead(false);
    setLeadSuccess(false);
  };

  const handleInlineLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          postcode: leadForm.postcode || "London",
          service: leadForm.service || "Emergency Plumbing",
          urgency: leadForm.urgency || "emergency",
          message: "Submitted via 24/7 AI Receptionist Chat Assistant",
        }),
      });
      const data = await res.json();

      setLeadSuccess(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-lead-confirm-${Date.now()}`,
          role: "assistant",
          content: `✅ Thank you, ${leadForm.name}! Your enquiry (#${data.quoteId || "MLP-DIRECT"}) has been dispatched to our on-call London supervisor. An engineer will contact you at ${leadForm.phone} within 10–15 minutes.\n\nFor immediate emergency response, you can also call +44 7988 756241 directly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-lead-err-${Date.now()}`,
          role: "assistant",
          content:
            "Thank you! Please call our 24/7 dispatch supervisor directly on +44 7988 756241 for instant emergency booking.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLeadSubmitting(false);
      setShowInlineLead(false);
    }
  };

  return (
    <>
      {/* Floating Circular Trigger Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="ai-chatbot-floating-toggle-btn"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -6, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 text-white shadow-2xl shadow-blue-950/60 border-2 border-amber-400/90 flex items-center justify-center cursor-pointer"
              aria-label="Open 24/7 Virtual Receptionist"
            >
              {/* Pulsing indicator ring */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
              </span>

              <div className="relative flex items-center justify-center">
                <Bot className="w-7 h-7 text-amber-400 group-hover:rotate-6 transition-transform" />
              </div>

              {/* Tooltip on Hover */}
              <span className="absolute right-full mr-3 whitespace-nowrap bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                💬 24/7 Receptionist • Online
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] md:w-[450px] max-h-[640px] h-[580px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Headphones className="w-5 h-5 text-amber-400" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white leading-none">
                      Sarah | Virtual Receptionist
                    </h3>
                    <span className="text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      LIVE 24/7
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <span>My London Plumbers Ltd</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-amber-400 font-medium">30–60m ETAs</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  id="reset-chatbot-btn"
                  onClick={handleResetChat}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={COMPANY_INFO.phoneTel}
                  className="p-2 text-amber-400 hover:bg-slate-800 rounded-xl transition-colors"
                  title="Direct Phone Call"
                  aria-label="Call emergency line"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  id="close-chatbot-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Gas Safe Mandatory Warning Strip */}
            <div className="bg-amber-500/15 border-b border-amber-500/30 px-3.5 py-1.5 flex items-center gap-2 text-[11px] text-amber-300 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="truncate">Smell Gas? Evacuate &amp; Call 0800 111 999 or +44 7988 756241 immediately.</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-slate-900/70 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-amber-400">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.isGasAlert
                        ? "bg-red-950/90 border border-red-500/60 text-red-100 shadow-lg shadow-red-950/40"
                        : msg.role === "user"
                        ? "bg-amber-500 text-slate-950 font-medium rounded-tr-xs"
                        : "bg-slate-800/95 text-slate-200 border border-slate-700 rounded-tl-xs shadow-md"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                    {/* Direct Telephone Action card if message mentions emergency or phone */}
                    {(msg.content.includes("+44 7988 756241") || msg.isGasAlert) && (
                      <div className="mt-3 pt-2.5 border-t border-slate-700/50 flex flex-col gap-1.5">
                        <a
                          href={COMPANY_INFO.phoneTel}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Dispatch: {COMPANY_INFO.phoneDisplay}
                        </a>
                      </div>
                    )}

                    <span
                      className={`block text-[10px] mt-1.5 text-right ${
                        msg.role === "user" ? "text-slate-900/70" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Inline Lead Capture Component */}
              {showInlineLead && !leadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-slate-950 border border-amber-500/40 rounded-2xl shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <FileText className="w-4 h-4" />
                      <span>Request Rapid Engineer Callback</span>
                    </div>
                    <button
                      onClick={() => setShowInlineLead(false)}
                      className="text-slate-500 hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleInlineLeadSubmit} className="space-y-2 text-xs">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        placeholder="London Postcode"
                        value={leadForm.postcode}
                        onChange={(e) => setLeadForm({ ...leadForm, postcode: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1.5 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Dispatching Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Callback Request</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex gap-2 items-center text-xs text-slate-400 pl-9 py-1">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="italic">Sarah is checking engineer dispatch...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Category Chips */}
            <div className="p-2 bg-slate-950/95 border-t border-slate-800 overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(action.prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold rounded-full border border-slate-700 hover:border-amber-400/50 transition-colors cursor-pointer flex-shrink-0"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                id="ai-chatbot-input"
                type="text"
                placeholder="Ask about repairs, emergencies, quotes, or London areas..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-400"
              />
              <button
                id="ai-chatbot-send-btn"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
