"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = getDb;
exports.saveDb = saveDb;
exports.closeDb = closeDb;
const sql_js_1 = __importDefault(require("sql.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, "..", ((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.replace("file:", "")) || "dev.db");
let db = null;
async function getDb() {
    if (db)
        return db;
    const SQL = await (0, sql_js_1.default)();
    try {
        const buffer = fs_1.default.readFileSync(DB_PATH);
        db = new SQL.Database(buffer);
    }
    catch (_a) {
        db = new SQL.Database();
    }
    db.run("PRAGMA journal_mode=WAL");
    db.run("PRAGMA foreign_keys=ON");
    return db;
}
function saveDb() {
    if (!db)
        return;
    const data = db.export();
    const buffer = Buffer.from(data);
    fs_1.default.mkdirSync(path_1.default.dirname(DB_PATH), { recursive: true });
    fs_1.default.writeFileSync(DB_PATH, buffer);
}
function closeDb() {
    if (db) {
        db.close();
        db = null;
    }
}
//# sourceMappingURL=database.js.map