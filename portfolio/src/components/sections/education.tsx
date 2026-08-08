import { GraduationCap } from "lucide-react";
import { education } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";

export function Education() {
  return (
    <section id="education" className="section-padding relative" aria-labelledby="education-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="Undergraduate studies at International Islamic University Chittagong, alongside active programming contest participation."
        />
        <h2 id="education-heading" className="sr-only">
          Education
        </h2>

        <ol className="relative mx-auto max-w-3xl space-y-8 border-l border-border/70 pl-8">
          {education.map((item, index) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[2.55rem] top-1 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-accent shadow-soft">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              <FadeIn delay={index * 0.08}>
                <article className="rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl">
                  <p className="text-sm text-accent">
                    {item.startYear} – {item.endYear}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                    {item.degree}, {item.field}
                  </h3>
                  <p className="mt-1 text-muted">
                    {item.school} · {item.location}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
