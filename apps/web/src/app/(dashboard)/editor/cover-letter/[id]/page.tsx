"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CoverLetterEditor from "@/components/editor/CoverLetterEditor";
import { Container } from "@/components/ui/container";

export default function CoverLetterEditorPage() {
  const params = useParams();
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/cover-letter?id=${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setCoverLetter(data.coverLetter);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    );
  }

  if (error || !coverLetter) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Cover letter not found</h2>
        <p className="mt-2 text-muted-foreground">
          The cover letter you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.
        </p>
      </div>
    );
  }

  return <CoverLetterEditor coverLetter={coverLetter} />;
}
