import { Quote } from "lucide-react";
import { testimonials } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding relative bg-surface/40"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What colleagues say"
          description="Placeholder cards ready for LinkedIn recommendations—replace when you have verified quotes."
        />
        <h2 id="testimonials-heading" className="sr-only">
          Testimonials
        </h2>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <Card className="h-full hover:-translate-y-1 hover:border-accent/30">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-6 w-6 text-accent/70" aria-hidden />
                  {t.isPlaceholder && (
                    <Badge variant="outline" className="mb-3 w-fit">
                      Placeholder
                    </Badge>
                  )}
                  <blockquote className="flex-1 text-sm leading-relaxed text-muted">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-6 border-t border-border/50 pt-4">
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role} · {t.company}
                    </p>
                  </footer>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
