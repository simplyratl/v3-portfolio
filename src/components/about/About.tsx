"use client";

export default function About() {
  return (
    <div className="slide-enter-content prose mt-4 text-pretty dark:text-foreground">
      <p>
        <span className="newsreader italic">Crafting interfaces</span>. Building
        polished, functional software and web experiences. Adding magic to the
        details that elevate user interactions.
      </p>

      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        In the past I've developed tools, internal design systems, and
        applications.
      </p>

      <p>
        Currently, working as a Lead Frontend Engineer at{" "}
        <a
          href="https://coreit.me/"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Coreit
        </a>
      </p>
      <p>
        Dreaming up ideas and making them come true is where my passion lies.
        You can find my full projects list here. I also do some generative-art,
        compform, interactivity experiments.
      </p>
      <p>
        Outside of programming, I enjoy traveling. Right now I live in
        Podgorica. If you are around, feel free to reach me out, we could have
        some coffee or work together.
      </p>
    </div>
  );
}
