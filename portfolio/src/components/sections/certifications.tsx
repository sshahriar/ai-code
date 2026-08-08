import { Award } from "lucide-react";
import { certifications } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding relative bg-surface/40"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials"
          description="Placeholder cards ready for verified certificates—replace with LinkedIn or Credly details."
        />
        <h2 id="certifications-heading" className="sr-only">
          Certifications
        </h2>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem key={cert.id}>
              <Card className="h-full hover:-translate-y-1 hover:border-accent/30">
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Award className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{cert.name}</CardTitle>
                    {cert.isPlaceholder && (
                      <Badge variant="outline">Placeholder</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{cert.issuer}</p>
                  <p className="mt-1 text-xs text-muted/80">Year: {cert.year}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
