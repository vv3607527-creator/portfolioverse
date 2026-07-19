"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnalysisStages } from "@/components/generation/AnalysisStages";
import { GenerationResult } from "@/components/generation/GenerationResult";

interface GeneratedIds {
  portfolioId?: string;
  resumeId?: string;
  coverLetterId?: string;
}

const STAGES = [
  { id: "profile", label: "Analyzing LinkedIn profile" },
  { id: "experience", label: "Extracting work experience" },
  { id: "skills", label: "Parsing skills and expertise" },
  { id: "structure", label: "Building portfolio structure" },
  { id: "portfolio", label: "Generating your portfolio" },
  { id: "resume", label: "Creating your resume" },
  { id: "cover-letter", label: "Writing your cover letter" },
] as const;

export default function GeneratePage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [generatedIds, setGeneratedIds] = useState<GeneratedIds | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const generateAll = useCallback(async () => {
    try {
      // Stage 0-3: Visual-only animation (2s each)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStage(1);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStage(2);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStage(3);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStage(4);

      // Stage 4: Generate portfolio
      const portfolioRes = await fetch("/api/ai/generate-portfolio", {
        method: "POST",
      });
      if (!portfolioRes.ok) {
        const portfolioErr = await portfolioRes.json();
        if (portfolioRes.status === 400 && portfolioErr.error === "No LinkedIn profile found") {
          router.push("/onboarding");
          return;
        }
        throw new Error(portfolioErr.error || "Failed to generate portfolio");
      }
      const portfolioData = await portfolioRes.json();
      setGeneratedIds((prev) => ({ ...prev, portfolioId: portfolioData.portfolio.id }));
      setCurrentStage(5);

      // Stage 5: Generate resume
      const resumeRes = await fetch("/api/ai/generate-resume", {
        method: "POST",
      });
      if (!resumeRes.ok) {
        const resumeErr = await resumeRes.json();
        throw new Error(resumeErr.error || "Failed to generate resume");
      }
      const resumeData = await resumeRes.json();
      setGeneratedIds((prev) => ({ ...prev, resumeId: resumeData.resume.id }));
      setCurrentStage(6);

      // Stage 6: Generate cover letter
      const coverLetterRes = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetCompany: "Your Dream Company",
          targetRole: "Software Engineer",
          jobDescription: "",
        }),
      });
      if (!coverLetterRes.ok) {
        const coverLetterErr = await coverLetterRes.json();
        throw new Error(coverLetterErr.error || "Failed to generate cover letter");
      }
      const coverLetterData = await coverLetterRes.json();
      setGeneratedIds((prev) => ({ ...prev, coverLetterId: coverLetterData.coverLetter.id }));
      setCurrentStage(7);

      // Complete
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, []);
  useEffect(() => {
    generateAll();
  }, [generateAll]);

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="rounded-full bg-red-100 p-4 mb-6">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </Container>
    );
  }

  if (isComplete && generatedIds) {
    return (
      <Container>
        <GenerationResult
          portfolioUrl={generatedIds.portfolioId ? `/portfolio/${generatedIds.portfolioId}` : undefined}
          resumeUrl={generatedIds.resumeId ? `/resume/${generatedIds.resumeId}` : undefined}
          coverLetterUrl={generatedIds.coverLetterId ? `/cover-letter/${generatedIds.coverLetterId}` : undefined}
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI is Building Your Portfolio
          </h1>
          <p className="text-gray-500">
            Analyzing your LinkedIn profile and generating content...
          </p>
        </motion.div>

        <AnalysisStages stages={STAGES} currentStage={currentStage} />
      </div>
    </Container>
  );
}
