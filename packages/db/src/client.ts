import { getDb, saveDb } from "./database";
import { SCHEMA_SQL } from "./schema";

export async function initDatabase() {
  const db = await getDb();
  db.run(SCHEMA_SQL);
  saveDb();
}

// ============ Helper ============

function rowToObject(
  result: { columns: string[] },
  row: any[]
): Record<string, any> {
  const obj: Record<string, any> = {};
  result.columns.forEach((col, i) => {
    obj[col] = row[i];
  });
  return obj;
}

// ============ User ============

export async function createUser(data: {
  email: string;
  name?: string;
  image?: string;
  clerkId: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO User (id, email, name, image, clerkId) VALUES (?, ?, ?, ?, ?)`,
    [id, data.email, data.name || null, data.image || null, data.clerkId]
  );
  saveDb();
  return getUserById(id);
}

export async function getUserById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM User WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getUserByClerkId(clerkId: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM User WHERE clerkId = ?`, [clerkId]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function updateUser(
  id: string,
  data: { name?: string; image?: string }
) {
  const db = await getDb();
  const updates: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    updates.push("name = ?");
    values.push(data.name);
  }
  if (data.image !== undefined) {
    updates.push("image = ?");
    values.push(data.image);
  }

  if (updates.length === 0) return getUserById(id);

  values.push(id);
  db.run(`UPDATE User SET ${updates.join(", ")} WHERE id = ?`, values);
  saveDb();
  return getUserById(id);
}

export async function deleteUser(id: string) {
  const db = await getDb();
  db.run(`DELETE FROM User WHERE id = ?`, [id]);
  saveDb();
}

// ============ LinkedInProfile ============

export async function createLinkedInProfile(data: {
  userId: string;
  headline?: string;
  about?: string;
  experience?: string;
  education?: string;
  skills?: string;
  certifications?: string;
  projects?: string;
  languages?: string;
  rawData?: string;
  importMethod?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO LinkedInProfile (id, userId, headline, about, experience, education, skills, certifications, projects, languages, rawData, importMethod)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.headline || null,
      data.about || null,
      data.experience || null,
      data.education || null,
      data.skills || null,
      data.certifications || null,
      data.projects || null,
      data.languages || null,
      data.rawData || null,
      data.importMethod || "url",
    ]
  );
  saveDb();
  return getLinkedInProfileById(id);
}

export async function getLinkedInProfileById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM LinkedInProfile WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getLinkedInProfileByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM LinkedInProfile WHERE userId = ?`,
    [userId]
  );
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

// ============ Resume ============

export async function createResume(data: {
  userId: string;
  title?: string;
  content?: string;
  template?: string;
  portfolioId?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO Resume (id, userId, title, content, template, portfolioId) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.title || "My Resume",
      data.content || null,
      data.template || "professional",
      data.portfolioId || null,
    ]
  );
  saveDb();
  return getResumeById(id);
}

export async function getResumeById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM Resume WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getResumesByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM Resume WHERE userId = ? ORDER BY createdAt DESC`,
    [userId]
  );
  return result.length
    ? result[0]!.values.map((row: any[]) => rowToObject(result[0]!, row))
    : [];
}

export async function updateResume(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    template: string;
    pdfUrl: string;
  }>
) {
  const db = await getDb();
  const sets: string[] = [];
  const values: any[] = [];

  if (data.title !== undefined) {
    sets.push("title = ?");
    values.push(data.title);
  }
  if (data.content !== undefined) {
    sets.push("content = ?");
    values.push(data.content);
  }
  if (data.template !== undefined) {
    sets.push("template = ?");
    values.push(data.template);
  }
  if (data.pdfUrl !== undefined) {
    sets.push("pdfUrl = ?");
    values.push(data.pdfUrl);
  }

  if (sets.length === 0) return getResumeById(id);

  sets.push("updatedAt = datetime('now')");
  values.push(id);

  db.run(`UPDATE Resume SET ${sets.join(", ")} WHERE id = ?`, values);
  saveDb();
  return getResumeById(id);
}

