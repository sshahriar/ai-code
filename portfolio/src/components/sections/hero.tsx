"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { siteConfig, socialLinks } from "@/data/profile";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl animate-float" />
        <div className="hero-grid absolute inset-0 opacity-[0.35] dark:opacity-[0.2]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <motion.p
            className="mb-4 text-sm font-medium tracking-wide text-accent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {siteConfig.location}
          </motion.p>

          <motion.h1
            className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg font-medium text-foreground/80 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {siteConfig.currentRole}
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {siteConfig.headline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Button asChild size="lg">
              <a href="#contact">Get in touch</a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#projects">View projects</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" aria-hidden />
                Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {socialLinks
            .filter((link) => !(link.icon === "github" && link.href === "https://github.com/"))
            .map((link) => {
              const icons = {
                linkedin: LinkedInIcon,
                github: GitHubIcon,
                email: Mail,
                stopstalk: ExternalLink,
              };
              const Icon = icons[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                  aria-label={link.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/40 text-muted backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br from-accent/20 via-sky-200/20 to-transparent p-1 shadow-soft dark:from-accent/30 dark:via-sky-900/20">
            <div className="flex h-full w-full items-center justify-center rounded-[1.75rem] bg-card/50 backdrop-blur-xl">
              {/* PLACEHOLDER: Replace with professional headshot */}
              <div className="flex h-[85%] w-[85%] flex-col items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-sky-400/20 text-center">
                <span className="font-display text-6xl font-semibold text-foreground/90 sm:text-7xl">
                  {siteConfig.firstName[0]}
                  {siteConfig.lastName[0]}
                </span>
                <span className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
                  Photo placeholder
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md"
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
