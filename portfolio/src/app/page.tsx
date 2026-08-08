import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Achievements } from "@/components/sections/achievements";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <Testimonials />
      <Contact />
    </>
  );
}
