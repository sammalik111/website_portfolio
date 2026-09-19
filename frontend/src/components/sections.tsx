import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { resume } from "@/data/resume";

/**
 * The page's sections, in order. A section only exists if it has data, so emptying one in
 * resume.json removes it, its nav link, and its number.
 */
export const sections = [
  { id: "experience", title: "Experience", show: resume.experience.length > 0, panel: <Experience /> },
  { id: "projects", title: "Projects", show: resume.projects.length > 0, panel: <Projects /> },
  { id: "skills", title: "Skills", show: resume.skills.length > 0, panel: <Skills /> },
  {
    id: "education",
    title: "Education",
    show: resume.education.length + resume.volunteering.length > 0,
    panel: <Education />,
  },
  { id: "contact", title: "Contact", show: true, panel: <Contact /> },
].filter((section) => section.show);
