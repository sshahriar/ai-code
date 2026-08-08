"use client";

import { experiences } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section
      id="experience"
      className="section-padding relative bg-surface/40"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Career timeline"
          description="Professional engineering experience at SELISE Digital Platforms."
        />

        <ol className="relative space-y-10 border-l border-border/70 pl-6 md:pl-8">
          {experiences.map((exp, index) => (
            <li key={exp.id} className="relative">
              <span
                className="absolute -left-[1.9rem] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-background md:-left-[2.4rem]"
                aria-hidden
              />
              <FadeIn delay={index * 0.05}>
                <article className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-xl transition-all hover:border-accent/25 hover:shadow-soft sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{exp.location}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-6">
                    {exp.roles.map((role) => (
                      <div key={`${exp.id}-${role.title}-${role.startDate}`}>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h4 className="text-base font-medium text-foreground">
                            {role.title}
                          </h4>
                          <span className="text-sm text-muted">
                            {role.startDate} – {role.endDate} · {role.duration}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {role.description}
                        </p>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                              Responsibilities
                            </p>
                            <ul className="space-y-1.5 text-sm text-muted">
                              {role.responsibilities.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                              Achievements
                            </p>
                            <ul className="space-y-1.5 text-sm text-muted">
                              {role.achievements.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ol>
        <h2 id="experience-heading" className="sr-only">
          Work experience
        </h2>
      </div>
    </section>
  );
}
