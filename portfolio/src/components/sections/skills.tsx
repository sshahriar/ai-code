"use client";

import { useRef } from "react";
import {
  Cloud,
  Code2,
  Cog,
  Database,
  Layout,
  Server,
  Wrench,
} from "lucide-react";
import { useInView } from "framer-motion";
import { skillCategories } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/fade-in";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  layout: Layout,
  server: Server,
  cloud: Cloud,
  database: Database,
  cog: Cog,
  code: Code2,
  wrench: Wrench,
};

function SkillCard({
  category,
}: {
  category: (typeof skillCategories)[number];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Code2;

  return (
    <Card ref={ref} className="h-full hover:-translate-y-1 hover:border-accent/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-foreground/90">{skill.name}</span>
              <span className="text-muted">{inView ? skill.level : 0}%</span>
            </div>
            <Progress value={inView ? skill.level : 0} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-padding relative" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technical toolkit"
          description="Core strengths in ASP.NET Core, JavaScript, and TypeScript—plus competitive programming."
        />
        <h2 id="skills-heading" className="sr-only">
          Skills
        </h2>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <StaggerItem key={category.name}>
              <SkillCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-8 text-center text-sm text-muted">
          Levels are self-assessed proficiency indicators based on professional experience.
        </FadeIn>
      </div>
    </section>
  );
}
