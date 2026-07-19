"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

interface PdfUploaderProps {
  onPdfParsed: (data: any) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPE = "application/pdf";

export function PdfUploader({ onPdfParsed }: PdfUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "Only PDF files are accepted.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be under 10MB.";
    }
    return null;
  };

  const handleFile = (file: File) => {
    setError("");
    setSuccess(false);
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(file);
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setLoading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              setSuccess(true);
              setTimeout(() => onPdfParsed(data), 600);
              resolve();
            } catch {
              reject(new Error("Invalid response from server."));
            }
          } else {
            try {
              const errData = JSON.parse(xhr.responseText);
              reject(new Error(errData.error || "Upload failed."));
            } catch {
              reject(new Error("Upload failed with status " + xhr.status));
            }
          }
        });

        xhr.addEventListener("error", () => {
          reject(new Error("Network error during upload."));
        });

        xhr.open("POST", "/api/linkedin/parse-pdf");
        xhr.send(formData);
      });

      await uploadPromise;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    setSuccess(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : error
              ? "border-destructive/50 bg-destructive/5"
              : success
                ? "border-emerald-500/50 bg-emerald-50"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center">
              <p className="text-sm font-medium">Uploading...</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {uploadProgress}% complete
              </p>
            </div>
            <Progress value={uploadProgress} className="h-2 w-full max-w-xs" />
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-700">
                PDF imported successfully!
              </p>
              <p className="text-xs text-muted-foreground">
                Redirecting to review...
              </p>
            </div>
          </div>
        ) : (
          <>
            {file ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <FileText className="h-10 w-10 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="text-xs text-muted-foreground underline hover:text-foreground"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Drop your LinkedIn PDF here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse (PDF only, max 10MB)
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
