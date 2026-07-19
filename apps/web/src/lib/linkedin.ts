export interface LinkedInProfileData {
  headline?: string;
  about?: string;
  experience?: Array<{
    title: string;
    company: string;
    dates: string;
    description: string;
    achievements: string[];
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
    dates: string;
  }>;
  skills?: string[];
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    url: string;
  }>;
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
}

export function validateLinkedInUrl(url: string): boolean {
  const pattern =
    /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return pattern.test(url.trim());
}

export function extractLinkedInUsername(url: string): string | null {
  const match = url.trim().match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
  return match ? (match[1] ?? null) : null;
}

export function parseLinkedInPdf(text: string): LinkedInProfileData {
  const data: LinkedInProfileData = {};

  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const headlineIdx = lines.findIndex(
    (l) => l.includes("·") || l.includes("|")
  );
  if (headlineIdx >= 0) {
    data.headline = lines[headlineIdx]!.replace(/·.*$/, "").trim();
  }

  const aboutStart = lines.findIndex(
    (l) => l.toLowerCase().includes("about")
  );
  if (aboutStart >= 0) {
    const aboutEnd = lines.findIndex(
      (l, i) =>
        i > aboutStart &&
        (l.toLowerCase().includes("experience") ||
          l.toLowerCase().includes("education") ||
          l.toLowerCase().includes("skills"))
    );
    data.about = lines
      .slice(aboutStart + 1, aboutEnd > 0 ? aboutEnd : aboutStart + 5)
      .join(" ")
      .trim();
  }

  const expStart = lines.findIndex((l) =>
    l.toLowerCase().includes("experience")
  );
  if (expStart >= 0) {
    const expEnd = lines.findIndex(
      (l, i) =>
        i > expStart &&
        (l.toLowerCase().includes("education") ||
          l.toLowerCase().includes("skills"))
    );
    const expLines = lines.slice(
      expStart + 1,
      expEnd > 0 ? expEnd : expStart + 20
    );
    data.experience = parseExperienceSection(expLines);
  }

  const eduStart = lines.findIndex((l) =>
    l.toLowerCase().includes("education")
  );
  if (eduStart >= 0) {
    const eduEnd = lines.findIndex(
      (l, i) =>
        i > eduStart &&
        (l.toLowerCase().includes("skills") ||
          l.toLowerCase().includes("certifications"))
    );
    const eduLines = lines.slice(
      eduStart + 1,
      eduEnd > 0 ? eduEnd : eduStart + 10
    );
    data.education = parseEducationSection(eduLines);
  }

  const skillsStart = lines.findIndex((l) =>
    l.toLowerCase().includes("skills")
  );
  if (skillsStart >= 0) {
    const skillsEnd = lines.findIndex(
      (l, i) =>
        i > skillsStart &&
        (l.toLowerCase().includes("certifications") ||
          l.toLowerCase().includes("projects") ||
          l.toLowerCase().includes("languages"))
    );
    const skillsLines = lines.slice(
      skillsStart + 1,
      skillsEnd > 0 ? skillsEnd : skillsStart + 15
    );
    data.skills = skillsLines
      .join(" ")
      .split(/[,•·\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return data;
}

function parseExperienceSection(
  lines: string[]
): LinkedInProfileData["experience"] {
  const experiences: LinkedInProfileData["experience"] = [];
  let current: (typeof experiences)[0] | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    const titleMatch = line.match(/^(.+?)\s+(?:at|@|•)\s+(.+)$/);
    if (titleMatch) {
      if (current) experiences.push(current);
      current = {
        title: titleMatch[1]!.trim(),
        company: titleMatch[2]!.trim(),
        dates: "",
        description: "",
        achievements: [],
      };
    } else if (current) {
      const dateMatch = line.match(
        /\b(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}|Present|Now\b/i
      );
      if (dateMatch) {
        current.dates = line.trim();
      } else if (line.startsWith("-") || line.startsWith("•")) {
        current.achievements.push(line.replace(/^[-•]\s*/, "").trim());
      } else {
        current.description += " " + line.trim();
      }
    }
  }

  if (current) experiences.push(current);
  return experiences;
}

function parseEducationSection(
  lines: string[]
): LinkedInProfileData["education"] {
  const education: LinkedInProfileData["education"] = [];
  let current: (typeof education)[0] | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    if (
      !current ||
      line.includes("University") ||
      line.includes("College") ||
      line.includes("School") ||
      line.includes("Institute")
    ) {
      if (current) education.push(current);
      current = { school: line.trim(), degree: "", field: "", dates: "" };
    } else if (current) {
      const dateMatch = line.match(
        /\b(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}|Present|Now\b/i
      );
      if (dateMatch) {
        current.dates = line.trim();
      } else if (!current.degree) {
        current.degree = line.trim();
      } else if (!current.field) {
        current.field = line.trim();
      }
    }
  }

  if (current) education.push(current);
  return education;
}
