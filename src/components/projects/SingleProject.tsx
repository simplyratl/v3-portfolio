"use client";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/components/shared/markdown/MDXComponent";
import Header from "@/components/shared/Header";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Link } from "lucide-react";
import { cn } from "@/utils/tailwindUtils";

type ProjectPage = {
  projects: (typeof allProjects)[0];
};

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
  mass: 0.5,
};

export default function SingleProject({ projects }: ProjectPage) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const firstGlowX = useTransform(mouseX, [0, 1], [-100, 100]);
  const firstGlowY = useTransform(mouseY, [0, 1], [-50, 50]);
  const secondGlowX = useTransform(mouseX, [0, 1], [100, -100]);
  const secondGlowY = useTransform(mouseY, [0, 1], [50, -50]);

  const backgroundGlow = useMotionTemplate`radial-gradient(circle at ${useTransform(
    mouseX,
    [0, 1],
    ["0%", "100%"],
  )} ${useTransform(mouseY, [0, 1], ["0%", "100%"])}, rgba(var(--primary-rgb), 0.1) 0%, transparent 60%)`;

  return (
    <main
      className="relative min-h-screen"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <Header className="z-50 mb-4" fixed />

      <motion.div className="fixed inset-0 z-0" style={{ opacity }}>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"
            style={{ y: backgroundY }}
          />
          <div className="absolute inset-0">
            <motion.div
              className="absolute h-[1380px] w-[560px] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                filter: "blur(100px)",
                x: firstGlowX,
                y: firstGlowY,
              }}
            />
            <motion.div
              className="absolute h-[1000px] w-[300px] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                filter: "blur(120px)",
                x: secondGlowX,
                y: secondGlowY,
              }}
            />
          </div>
        </div>
      </motion.div>

      <article className="relative z-10">
        <motion.div
          className="relative flex h-[540px] flex-col items-center justify-center gap-9 px-4 md:h-[768px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ...spring }}
        >
          {projects.publicLink && (
            <motion.div
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.a
                href={projects.publicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-6 py-2 text-lg font-medium !no-underline backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={spring}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/5 opacity-0"
                  initial={false}
                  animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.8,
                  }}
                  transition={spring}
                />
                <Link size={20} />
                <span className="relative z-10">View project</span>
                <motion.div
                  animate={{
                    x: isHovering ? 4 : 0,
                    y: isHovering ? -4 : 0,
                  }}
                  transition={spring}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.div>
              </motion.a>
            </motion.div>
          )}

          <motion.h1
            className="articulat-cf relative max-w-lg px-4 text-center text-4xl font-semibold sm:text-5xl md:max-w-[750px] md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ...spring }}
          >
            {projects.title}
          </motion.h1>

          <motion.p
            className="text-md relative max-w-[450px] text-center text-muted/50 sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ...spring }}
          >
            {projects?.shortDescription}
          </motion.p>

          <motion.ul
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {projects?.technologies &&
              projects.technologies.split(", ").map((tech, index) => (
                <motion.li
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.8,
                    ...spring,
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2, ...spring },
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/5",
                  )}
                >
                  {tech}
                </motion.li>
              ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-screen-md px-4 py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ...spring }}
        >
          <Mdx code={projects.body.code} />
        </motion.div>
      </article>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full opacity-30"
        style={{
          background: backgroundGlow,
        }}
      />
    </main>
  );
}
