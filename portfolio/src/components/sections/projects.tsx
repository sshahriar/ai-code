"use client";

import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social";
import { projects } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Projects() {
  return (
    <section
      id="projects"
      className="section-padding relative bg-surface/40"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Highlights drawn from professional experience and LinkedIn projects. Sample items are clearly marked."
        />
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>

        <Stagger className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Card className="group h-full overflow-hidden hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border/50 bg-gradient-to-br from-accent/15 via-sky-300/10 to-transparent">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.isSample && (
                    <Badge className="absolute left-3 top-3" variant="accent">
                      Sample project
                    </Badge>
                  )}
                  {project.period && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-2.5 py-1 text-xs text-muted backdrop-blur-md">
                      {project.period}
                    </span>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                      Features
                    </p>
                    <ul className="space-y-1 text-sm text-muted">
                      {project.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button asChild variant="secondary" size="sm" disabled={!project.githubUrl}>
                      <a
                        href={project.githubUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!project.githubUrl}
                        tabIndex={project.githubUrl ? 0 : -1}
                        className={!project.githubUrl ? "pointer-events-none opacity-50" : ""}
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" disabled={!project.liveUrl}>
                      <a
                        href={project.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!project.liveUrl}
                        tabIndex={project.liveUrl ? 0 : -1}
                        className={!project.liveUrl ? "pointer-events-none opacity-50" : ""}
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
