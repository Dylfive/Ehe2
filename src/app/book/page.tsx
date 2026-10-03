import type { Metadata } from "next";
import BookClient from "./BookClient";

export const metadata: Metadata = {
  title: "Book an Appointment | Ehe Hair Salon – Victoria, BC",
  description: "Schedule your haircut or styling service online with Ehe Hair in Victoria, BC. Choose your service, stylist, and preferred time in minutes.",
  openGraph: {
    title: "Book a Salon Appointment | Ehe Hair",
    description: "Easy online booking for haircuts and styling services at Ehe Hair, Victoria. Select your service, pick a stylist, and reserve your time.",
    url: "/book",
  },
};

export default function BookPage() {
  return <BookClient />;
}
