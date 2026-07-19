export declare function initDatabase(): Promise<void>;
export declare function createUser(data: {
    email: string;
    name?: string;
    image?: string;
    clerkId: string;
}): Promise<Record<string, any> | null>;
export declare function getUserById(id: string): Promise<Record<string, any> | null>;
export declare function getUserByClerkId(clerkId: string): Promise<Record<string, any> | null>;
export declare function updateUser(id: string, data: {
    name?: string;
    image?: string;
}): Promise<Record<string, any> | null>;
export declare function deleteUser(id: string): Promise<void>;
export declare function createLinkedInProfile(data: {
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
}): Promise<Record<string, any> | null>;
export declare function getLinkedInProfileById(id: string): Promise<Record<string, any> | null>;
export declare function getLinkedInProfileByUserId(userId: string): Promise<Record<string, any> | null>;
export declare function createResume(data: {
    userId: string;
    title?: string;
    content?: string;
    template?: string;
    portfolioId?: string;
}): Promise<Record<string, any> | null>;
export declare function getResumeById(id: string): Promise<Record<string, any> | null>;
export declare function getResumesByUserId(userId: string): Promise<Record<string, any>[]>;
export declare function updateResume(id: string, data: Partial<{
    title: string;
    content: string;
    template: string;
    pdfUrl: string;
}>): Promise<Record<string, any> | null>;
export declare function createCoverLetter(data: {
    userId: string;
    title?: string;
    content?: string;
    targetCompany?: string;
    targetRole?: string;
    jobDescription?: string;
    writingStyle?: string;
}): Promise<Record<string, any> | null>;
export declare function getCoverLetterById(id: string): Promise<Record<string, any> | null>;
export declare function getCoverLettersByUserId(userId: string): Promise<Record<string, any>[]>;
export declare function updateCoverLetter(id: string, data: Partial<{
    title: string;
    content: string;
    targetCompany: string;
    targetRole: string;
    jobDescription: string;
    writingStyle: string;
    pdfUrl: string;
}>): Promise<Record<string, any> | null>;
export declare function createProject(data: {
    userId: string;
    name: string;
    description?: string;
    portfolioId?: string;
}): Promise<Record<string, any> | null>;
export declare function getProjectById(id: string): Promise<Record<string, any> | null>;
export declare function getProjectsByUserId(userId: string): Promise<Record<string, any>[]>;
export declare function createProfileAnalysis(data: {
    userId: string;
    rawData?: string;
    summary?: string;
    strengths?: string;
    improvements?: string;
    suggestedRole?: string;
    industry?: string;
    experienceLevel?: string;
    status?: string;
}): Promise<Record<string, any> | null>;
export declare function getProfileAnalysisById(id: string): Promise<Record<string, any> | null>;
export declare function getProfileAnalysesByUserId(userId: string): Promise<Record<string, any>[]>;
export declare function updateProfileAnalysis(id: string, data: {
    summary?: string;
    strengths?: string;
    improvements?: string;
    suggestedRole?: string;
    industry?: string;
    experienceLevel?: string;
    status?: string;
}): Promise<Record<string, any> | null>;
export declare function createPortfolio(data: {
    userId: string;
    title: string;
    slug: string;
    description?: string;
    template?: string;
    theme?: string;
    content?: string;
}): Promise<Record<string, any> | null>;
export declare function getPortfolioById(id: string): Promise<Record<string, any> | null>;
export declare function getPortfolioBySlug(slug: string): Promise<Record<string, any> | null>;
export declare function getPortfoliosByUserId(userId: string): Promise<Record<string, any>[]>;
export declare function updatePortfolio(id: string, data: Partial<{
    title: string;
    slug: string;
    description: string;
    template: string;
    published: number;
    domain: string;
    theme: string;
    content: string;
}>): Promise<Record<string, any> | null>;
export declare function deletePortfolio(id: string): Promise<void>;
export declare function getSubscriptionByUserId(userId: string): Promise<Record<string, any> | null>;
//# sourceMappingURL=client.d.ts.map