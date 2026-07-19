"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ResumeEditor from "@/components/editor/ResumeEditor";
import { Container } from "@/components/ui/container";

export default function ResumeEditorPage() {
  const params = useParams();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/resume?id=${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setResume(data.resume);
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
      <Container className="py-8">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      </Container>
    );
  }

  if (error || !resume) {
    return (
      <Container className="py-8">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">Resume not found</h2>
          <p className="mt-2 text-muted-foreground">
            The resume you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.
          </p>
        </div>
      </Container>
    );
  }

  return <ResumeEditor resume={resume} />;
}
