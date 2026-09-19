import bundled from "./resume.json";

/**
 * Shape of the site's content. The same JSON is bundled into the build (as an
 * offline fallback) and published to S3, where the live site fetches it — edit
 * `resume.json`, run `scripts/content.sh publish`, and the page updates with no redeploy.
 */

export type Profile = {
  name: string;
  role?: string;
  summary?: string;
  location?: string;
  languages: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  /** Link to a resume PDF (e.g. the S3 object); shows a "Resume" button when set. */
  resumeUrl?: string;
};

export type Experience = {
  company: string;
  title: string;
  location?: string;
  dates?: string;
  bullets: string[];
  skills: string[];
};

export type Project = {
  title: string;
  role?: string;
  dates?: string;
  /** One-line description shown in the projects list; falls back to the first bullet. */
  summary?: string;
  bullets: string[];
  tech: string[];
  link?: string;
  repo?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Education = {
  school: string;
  degree?: string;
  dates?: string;
  focus?: string;
  coursework: string[];
};

export type Volunteering = {
  organization: string;
  role?: string;
  dates?: string;
  description?: string;
};

export type Resume = {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  volunteering: Volunteering[];
};

type Json = Record<string, unknown>;

const isObject = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
const list = (v: unknown) =>
  Array.isArray(v) ? v.map(text).filter((s): s is string => s !== undefined) : [];

/** Builds each array item; items missing a required field are skipped (with a console warning). */
function collect<T>(value: unknown, label: string, build: (o: Json) => T | undefined): T[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, i) => {
    const built = isObject(item) ? build(item) : undefined;
    if (!built) console.warn(`resume: skipped ${label}[${i}] — missing a required field`);
    return built ? [built] : [];
  });
}

/**
 * Turns untrusted JSON (hand-edited, fetched from S3) into a fully-populated Resume.
 * Returns null only if the file is unusable (no profile name); anything else degrades
 * gracefully. Missing sections become empty — the bundled data is only used on failure,
 * so deleting something from the JSON really removes it from the page.
 */
export function parseResume(input: unknown): Resume | null {
  if (!isObject(input) || !isObject(input.profile)) return null;
  const p = input.profile;
  const name = text(p.name);
  if (!name) return null;

  return {
    profile: {
      name,
      role: text(p.role),
      summary: text(p.summary),
      location: text(p.location),
      languages: list(p.languages),
      email: text(p.email),
      phone: text(p.phone),
      linkedin: text(p.linkedin),
      github: text(p.github),
      resumeUrl: text(p.resumeUrl),
    },
    experience: collect(input.experience, "experience", (o) => {
      const company = text(o.company);
      const title = text(o.title);
      if (!company || !title) return undefined;
      return {
        company,
        title,
        location: text(o.location),
        dates: text(o.dates),
        bullets: list(o.bullets),
        skills: list(o.skills),
      };
    }),
    projects: collect(input.projects, "projects", (o) => {
      const title = text(o.title);
      if (!title) return undefined;
      return {
        title,
        role: text(o.role),
        dates: text(o.dates),
        summary: text(o.summary),
        bullets: list(o.bullets),
        tech: list(o.tech),
        link: text(o.link),
        repo: text(o.repo),
      };
    }),
    skills: collect(input.skills, "skills", (o) => {
      const category = text(o.category);
      if (!category) return undefined;
      return { category, items: list(o.items) };
    }),
    education: collect(input.education, "education", (o) => {
      const school = text(o.school);
      if (!school) return undefined;
      return {
        school,
        degree: text(o.degree),
        dates: text(o.dates),
        focus: text(o.focus),
        coursework: list(o.coursework),
      };
    }),
    volunteering: collect(input.volunteering, "volunteering", (o) => {
      const organization = text(o.organization);
      if (!organization) return undefined;
      return {
        organization,
        role: text(o.role),
        dates: text(o.dates),
        description: text(o.description),
      };
    }),
  };
}

/** Content baked into the build; shown instantly and used if the S3 fetch fails. */
export const defaultResume = parseResume(bundled) as Resume;
