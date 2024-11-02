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
        Currently, working as a Lead Frontend Engineer at{" "}
        <LinkPreview url="https://coreit.me/" external>
          Coreit
        </LinkPreview>
      </div>
      <p>
        Outside of programming, I enjoy traveling. Right now I live in
        Podgorica, Montenegro. If you are around, feel free to reach me out, we
        could have some coffee or work together.
      </p>
    </div>
  );
}
