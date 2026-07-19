"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUserByClerkId = getUserByClerkId;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.createLinkedInProfile = createLinkedInProfile;
exports.getLinkedInProfileById = getLinkedInProfileById;
exports.getLinkedInProfileByUserId = getLinkedInProfileByUserId;
exports.createResume = createResume;
exports.getResumeById = getResumeById;
exports.getResumesByUserId = getResumesByUserId;
exports.updateResume = updateResume;
exports.createCoverLetter = createCoverLetter;
exports.getCoverLetterById = getCoverLetterById;
exports.getCoverLettersByUserId = getCoverLettersByUserId;
exports.updateCoverLetter = updateCoverLetter;
exports.createProject = createProject;
exports.getProjectById = getProjectById;
exports.getProjectsByUserId = getProjectsByUserId;
exports.createProfileAnalysis = createProfileAnalysis;
exports.getProfileAnalysisById = getProfileAnalysisById;
exports.getProfileAnalysesByUserId = getProfileAnalysesByUserId;
exports.updateProfileAnalysis = updateProfileAnalysis;
exports.createPortfolio = createPortfolio;
exports.getPortfolioById = getPortfolioById;
exports.getPortfolioBySlug = getPortfolioBySlug;
exports.getPortfoliosByUserId = getPortfoliosByUserId;
exports.updatePortfolio = updatePortfolio;
exports.deletePortfolio = deletePortfolio;
exports.getSubscriptionByUserId = getSubscriptionByUserId;
const database_1 = require("./database");
const schema_1 = require("./schema");
async function initDatabase() {
    const db = await (0, database_1.getDb)();
    db.run(schema_1.SCHEMA_SQL);
    (0, database_1.saveDb)();
}
// ============ Helper ============
function rowToObject(result, row) {
    const obj = {};
    result.columns.forEach((col, i) => {
        obj[col] = row[i];
    });
    return obj;
}
// ============ User ============
async function createUser(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO User (id, email, name, image, clerkId) VALUES (?, ?, ?, ?, ?)`, [id, data.email, data.name || null, data.image || null, data.clerkId]);
    (0, database_1.saveDb)();
    return getUserById(id);
}
async function getUserById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM User WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getUserByClerkId(clerkId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM User WHERE clerkId = ?`, [clerkId]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function updateUser(id, data) {
    const db = await (0, database_1.getDb)();
    const updates = [];
    const values = [];
    if (data.name !== undefined) {
        updates.push("name = ?");
        values.push(data.name);
    }
    if (data.image !== undefined) {
        updates.push("image = ?");
        values.push(data.image);
    }
    if (updates.length === 0)
        return getUserById(id);
    values.push(id);
    db.run(`UPDATE User SET ${updates.join(", ")} WHERE id = ?`, values);
    (0, database_1.saveDb)();
    return getUserById(id);
}
async function deleteUser(id) {
    const db = await (0, database_1.getDb)();
    db.run(`DELETE FROM User WHERE id = ?`, [id]);
    (0, database_1.saveDb)();
}
// ============ LinkedInProfile ============
async function createLinkedInProfile(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO LinkedInProfile (id, userId, headline, about, experience, education, skills, certifications, projects, languages, rawData, importMethod)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
    ]);
    (0, database_1.saveDb)();
    return getLinkedInProfileById(id);
}
async function getLinkedInProfileById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM LinkedInProfile WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getLinkedInProfileByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM LinkedInProfile WHERE userId = ?`, [userId]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
// ============ Resume ============
async function createResume(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO Resume (id, userId, title, content, template, portfolioId) VALUES (?, ?, ?, ?, ?, ?)`, [
        id,
        data.userId,
        data.title || "My Resume",
        data.content || null,
        data.template || "professional",
        data.portfolioId || null,
    ]);
    (0, database_1.saveDb)();
    return getResumeById(id);
}
async function getResumeById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Resume WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getResumesByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Resume WHERE userId = ? ORDER BY createdAt DESC`, [userId]);
    return result.length
        ? result[0].values.map((row) => rowToObject(result[0], row))
        : [];
}
async function updateResume(id, data) {
    const db = await (0, database_1.getDb)();
    const sets = [];
    const values = [];
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
    if (sets.length === 0)
        return getResumeById(id);
    sets.push("updatedAt = datetime('now')");
    values.push(id);
    db.run(`UPDATE Resume SET ${sets.join(", ")} WHERE id = ?`, values);
    (0, database_1.saveDb)();
    return getResumeById(id);
}
// ============ CoverLetter ============
async function createCoverLetter(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO CoverLetter (id, userId, title, content, targetCompany, targetRole, jobDescription, writingStyle)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        id,
        data.userId,
        data.title || "Cover Letter",
        data.content || null,
        data.targetCompany || null,
        data.targetRole || null,
        data.jobDescription || null,
        data.writingStyle || "professional",
    ]);
    (0, database_1.saveDb)();
    return getCoverLetterById(id);
}
async function getCoverLetterById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM CoverLetter WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getCoverLettersByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM CoverLetter WHERE userId = ? ORDER BY createdAt DESC`, [userId]);
    return result.length
        ? result[0].values.map((row) => rowToObject(result[0], row))
        : [];
}
async function updateCoverLetter(id, data) {
    const db = await (0, database_1.getDb)();
    const sets = [];
    const values = [];
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
    if (sets.length === 0)
        return getCoverLetterById(id);
    sets.push("updatedAt = datetime('now')");
    values.push(id);
    db.run(`UPDATE CoverLetter SET ${sets.join(", ")} WHERE id = ?`, values);
    (0, database_1.saveDb)();
    return getCoverLetterById(id);
}
// ============ Project ============
async function createProject(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO Project (id, userId, name, description, portfolioId) VALUES (?, ?, ?, ?, ?)`, [
        id,
        data.userId,
        data.name,
        data.description || null,
        data.portfolioId || null,
    ]);
    (0, database_1.saveDb)();
    return getProjectById(id);
}
async function getProjectById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Project WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getProjectsByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Project WHERE userId = ? ORDER BY createdAt DESC`, [userId]);
    return result.length
        ? result[0].values.map((row) => rowToObject(result[0], row))
        : [];
}
// ============ ProfileAnalysis ============
async function createProfileAnalysis(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO ProfileAnalysis (id, userId, rawData, summary, strengths, improvements, suggestedRole, industry, experienceLevel, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
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
    ]);
    (0, database_1.saveDb)();
    return getProfileAnalysisById(id);
}
async function getProfileAnalysisById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM ProfileAnalysis WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getProfileAnalysesByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM ProfileAnalysis WHERE userId = ? ORDER BY createdAt DESC`, [userId]);
    return result.length
        ? result[0].values.map((row) => rowToObject(result[0], row))
        : [];
}
async function updateProfileAnalysis(id, data) {
    const db = await (0, database_1.getDb)();
    const updates = [];
    const values = [];
    if (data.summary !== undefined) {
        updates.push("summary = ?");
        values.push(data.summary);
    }
    if (data.strengths !== undefined) {
        updates.push("strengths = ?");
        values.push(data.strengths);
    }
    if (data.improvements !== undefined) {
        updates.push("improvements = ?");
        values.push(data.improvements);
    }
    if (data.suggestedRole !== undefined) {
        updates.push("suggestedRole = ?");
        values.push(data.suggestedRole);
    }
    if (data.industry !== undefined) {
        updates.push("industry = ?");
        values.push(data.industry);
    }
    if (data.experienceLevel !== undefined) {
        updates.push("experienceLevel = ?");
        values.push(data.experienceLevel);
    }
    if (data.status !== undefined) {
        updates.push("status = ?");
        values.push(data.status);
    }
    if (updates.length === 0)
        return getProfileAnalysisById(id);
    values.push(id);
    db.run(`UPDATE ProfileAnalysis SET ${updates.join(", ")} WHERE id = ?`, values);
    (0, database_1.saveDb)();
    return getProfileAnalysisById(id);
}
// ============ Portfolio ============
async function createPortfolio(data) {
    const db = await (0, database_1.getDb)();
    const id = crypto.randomUUID();
    db.run(`INSERT INTO Portfolio (id, userId, title, slug, description, template, theme, content)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        id,
        data.userId,
        data.title,
        data.slug,
        data.description || null,
        data.template || "minimal-white",
        data.theme || null,
        data.content || null,
    ]);
    (0, database_1.saveDb)();
    return getPortfolioById(id);
}
async function getPortfolioById(id) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Portfolio WHERE id = ?`, [id]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getPortfolioBySlug(slug) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Portfolio WHERE slug = ?`, [slug]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
async function getPortfoliosByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Portfolio WHERE userId = ? ORDER BY createdAt DESC`, [userId]);
    return result.length
        ? result[0].values.map((row) => rowToObject(result[0], row))
        : [];
}
async function updatePortfolio(id, data) {
    const db = await (0, database_1.getDb)();
    const sets = [];
    const values = [];
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
    if (sets.length === 0)
        return getPortfolioById(id);
    sets.push("updatedAt = datetime('now')");
    values.push(id);
    db.run(`UPDATE Portfolio SET ${sets.join(", ")} WHERE id = ?`, values);
    (0, database_1.saveDb)();
    return getPortfolioById(id);
}
async function deletePortfolio(id) {
    const db = await (0, database_1.getDb)();
    db.run(`DELETE FROM Portfolio WHERE id = ?`, [id]);
    (0, database_1.saveDb)();
}
// ============ Subscription ============
async function getSubscriptionByUserId(userId) {
    const db = await (0, database_1.getDb)();
    const result = db.exec(`SELECT * FROM Subscription WHERE userId = ?`, [userId]);
    if (!result.length || !result[0].values.length)
        return null;
    return rowToObject(result[0], result[0].values[0]);
}
//# sourceMappingURL=client.js.map