// ============ CoverLetter ============

export async function createCoverLetter(data: {
  userId: string;
  title?: string;
  content?: string;
  targetCompany?: string;
  targetRole?: string;
  jobDescription?: string;
  writingStyle?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO CoverLetter (id, userId, title, content, targetCompany, targetRole, jobDescription, writingStyle)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.title || "Cover Letter",
      data.content || null,
      data.targetCompany || null,
      data.targetRole || null,
      data.jobDescription || null,
      data.writingStyle || "professional",
    ]
  );
  saveDb();
  return getCoverLetterById(id);
}

export async function getCoverLetterById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM CoverLetter WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getCoverLettersByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM CoverLetter WHERE userId = ? ORDER BY createdAt DESC`,
    [userId]
  );
  return result.length
    ? result[0]!.values.map((row: any[]) => rowToObject(result[0]!, row))
    : [];
}

export async function updateCoverLetter(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    targetCompany: string;
    targetRole: string;
    jobDescription: string;
    writingStyle: string;
    pdfUrl: string;
  }>
) {
  const db = await getDb();
  const sets: string[] = [];
  const values: any[] = [];

  if (data.title !== undefined) {
    sets.push("title = ?");
    values.push(data.title);
  }
  if (data.content !== undefined) {
    sets.push("content = ?");
    values.push(data.content);
  }
  if (data.targetCompany !== undefined) {
    sets.push("targetCompany = ?");
    values.push(data.targetCompany);
  }
  if (data.targetRole !== undefined) {
    sets.push("targetRole = ?");
    values.push(data.targetRole);
  }
  if (data.jobDescription !== undefined) {
    sets.push("jobDescription = ?");
    values.push(data.jobDescription);
  }
  if (data.writingStyle !== undefined) {
    sets.push("writingStyle = ?");
    values.push(data.writingStyle);
  }
  if (data.pdfUrl !== undefined) {
    sets.push("pdfUrl = ?");
    values.push(data.pdfUrl);
  }

  if (sets.length === 0) return getCoverLetterById(id);

  sets.push("updatedAt = datetime('now')");
  values.push(id);

  db.run(`UPDATE CoverLetter SET ${sets.join(", ")} WHERE id = ?`, values);
  saveDb();
  return getCoverLetterById(id);
}

// ============ Project ============

export async function createProject(data: {
  userId: string;
  name: string;
  description?: string;
  portfolioId?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO Project (id, userId, name, description, portfolioId) VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.name,
      data.description || null,
      data.portfolioId || null,
    ]
  );
  saveDb();
  return getProjectById(id);
}

export async function getProjectById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM Project WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getProjectsByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM Project WHERE userId = ? ORDER BY createdAt DESC`,
    [userId]
  );
  return result.length
    ? result[0]!.values.map((row: any[]) => rowToObject(result[0]!, row))
    : [];
}

// ============ ProfileAnalysis ============

export async function createProfileAnalysis(data: {
  userId: string;
  rawData?: string;
  summary?: string;
  strengths?: string;
  improvements?: string;
  suggestedRole?: string;
  industry?: string;
  experienceLevel?: string;
  status?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO ProfileAnalysis (id, userId, rawData, summary, strengths, improvements, suggestedRole, industry, experienceLevel, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.rawData || null,
      data.summary || null,
      data.strengths || null,
      data.improvements || null,
      data.suggestedRole || null,
      data.industry || null,
      data.experienceLevel || null,
      data.status || "pending",
    ]
  );
  saveDb();
  return getProfileAnalysisById(id);
}

