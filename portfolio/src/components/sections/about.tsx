import { honors, siteConfig } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section id="about" className="section-padding relative" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Building software with focus and craft"
          description="Software engineer at SELISE with a competitive programming background and a passion for clean, reliable web systems."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn>
            <h3 id="about-heading" className="sr-only">
              About {siteConfig.name}
            </h3>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.summary}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.careerOverview}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {siteConfig.languages.map((lang) => (
                <Badge key={lang.name} variant="secondary">
                  {lang.name} · {lang.level}
                </Badge>
              ))}
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                Core strengths
              </h4>
              <Stagger className="grid gap-3 sm:grid-cols-2">
                {siteConfig.strengths.map((item) => (
                  <StaggerItem key={item}>
                    <div className="rounded-2xl border border-border/60 bg-card/50 px-4 py-3 text-sm text-foreground/90 backdrop-blur-md transition-colors hover:border-accent/30">
                      {item}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>

            <FadeIn delay={0.12}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                Honors & awards
              </h4>
              <div className="flex flex-wrap gap-2">
                {honors.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {siteConfig.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
