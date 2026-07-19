"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { LinkedInUrlInput } from "@/components/onboarding/LinkedInUrlInput";
import { PdfUploader } from "@/components/onboarding/PdfUploader";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Linkedin,
  Upload,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LinkedInProfileData } from "@/lib/linkedin";

interface FormData {
  fullName: string;
  professionalTitle: string;
  location: string;
  industry: string;
  yearsOfExperience: string;
  careerGoal: string;
}

const initialFormData: FormData = {
  fullName: "",
  professionalTitle: "",
  location: "",
  industry: "",
  yearsOfExperience: "",
  careerGoal: "",
};

const STEPS = [
  { number: 1, title: "Welcome", description: "Tell us about yourself" },
  { number: 2, title: "Import", description: "Import your LinkedIn data" },
  { number: 3, title: "Review", description: "Review and confirm" },
];

function WelcomeStep({
  formData,
  errors,
  onChange,
}: {
  formData: FormData;
  errors: Partial<FormData>;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name *</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            errors.fullName ? "border-destructive" : "border-input"
          )}
        />
        {errors.fullName && (
          <p className="text-xs text-destructive">{errors.fullName}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Professional Title *</label>
        <input
          type="text"
          placeholder="Full Stack Developer"
          value={formData.professionalTitle}
          onChange={(e) => onChange("professionalTitle", e.target.value)}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            errors.professionalTitle ? "border-destructive" : "border-input"
          )}
        />
        {errors.professionalTitle && (
          <p className="text-xs text-destructive">{errors.professionalTitle}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input
            type="text"
            placeholder="San Francisco, CA"
            value={formData.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Industry</label>
          <input
            type="text"
            placeholder="Technology"
            value={formData.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Years of Experience</label>
          <input
            type="number"
            min="0"
            max="50"
            placeholder="5"
            value={formData.yearsOfExperience}
            onChange={(e) => onChange("yearsOfExperience", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Career Goal *</label>
        <textarea
          placeholder="e.g., I want to build a personal portfolio to showcase my projects and attract new opportunities."
          value={formData.careerGoal}
          onChange={(e) => onChange("careerGoal", e.target.value)}
          rows={3}
          className={cn(
            "flex w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none",
            errors.careerGoal ? "border-destructive" : "border-input"
          )}
        />
        {errors.careerGoal && (
          <p className="text-xs text-destructive">{errors.careerGoal}</p>
        )}
      </div>
    </div>
  );
}

function ImportStep({
  onUrlParsed,
  onPdfParsed,
}: {
  onUrlParsed: (data: any) => void;
  onPdfParsed: (data: any) => void;
}) {
  const [importMethod, setImportMethod] = useState<"url" | "pdf" | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Import your LinkedIn profile data to automatically populate your
        portfolio. Choose one of the methods below.
      </p>

      {!importMethod ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => setImportMethod("url")}
            className="flex flex-col items-center gap-3 rounded-lg border-2 border-input p-6 transition-colors hover:border-primary hover:bg-primary/5"
          >
            <Linkedin className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">LinkedIn URL</p>
              <p className="text-xs text-muted-foreground">
                Enter your profile URL
              </p>
            </div>
          </button>
          <button
            onClick={() => setImportMethod("pdf")}
            className="flex flex-col items-center gap-3 rounded-lg border-2 border-input p-6 transition-colors hover:border-primary hover:bg-primary/5"
          >
            <Upload className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">Upload PDF</p>
              <p className="text-xs text-muted-foreground">
                Upload your LinkedIn PDF
              </p>
            </div>
          </button>
        </div>
      ) : importMethod === "url" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">LinkedIn URL</p>
            <button
              onClick={() => setImportMethod(null)}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Change method
            </button>
          </div>
          <LinkedInUrlInput onUrlParsed={onUrlParsed} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">PDF Upload</p>
            <button
              onClick={() => setImportMethod(null)}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Change method
            </button>
          </div>
          <PdfUploader onPdfParsed={onPdfParsed} />
        </div>
      )}
    </div>
  );
}

