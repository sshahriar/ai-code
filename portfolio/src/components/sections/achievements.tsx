import { achievements, honors } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";

export function Achievements() {
  return (
    <section
      id="achievements"
      className="section-padding relative"
      aria-labelledby="achievements-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="By the numbers"
          description="Professional growth at SELISE alongside recognized competitive programming honors."
        />
        <h2 id="achievements-heading" className="sr-only">
          Achievements
        </h2>

        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {achievements.map((item) => (
            <StaggerItem key={item.id}>
              <div className="rounded-2xl border border-border/60 bg-card/50 px-4 py-8 text-center backdrop-blur-xl transition-all hover:border-accent/30 hover:shadow-soft">
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <AnimatedCounter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-10">
          <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
            Contest honors
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {honors.map((item) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
