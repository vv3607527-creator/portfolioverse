const initSqlJs = require("sql.js");
const fs = require("fs");

async function test() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS User (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      image TEXT,
      clerkId TEXT UNIQUE NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Portfolio (
      id TEXT PRIMARY KEY,
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
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS LinkedInProfile (
      id TEXT PRIMARY KEY,
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
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Resume (
      id TEXT PRIMARY KEY,
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
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS CoverLetter (
      id TEXT PRIMARY KEY,
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
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Project (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      userId TEXT NOT NULL,
      portfolioId TEXT,
      FOREIGN KEY (userId) REFERENCES User(id),
      FOREIGN KEY (portfolioId) REFERENCES Portfolio(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ProfileAnalysis (
      id TEXT PRIMARY KEY,
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
    )
  `);

  // Test insert
  const id = crypto.randomUUID();
  db.run(
    "INSERT INTO User (id, email, name, clerkId) VALUES (?, ?, ?, ?)",
    [id, "test@example.com", "Test User", "clerk_123"]
  );

  const result = db.exec("SELECT * FROM User");
  console.log("Tables created and data inserted successfully");
  console.log("Columns:", result[0].columns);
  console.log("Row:", result[0].values[0]);

  // Export and save
  const data = db.export();
  fs.writeFileSync("dev.db", Buffer.from(data));
  console.log("Database saved to dev.db");

  db.close();
  console.log("All tests passed!");
}

test().catch(console.error);