function ReviewStep({ linkedInData }: { linkedInData: LinkedInProfileData | null }) {
  if (!linkedInData) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="mb-3 h-12 w-12 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No LinkedIn data available. Please go back and import your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Headline & About */}
      <div className="space-y-3">
        {linkedInData.headline && (
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Headline
            </label>
            <p className="mt-1 text-sm">{linkedInData.headline}</p>
          </div>
        )}
        {linkedInData.about && (
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              About
            </label>
            <p className="mt-1 text-sm leading-relaxed">
              {linkedInData.about}
            </p>
          </div>
        )}
      </div>

      {/* Experience */}
      {linkedInData.experience && linkedInData.experience.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Experience</h4>
          {linkedInData.experience.map((exp, i) => (
            <div
              key={i}
              className="rounded-lg border bg-muted/30 p-3 text-sm"
            >
              <p className="font-medium">{exp.title}</p>
              <p className="text-muted-foreground">
                {exp.company}
                {exp.dates && ` · ${exp.dates}`}
              </p>
              {exp.description && (
                <p className="mt-1 text-muted-foreground">{exp.description}</p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-muted-foreground">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {linkedInData.education && linkedInData.education.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Education</h4>
          {linkedInData.education.map((edu, i) => (
            <div
              key={i}
              className="rounded-lg border bg-muted/30 p-3 text-sm"
            >
              <p className="font-medium">{edu.school}</p>
              <p className="text-muted-foreground">
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
                {edu.dates && ` · ${edu.dates}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {linkedInData.skills && linkedInData.skills.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {linkedInData.skills.map((skill, i) => (
              <Badge key={i} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {linkedInData.certifications &&
        linkedInData.certifications.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Certifications</h4>
            {linkedInData.certifications.map((cert, i) => (
              <div
                key={i}
                className="rounded-lg border bg-muted/30 p-3 text-sm"
              >
                <p className="font-medium">{cert.name}</p>
                <p className="text-muted-foreground">
                  {cert.issuer}
                  {cert.date && ` · ${cert.date}`}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {linkedInData.projects && linkedInData.projects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Projects</h4>
            {linkedInData.projects.map((proj, i) => (
              <div
                key={i}
                className="rounded-lg border bg-muted/30 p-3 text-sm"
              >
                <p className="font-medium">{proj.name}</p>
                {proj.description && (
                  <p className="text-muted-foreground">{proj.description}</p>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {proj.technologies.map((tech, j) => (
                      <Badge key={j} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {linkedInData.languages && linkedInData.languages.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {linkedInData.languages.map((lang, i) => (
                <Badge key={i} variant="secondary">
                  {lang.language}
                  {lang.proficiency && ` - ${lang.proficiency}`}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [linkedInData, setLinkedInData] =
    useState<LinkedInProfileData | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
      if (!formData.professionalTitle.trim())
        newErrors.professionalTitle = "Professional title is required.";
      if (!formData.careerGoal.trim())
        newErrors.careerGoal = "Career goal is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleUrlParsed = (data: any) => {
    setLinkedInData(data);
    setCurrentStep(2);
  };

  const handlePdfParsed = (data: any) => {
    setLinkedInData(data);
    setCurrentStep(2);
  };

  const handleComplete = async () => {
    router.push("/generate");
  };

  return (
    <Container className="py-8">
      <div className="mx-auto max-w-2xl">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                      index < currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : index === currentStep
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        index <= currentStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="hidden text-xs text-muted-foreground sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-4 mt-5 h-0.5 flex-1 transition-colors",
                      index < currentStep
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{STEPS[currentStep]!.title}</CardTitle>
                <CardDescription>
                  {STEPS[currentStep]!.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && (
                  <WelcomeStep
                    formData={formData}
                    errors={errors}
                    onChange={updateFormData}
                  />
                )}
                {currentStep === 1 && (
                  <ImportStep
                    onUrlParsed={handleUrlParsed}
                    onPdfParsed={handlePdfParsed}
                  />
                )}
                {currentStep === 2 && (
                  <ReviewStep linkedInData={linkedInData} />
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {currentStep < STEPS.length - 1 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    <Check className="mr-2 h-4 w-4" />
                    Complete Setup
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
