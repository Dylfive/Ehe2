import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Ehe Hair – Victoria, BC Salon",
  description: "Get in touch with Ehe Hair in Victoria, BC. Book a virtual consultation, ask about our hair care products, or visit us at 3749 Shelbourne St #207. Call +1 778-533-1456.",
  openGraph: {
    title: "Contact Ehe Hair | Victoria Salon & Virtual Consultations",
    description: "Reach our team for virtual consultations, product inquiries, or visit our Victoria, BC location. Mon–Sat 9 AM–7 PM.",
    url: "https://ehehair.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
