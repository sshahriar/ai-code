import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { siteConfig, socialLinks } from "@/data/profile";

const iconMap = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: Mail,
  stopstalk: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-base font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            © {year} · Crafted with care in {siteConfig.location.split(",")[0]}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks
            .filter(
              (s) =>
                s.icon !== "stopstalk" &&
                !(s.icon === "github" && s.href === "https://github.com/")
            )
            .map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                  aria-label={link.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              );
            })}
        </div>
      </div>
    </footer>
  );
}
