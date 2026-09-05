export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge?: string;
  highlights: string[];
  emergencyNote?: string;
  typicalResponse: string;
  priceGuide?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  borough: string;
  rating: number;
  date: string;
  serviceCategory: "Emergency Plumbing" | "Boiler Repairs" | "Boiler Replacement" | "Central Heating" | "Gas Services";
  reviewText: string;
  verified: boolean;
  engineerName?: string;
}

export interface LondonArea {
  id: string;
  name: string;
  region: "Central London" | "North London" | "South London" | "East London" | "West London";
  postcodes: string[];
  boroughs: string[];
  typicalArrivalMins: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  isGasAlert?: boolean;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  urgency: "emergency" | "today" | "flexible";
  message: string;
}
