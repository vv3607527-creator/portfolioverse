"use client";

import { CheckCircle2, FileText, Globe, Mail, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface GenerationResultProps {
  portfolioUrl?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
}

export function GenerationResult({
  portfolioUrl,
  resumeUrl,
  coverLetterUrl,
}: GenerationResultProps) {
  const items = [
    {
      title: "Portfolio",
      description: "Your AI-generated portfolio website",
      icon: Globe,
      url: portfolioUrl,
      editUrl: portfolioUrl ? `${portfolioUrl}/edit` : undefined,
      status: portfolioUrl ? "ready" : "pending",
    },
    {
      title: "Resume",
      description: "Professionally formatted resume",
      icon: FileText,
      url: resumeUrl,
      editUrl: resumeUrl ? `${resumeUrl}/edit` : undefined,
      status: resumeUrl ? "ready" : "pending",
    },
    {
      title: "Cover Letter",
      description: "Tailored cover letter draft",
      icon: Mail,
      url: coverLetterUrl,
      editUrl: coverLetterUrl ? `${coverLetterUrl}/edit` : undefined,
      status: coverLetterUrl ? "ready" : "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Generation Complete</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your AI-generated content is ready to view and edit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant={item.status === "ready" ? "success" : "secondary"}>
                  {item.status === "ready" ? "Ready" : "Pending"}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {item.description}
              </p>
              {item.status === "ready" && (
                <div className="mt-4 flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.url!}>
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={item.editUrl!}>
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>
        <Button asChild>
          <Link href={portfolioUrl || "/dashboard"}>
            <Eye className="mr-2 h-4 w-4" />
            View Portfolio
          </Link>
        </Button>
      </div>
    </div>
  );
}
