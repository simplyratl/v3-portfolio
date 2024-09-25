import ButtonTabs from "@/components/ui/ButtonTabs";
import ToggleTheme from "@/components/ui/ToggleTheme";
import { socials } from "@/constants/socials";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div>
      <div className="flex items-start justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-semibold">Nikica Ražnatović</h1>
          <p className="font-mono text-lg text-primary">
            Lead Frontend Engineer
          </p>

          <ul className="mt-4 flex gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-foreground transition-colors hover:text-foreground/60"
                >
                  <Icon icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ToggleTheme />
      </div>

      <div className="mt-8">
        <ButtonTabs />

        <div className="prose mt-4 dark:text-foreground">
          <p>
            <span className="font-mono">Crafting interfaces</span>. Building
            polished software and web experiences. Experimenting with magical
            details in user interfaces.
          </p>
        </div>
      </div>
    </div>
  );
}
