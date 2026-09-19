import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { sections } from "@/components/sections";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        {sections.map((section, i) => (
          <Section
            key={section.id}
            id={section.id}
            number={String(i + 1).padStart(2, "0")}
            title={section.title}
          >
            {section.panel}
          </Section>
        ))}
      </main>
    </div>
  );
}
