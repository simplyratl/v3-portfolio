"use client";
import React from "react";
import { Card, Carousel } from "@/components/ui/CardsCarousel";

export function PropertySystemFeatures() {
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
    category: "Full-Stack Development",
    title: "Dual Application System",
    description:
      "Built internal admin panel and public-facing property website with Next.js and Express.js",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Developed two interconnected applications serving different user bases
          and purposes.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Admin panel for property management</li>
          <li>Public website for property browsing</li>
          <li>Unified backend serving both applications</li>
          <li>Seamless data synchronization</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Cloud Infrastructure",
    title: "AWS Implementation",
    description:
      "Deployed and managed using Amazon EC2 and S3 for reliable cloud hosting",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Implemented robust cloud infrastructure for scalable and reliable
          hosting.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>EC2 instances for application hosting</li>
          <li>S3 buckets for media storage</li>
          <li>Configured security groups and policies</li>
          <li>Implemented backup strategies</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Integration",
    title: "Third-Party Services",
    description:
      "Integrated external property listing services with automated synchronization",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Successfully integrated multiple external services for property
          listings.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Automated listing synchronization</li>
          <li>Custom data exchange protocols</li>
          <li>Real-time updates handling</li>
          <li>Error recovery systems</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Performance",
    title: "Optimization Features",
    description:
      "Implemented advanced optimization techniques for enhanced user experience",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Optimized system performance through various technical
          implementations.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Image lazy loading system</li>
          <li>Efficient data caching</li>
          <li>Optimized database queries</li>
          <li>Reduced page load times</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Search & Filter",
    title: "Advanced Property Search",
    description: "Complex filtering system for efficient property discovery",
    src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Developed sophisticated search and filtering capabilities for property
          listings.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Multi-parameter search system</li>
          <li>Real-time filter updates</li>
          <li>Customizable search criteria</li>
          <li>Optimized search performance</li>
        </ul>
      </div>
    ),
  },
  {
    category: "DevOps",
    title: "Development Operations",
    description:
      "Implemented comprehensive DevOps practices for reliable deployment",
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=870",
    content: (
      <div className="space-y-4">
        <p>
          Established robust DevOps practices for reliable system operation.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Automated deployment pipelines</li>
          <li>Monitoring and logging systems</li>
          <li>Security configuration</li>
          <li>Backup and recovery procedures</li>
        </ul>
      </div>
    ),
  },
];
