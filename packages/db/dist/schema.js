"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCHEMA_SQL = void 0;
exports.SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  clerkId TEXT UNIQUE NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Portfolio (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  template TEXT NOT NULL DEFAULT 'minimal-white',
  published INTEGER NOT NULL DEFAULT 0,
  domain TEXT,
  theme TEXT,
  content TEXT,
  analytics TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Deployment (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  status TEXT NOT NULL DEFAULT 'pending',
  url TEXT,
  platform TEXT,
  error TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  portfolioId TEXT NOT NULL,
  FOREIGN KEY (portfolioId) REFERENCES Portfolio(id)
);

CREATE TABLE IF NOT EXISTS Subscription (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  credits INTEGER NOT NULL DEFAULT 10,
  stripeCustomerId TEXT,
  stripeSubscriptionId TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS LinkedInProfile (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  headline TEXT,
  about TEXT,
  experience TEXT,
  education TEXT,
  skills TEXT,
  certifications TEXT,
  projects TEXT,
  languages TEXT,
  rawData TEXT,
  importMethod TEXT NOT NULL DEFAULT 'url',
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL UNIQUE,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Resume (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL DEFAULT 'My Resume',
  content TEXT,
  template TEXT NOT NULL DEFAULT 'professional',
  pdfUrl TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  portfolioId TEXT,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (portfolioId) REFERENCES Portfolio(id)
);

CREATE TABLE IF NOT EXISTS CoverLetter (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  title TEXT NOT NULL DEFAULT 'Cover Letter',
  content TEXT,
  targetCompany TEXT,
  targetRole TEXT,
  jobDescription TEXT,
  writingStyle TEXT NOT NULL DEFAULT 'professional',
  pdfUrl TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Project (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  description TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  portfolioId TEXT,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (portfolioId) REFERENCES Portfolio(id)
);

CREATE TABLE IF NOT EXISTS ProfileAnalysis (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  rawData TEXT,
  summary TEXT,
  strengths TEXT,
  improvements TEXT,
  suggestedRole TEXT,
  industry TEXT,
  experienceLevel TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
  userId TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES User(id)
);
`;
//# sourceMappingURL=schema.js.map