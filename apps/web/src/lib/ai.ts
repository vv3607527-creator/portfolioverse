import type { LinkedInProfileData } from "./linkedin";

/**
 * Generates mock portfolio content JSON from LinkedIn profile data.
 * Returns a JSON string representing a portfolio website structure.
 */
export async function generatePortfolioContent(
  profile: LinkedInProfileData
): Promise<string> {
  const portfolio = {
    name: extractName(profile),
    headline: profile.headline || "Software Engineer",
    about: profile.about || "Passionate software engineer building impactful products.",
    experience: (profile.experience || []).map((exp) => ({
      title: exp.title,
      company: exp.company,
      dates: exp.dates,
      description: exp.description || `Worked on key initiatives at ${exp.company}.`,
      achievements: exp.achievements.length > 0
        ? exp.achievements
        : [
            `Led development of core features at ${exp.company}`,
            `Improved system performance and reliability`,
            `Collaborated with cross-functional teams to deliver projects on time`,
          ],
    })),
    education: (profile.education || []).map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      dates: edu.dates,
    })),
    skills: profile.skills || [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
    ],
    certifications: (profile.certifications || []).map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    projects: (profile.projects || []).map((proj) => ({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      url: proj.url,
    })),
    languages: (profile.languages || []).map((lang) => ({
      language: lang.language,
      proficiency: lang.proficiency,
    })),
    theme: {
      primaryColor: "#3B82F6",
      fontFamily: "Inter, sans-serif",
      layout: "modern",
    },
  };

  return JSON.stringify(portfolio, null, 2);
}

/**
 * Generates mock resume content JSON from LinkedIn profile data.
 * Returns a JSON string representing a resume document.
 */
export async function generateResumeContent(
  profile: LinkedInProfileData
): Promise<string> {
  const resume = {
    summary:
      profile.about ||
      `Experienced professional with a strong background in ${profile.headline || "software development"}. Proven track record of delivering high-quality results and driving innovation.`,
    experience: (profile.experience || []).map((exp) => ({
      title: exp.title,
      company: exp.company,
      dates: exp.dates,
      description: exp.description,
      achievements: exp.achievements.length > 0
        ? exp.achievements
        : [
            `Delivered key projects at ${exp.company} that improved efficiency by 20%`,
            `Mentored junior team members and conducted code reviews`,
            `Collaborated with stakeholders to define technical requirements`,
          ],
    })),
    education: (profile.education || []).map((edu) => ({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      dates: edu.dates,
      gpa: "3.7 / 4.0",
    })),
    skills: profile.skills || [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
    ],
    certifications: (profile.certifications || []).map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
    })),
    projects: (profile.projects || []).map((proj) => ({
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies,
      url: proj.url,
    })),
    languages: (profile.languages || []).map((lang) => ({
      language: lang.language,
      proficiency: lang.proficiency,
    })),
  };

  return JSON.stringify(resume, null, 2);
}

/**
 * Generates mock cover letter content from LinkedIn profile data and job details.
 * Returns a JSON string with cover letter sections.
 */
export async function generateCoverLetterContent(
  profile: LinkedInProfileData,
  targetCompany: string,
  targetRole: string,
  jobDescription?: string
): Promise<string> {
  const name = extractName(profile);
  const headline = profile.headline || "Software Engineer";
  const topSkill = (profile.skills && profile.skills[0]) || "software development";

  const coverLetter = {
    recipient: {
      company: targetCompany,
      role: targetRole,
    },
    salutation: `Dear Hiring Manager at ${targetCompany},`,
    introduction: `I am writing to express my strong interest in the ${targetRole} position at ${targetCompany}. With a background in ${headline.toLowerCase()}, I am confident that my skills and experience make me an excellent candidate for this role.`,
    body: `Throughout my career, I have developed a strong foundation in ${topSkill} and related technologies. My experience includes working on complex projects that required creative problem-solving, collaboration, and a commitment to excellence. I am particularly drawn to ${targetCompany} because of its reputation for innovation and impact in the industry.${
      jobDescription
        ? `\n\nAfter reviewing the job description, I believe my background aligns well with the requirements for this position. My expertise in ${topSkill} and my ability to quickly adapt to new challenges would allow me to contribute effectively from day one.`
        : ""
    }`,
    closing: `I would welcome the opportunity to discuss how my skills and experience align with the needs of ${targetCompany}. Thank you for your time and consideration.`,
    signature: {
      name: name || "Applicant",
      title: profile.headline || "Software Engineer",
    },
  };

  return JSON.stringify(coverLetter, null, 2);
}

/**
 * Attempts to extract a name from the LinkedIn profile data.
 * Falls back to an empty string if no name-related field is available.
 */
function extractName(profile: LinkedInProfileData): string {
  // The LinkedInProfileData type doesn't have a dedicated name field,
  // so we derive it from context or return empty.
  return "";
}
