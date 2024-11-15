"use client";

import { LinkPreview } from "@/components/ui/LinkPreview";

export default function About() {
  return (
    <div className="slide-enter-content prose text-pretty dark:text-foreground">
      <p>
        Specializing in{" "}
        <span className="italic">user interface development</span>,{" "}
        <span className="italic">functional software</span> and web applications
        with a focus on details that enhance user interactions.
      </p>

      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        In the past I've developed tools, internal design systems, and
        applications.
      </p>

      <div>
        Currently, working as a Frontend Engineer at{" "}
        <LinkPreview url="https://coreit.me/" external>
          Coreit
        </LinkPreview>
      </div>
      <p>
        Bcs. in Information Technology from the{" "}
        <LinkPreview url="https://unimediteran.net/" external>
          University of Mediterranean
        </LinkPreview>
      </p>
    </div>
  );
}
