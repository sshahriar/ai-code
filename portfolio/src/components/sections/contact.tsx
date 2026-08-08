"use client";

import { FormEvent, useState } from "react";
import { Download, Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { siteConfig, socialLinks } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // PLACEHOLDER: Wire to Formspree, Resend, or API route
    setStatus("sent");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="section-padding relative" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something lasting"
          description="Open to conversations about architecture, full-stack delivery, and technical leadership."
        />
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-6 rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl sm:p-8">
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {socialLinks
                  .filter(
                    (s) =>
                      (s.icon === "linkedin" || s.icon === "github") &&
                      !(s.icon === "github" && s.href === "https://github.com/")
                  )
                  .map((link) => (
                    <Button key={link.name} asChild variant="secondary">
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.icon === "linkedin" ? (
                          <LinkedInIcon className="h-4 w-4" />
                        ) : (
                          <GitHubIcon className="h-4 w-4" />
                        )}
                        {link.name}
                      </a>
                    </Button>
                  ))}
                <Button asChild variant="outline">
                  <a href="/resume.pdf" download>
                    <Download className="h-4 w-4" aria-hidden />
                    Download resume
                  </a>
                </Button>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                Based in {siteConfig.location}. Prefer email for first contact—I typically respond within a few business days.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl sm:p-8"
              noValidate
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <Send className="h-4 w-4" aria-hidden />
                Send message
              </Button>
              {status === "sent" && (
                <p className="text-sm text-accent" role="status">
                  Thanks! This demo form does not send email yet—please reach out via {siteConfig.email}.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
