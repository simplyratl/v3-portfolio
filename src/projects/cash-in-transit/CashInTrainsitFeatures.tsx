"use client";
import React from "react";
import { Card, Carousel } from "@/components/ui/CardsCarousel";

export function CashInTransitFeatures() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="h-full w-full">
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "User Interface",
    title: "Intuitive Digital Banking Operations",
    description:
      "Streamlined workflows with user-friendly interface designed for staff across all technical levels",
    src: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=3000&auto=format&fit=crop",
  },
  {
    category: "Security",
    title: "Enterprise-Grade Security Protocol",
    description:
      "Advanced role-based access control and encrypted data transmission for maximum protection",
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=3000&auto=format&fit=crop",
  },
  {
    category: "Analytics",
    title: "Real-Time Operations Dashboard",
    description:
      "Centralized monitoring system with instant tracking and compliance reporting",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=3000&auto=format&fit=crop",
  },
  {
    category: "Performance",
    title: "High-Performance Architecture",
    description:
      "99.9% uptime with seamless integration into existing infrastructure",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3000&auto=format&fit=crop",
  },
  {
    category: "Efficiency",
    title: "Automated Workflow System",
    description:
      "60% reduction in processing time with 85% fewer operational errors",
    src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=3000&auto=format&fit=crop",
  },
  {
    category: "Technology",
    title: "Modern Tech Stack Implementation",
    description:
      "Built with React.js, Redux Toolkit, and TypeScript for optimal performance",
    src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3000&auto=format&fit=crop",
  },
];
