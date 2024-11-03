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
    category: "Frontend Development",
    title: "Digital Asset Management System",
    description:
      "Streamlined collateral asset processing with intuitive interface design, reducing complexity for daily banking operations",
    src: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Led the development of a comprehensive digital asset management system
          that revolutionized how NLB Bank handles collateralized assets.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Designed and implemented the complete frontend architecture</li>
          <li>Created intuitive workflows for complex banking procedures</li>
          <li>Integrated real-time validation and error checking</li>
          <li>Developed responsive interfaces for various screen sizes</li>
        </ul>
      </div>
    ),
  },
  {
    category: "User Experience",
    title: "Simplified Banking Interface",
    description:
      "User-friendly design catering to staff with varying technical proficiency, focusing on clarity and ease of use",
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Prioritized user experience through thoughtful design decisions and
          clear interface patterns.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Simplified complex banking procedures into step-by-step processes
          </li>
          <li>Implemented clear visual hierarchies and navigation patterns</li>
          <li>Designed intuitive form layouts and input validations</li>
          <li>Received positive feedback from users of all technical levels</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Technical Architecture",
    title: "React & Redux Implementation",
    description:
      "Robust frontend architecture built with React.js and Redux for efficient state management and real-time validation",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=872",
    content: (
      <div className="space-y-4">
        <p>
          Built a scalable and maintainable frontend architecture using modern
          web technologies.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Implemented React.js for component-based architecture</li>
          <li>Utilized Redux for centralized state management</li>
          <li>Created reusable components for consistent user experience</li>
          <li>Implemented efficient data flow patterns</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Security",
    title: "Banking-Grade Security",
    description:
      "Comprehensive security protocols ensuring safe handling of sensitive banking data and operations",
    src: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=872",
    content: (
      <div className="space-y-4">
        <p>
          Implemented robust security measures to protect sensitive banking
          operations and data.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Integrated secure authentication and authorization systems</li>
          <li>Implemented role-based access control</li>
          <li>Ensured secure data transmission protocols</li>
          <li>Applied banking industry security best practices</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Efficiency",
    title: "Optimized Workflows",
    description:
      "Significant reduction in processing time for collateralized assets management across all bank branches",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Achieved significant improvements in operational efficiency through
          streamlined workflows.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Reduced processing time for collateralized assets</li>
          <li>Minimized manual data entry requirements</li>
          <li>Implemented automated validation checks</li>
          <li>Streamlined approval processes</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Impact",
    title: "Nationwide Implementation",
    description:
      "Successfully deployed across all Montenegro branches, transforming daily banking operations with positive user feedback",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Successfully rolled out the application across all NLB Bank branches
          in Montenegro.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Deployed to all Montenegro branches</li>
          <li>Received positive user feedback</li>
          <li>Improved operational efficiency</li>
          <li>Enhanced daily banking procedures</li>
        </ul>
      </div>
    ),
  },
];