export async function getProfileAnalysisById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM ProfileAnalysis WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getProfileAnalysesByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM ProfileAnalysis WHERE userId = ? ORDER BY createdAt DESC`,
    [userId]
  );
  return result.length
    ? result[0]!.values.map((row: any[]) => rowToObject(result[0]!, row))
    : [];
}

export async function updateProfileAnalysis(
  id: string,
  data: {
    summary?: string;
    strengths?: string;
    improvements?: string;
    suggestedRole?: string;
    industry?: string;
    experienceLevel?: string;
    status?: string;
  }
) {
  const db = await getDb();
  const updates: string[] = [];
  const values: any[] = [];

  if (data.summary !== undefined) { updates.push("summary = ?"); values.push(data.summary); }
  if (data.strengths !== undefined) { updates.push("strengths = ?"); values.push(data.strengths); }
  if (data.improvements !== undefined) { updates.push("improvements = ?"); values.push(data.improvements); }
  if (data.suggestedRole !== undefined) { updates.push("suggestedRole = ?"); values.push(data.suggestedRole); }
  if (data.industry !== undefined) { updates.push("industry = ?"); values.push(data.industry); }
  if (data.experienceLevel !== undefined) { updates.push("experienceLevel = ?"); values.push(data.experienceLevel); }
  if (data.status !== undefined) { updates.push("status = ?"); values.push(data.status); }

  if (updates.length === 0) return getProfileAnalysisById(id);

  values.push(id);
  db.run(`UPDATE ProfileAnalysis SET ${updates.join(", ")} WHERE id = ?`, values);
  saveDb();
  return getProfileAnalysisById(id);
}

// ============ Portfolio ============

export async function createPortfolio(data: {
  userId: string;
  title: string;
  slug: string;
  description?: string;
  template?: string;
  theme?: string;
  content?: string;
}) {
  const db = await getDb();
  const id = crypto.randomUUID();
  db.run(
    `INSERT INTO Portfolio (id, userId, title, slug, description, template, theme, content)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.userId,
      data.title,
      data.slug,
      data.description || null,
      data.template || "minimal-white",
      data.theme || null,
      data.content || null,
    ]
  );
  saveDb();
  return getPortfolioById(id);
}

export async function getPortfolioById(id: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM Portfolio WHERE id = ?`, [id]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getPortfolioBySlug(slug: string) {
  const db = await getDb();
  const result = db.exec(`SELECT * FROM Portfolio WHERE slug = ?`, [slug]);
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}

export async function getPortfoliosByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM Portfolio WHERE userId = ? ORDER BY createdAt DESC`,
    [userId]
  );
  return result.length
    ? result[0]!.values.map((row: any[]) => rowToObject(result[0]!, row))
    : [];
}

export async function updatePortfolio(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    template: string;
    published: number;
    domain: string;
    theme: string;
    content: string;
  }>
) {
  const db = await getDb();
  const sets: string[] = [];
  const values: any[] = [];

  if (data.title !== undefined) {
    sets.push("title = ?");
    values.push(data.title);
  }
  if (data.slug !== undefined) {
    sets.push("slug = ?");
    values.push(data.slug);
  }
  if (data.description !== undefined) {
    sets.push("description = ?");
    values.push(data.description);
  }
  if (data.template !== undefined) {
    sets.push("template = ?");
    values.push(data.template);
  }
  if (data.published !== undefined) {
    sets.push("published = ?");
    values.push(data.published);
  }
  if (data.domain !== undefined) {
    sets.push("domain = ?");
    values.push(data.domain);
  }
  if (data.theme !== undefined) {
    sets.push("theme = ?");
    values.push(data.theme);
  }
  if (data.content !== undefined) {
    sets.push("content = ?");
    values.push(data.content);
  }

  if (sets.length === 0) return getPortfolioById(id);

  sets.push("updatedAt = datetime('now')");
  values.push(id);

  db.run(`UPDATE Portfolio SET ${sets.join(", ")} WHERE id = ?`, values);
  saveDb();
  return getPortfolioById(id);
}

export async function deletePortfolio(id: string) {
  const db = await getDb();
  db.run(`DELETE FROM Portfolio WHERE id = ?`, [id]);
  saveDb();
}

// ============ Subscription ============

export async function getSubscriptionByUserId(userId: string) {
  const db = await getDb();
  const result = db.exec(
    `SELECT * FROM Subscription WHERE userId = ?`,
    [userId]
  );
  if (!result.length || !result[0]!.values.length) return null;
  return rowToObject(result[0]!, result[0]!.values[0]);
}
