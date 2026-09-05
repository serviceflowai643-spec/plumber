import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gen AI lazily
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    company: "My London Plumbers Ltd",
    phone: "+44 7988 756241",
    available24_7: true,
  });
});

// Quote submission endpoint
app.post("/api/quote", (req, res) => {
  const { name, phone, email, postcode, service, message, urgency } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone number are required." });
  }

  const quoteId = `MLP-${Date.now().toString().slice(-6)}`;
  console.log(`[Quote Request Received] ID: ${quoteId}, Name: ${name}, Phone: ${phone}, Postcode: ${postcode}, Service: ${service}`);

  return res.json({
    success: true,
    quoteId,
    message: "Your request has been received. An engineer will contact you shortly.",
    estimatedResponseTime: urgency === "emergency" ? "10-15 minutes" : "Within 1 hour",
    contactPhone: "+44 7988 756241",
  });
});

// AI Chatbot endpoint for plumbing & heating inquiries
app.post("/api/chat", async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemInstruction = `
You are the official Senior Virtual Receptionist and Emergency Service Coordinator for "My London Plumbers Ltd".

ABOUT MY LONDON PLUMBERS LTD:
- Company Name: My London Plumbers Ltd
- Website: mylondonplumbers.co.uk
- Emergency Line & Direct Booking: +44 7988 756241 (Available 24/7/365)
- Reputation: 5.0 Google Rating (179+ verified 5-star customer reviews)
- Experience: Over 50 years of combined heating and plumbing experience across London
- Credentials: All engineers are fully Gas Safe Registered, licensed, insured, and DBS-checked
- Coverage: All 32 London Boroughs + City of London (Central, North, South, East, West London, Postcodes: W, SW, NW, N, E, EC, WC, SE, UB, HA, TW, CR, BR, DA, EN, IG, RM)
- Response Times: Rapid emergency response arriving typically in 30–60 minutes anywhere in Greater London.

SERVICES OFFERED:
1. 24/7 Emergency Plumbing: Burst pipes, major leaks, flooding mitigation, overflowing cisterns, emergency valve replacements, frozen pipes.
2. Emergency Boiler Repairs: Fault codes (F22, F75, E119, EA, etc.), pilot lights failing, low boiler pressure, loud banging/kettling, loss of heating/hot water. (Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, Potterton, Glow-worm, etc.)
3. Emergency Boiler Replacement & Installation: Same-day emergency installs, combi upgrades, system conversions, high-efficiency A-rated boilers with up to 10–12 year warranties.
4. Central Heating & Radiators: Cold radiators, radiator valve leaks, bleeding, power flushing, TRVs, noisy pumps, motorized valves.
5. Gas Safety & Inspections: Gas Safe CP12 landlord certificates, gas hob/cooker connections, boiler servicing, safety checks.
6. Blocked Drains & Waste: Sinks, toilets, baths, internal waste pipes cleared cleanly and quickly.
7. General Plumbing & Fixtures: Taps, showers, toilet repairs, pipework, water tanks, immersion heaters.

CRITICAL PROTOCOL 1 — GAS SAFETY (HIGHEST PRIORITY):
If the customer mentions smelling gas (rotten egg/sulfur smell), hearing a hissing noise near gas pipes or a boiler, suspected carbon monoxide alarm triggering, or physical symptoms (unexplained dizziness, nausea, headaches near heating appliances):
- IMMEDIATELY give critical safety instructions in bullet points:
  1. Turn off the gas supply at the emergency control valve by the meter if safe to do so.
  2. Extinguish all naked flames immediately.
  3. Do NOT turn any electrical switches, lights, or power sockets on or off.
  4. Open doors and windows wide for ventilation.
  5. Evacuate everyone and any pets outside into fresh air immediately.
  6. From outdoors, call the National Gas Emergency helpline (0800 111 999) and our emergency team at +44 7988 756241.
- State explicitly that gas leaks CANNOT be diagnosed remotely or over chat.

CRITICAL PROTOCOL 2 — WATER LEAK & FLOODING EMERGENCIES:
If the customer has an active burst pipe or pouring leak:
- First, advise them to immediately locate and turn off their main water stopcock (typically located under the kitchen sink, in a hallway cupboard, or by the front doorstep) to minimize property damage.
- Urge them to call our 24/7 London emergency dispatch line right now at +44 7988 756241 for an immediate on-call engineer dispatch (30-60 min arrival).

CONVERSATIONAL OBJECTIVES & STYLE:
- Persona: Friendly, polite, calm, authoritative London plumbing coordinator. Sound like an experienced member of the London team, not a generic robot.
- NEVER say "As an AI language model", "As a virtual assistant", or generic robotic phrases.
- Keep responses concise, structured, and easy to read on mobile devices (use short paragraphs or bullet points).
- Lead Qualification: Intelligently and naturally ask for what is needed to help:
  1. What is the issue / symptoms?
  2. What is their London postcode / area?
  3. Is it an urgent emergency (needed now) or can it be scheduled?
  4. If they wish to book an engineer visit or receive a formal quote, offer to collect their contact name & phone number or advise them to call +44 7988 756241 directly.
- Pricing Inquiries: Explain that honest plumbing & boiler diagnostics require knowing the specific problem, boiler make/model, and parts required. We provide clear, transparent quotes with zero hidden fees. Encourage calling +44 7988 756241 for a quick verbal estimate or leaving their details for a swift callback.
- Always include the phone number +44 7988 756241 when an immediate call or dispatch is beneficial.
`;

  try {
    const ai = getAIClient();
    if (ai) {
      // Build chat contents from history
      const formattedContents = [
        ...conversationHistory.slice(-8).map((msg: { role: string; content: string }) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Our emergency team is available 24/7 at +44 7988 756241. How can we assist you today?";
      return res.json({ reply });
    }
  } catch (err: any) {
    console.error("Gemini API Error in /api/chat:", err?.message || err);
  }

  // Graceful rule-based fallback if API is not available
  const lower = message.toLowerCase();
  let fallbackReply = "Thank you for reaching out to My London Plumbers Ltd. For immediate assistance across London, our Gas Safe registered engineers are available 24/7 at +44 7988 756241.";

  if (lower.includes("gas") || lower.includes("smell")) {
    fallbackReply = "⚠️ GAS SAFETY WARNING: If you smell gas or suspect a leak, please turn off your gas supply at the meter, open windows, do not use electrical switches, evacuate immediately, and call our emergency team at +44 7988 756241 or the National Gas Emergency Service at 0800 111 999.";
  } else if (lower.includes("burst") || lower.includes("leak") || lower.includes("flood") || lower.includes("water")) {
    fallbackReply = "For an active water leak or burst pipe, turn off your main stopcock immediately (often located under the kitchen sink). Our emergency plumbers are on standby 24/7 across London. Call us right away on +44 7988 756241 for rapid dispatch.";
  } else if (lower.includes("boiler") || lower.includes("heating") || lower.includes("radiator")) {
    fallbackReply = "We specialize in 24/7 boiler repairs, emergency replacements, and central heating diagnostics across London. All our engineers are Gas Safe registered with 50+ years combined experience. Call +44 7988 756241 for same-day emergency boiler attendance.";
  } else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
    fallbackReply = "We offer transparent, competitive pricing with no hidden fees for all plumbing, boiler, and heating work. You can request a fast quote using our on-page form or call us directly on +44 7988 756241.";
  } else if (lower.includes("area") || lower.includes("location") || lower.includes("postcode") || lower.includes("where")) {
    fallbackReply = "We cover all London boroughs and postcodes including Central, North, South, East, and West London with typical emergency arrival times between 30 and 60 minutes.";
  }

  return res.json({ reply: fallbackReply });
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`My London Plumbers Ltd server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
