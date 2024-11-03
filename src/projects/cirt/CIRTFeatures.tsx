"use client";
import React from "react";
import { Card, Carousel } from "@/components/ui/CardsCarousel";

export function CIRTFeatures() {
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
    category: "Government Compliance",
    title: "Official Design Standards",
    description:
      "Implemented Montenegro's government design guidelines for consistent public sector presence",
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Developed the platform in strict compliance with Developed the
          platform in strict compliance with Montenegro&apos;s official
          government design standards.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Implemented standardized color schemes and typography</li>
          <li>Maintained consistent navigation patterns</li>
          <li>Ensured accessibility compliance</li>
          <li>Created responsive layouts for all devices</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Content Management",
    title: "Cybersecurity News Platform",
    description:
      "Dynamic content management system for security updates and cyber awareness articles",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Built a robust content management system for cybersecurity news and
          updates.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Real-time content publishing system</li>
          <li>Categories for different security topics</li>
          <li>Advanced search functionality</li>
          <li>Automated content organization</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Technical Stack",
    title: "Modern Web Architecture",
    description:
      "Built with React.js, Tailwind CSS, and Zustand for optimal performance",
    src: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Implemented a modern tech stack ensuring high performance and
          maintainability.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>React.js for dynamic user interfaces</li>
          <li>Tailwind CSS for responsive styling</li>
          <li>Zustand for efficient state management</li>
          <li>Optimized build configuration</li>
        </ul>
      </div>
    ),
  },
  {
    category: "SEO",
    title: "Search Engine Optimization",
    description:
      "Enhanced visibility and accessibility of cybersecurity information",
    src: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Optimized the platform for maximum search engine visibility and
          content accessibility.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Implemented SEO best practices</li>
          <li>Optimized meta tags and descriptions</li>
          <li>Created semantic HTML structure</li>
          <li>Improved content indexing</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Security",
    title: "Enhanced Security Measures",
    description:
      "Implemented robust security features for government-level protection",
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Integrated comprehensive security measures to protect the government
          platform.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Secure content delivery system</li>
          <li>Protected against common web vulnerabilities</li>
          <li>Implemented content integrity checks</li>
          <li>Regular security audits support</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Performance",
    title: "Optimized User Experience",
    description:
      "Fast-loading, responsive platform for efficient information delivery",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Optimized the platform for maximum performance and user engagement.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Fast page load times</li>
          <li>Optimized image delivery</li>
          <li>Responsive design implementation</li>
          <li>Performance monitoring system</li>
        </ul>
      </div>
    ),
  },
];
