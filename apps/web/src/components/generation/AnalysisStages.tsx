"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  label: string;
}

interface AnalysisStagesProps {
  stages: readonly Stage[];
  currentStage: number;
  error?: string | null;
}

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

const labelVariants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8 },
};

export function AnalysisStages({ stages, currentStage, error }: AnalysisStagesProps) {
  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Vertical line */}
      <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />

      <div className="space-y-6">
        {stages.map((stage, index) => {
          const isPending = index > currentStage;
          const isActive = index === currentStage;
          const isCompleted = index < currentStage;
          const isError = error && index === currentStage;

          return (
            <div key={stage.id} className="relative flex items-start gap-4">
              {/* Icon */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                <AnimatePresence mode="wait">
                  {isCompleted && (
                    <motion.div
                      key="completed"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </motion.div>
                  )}
                  {isActive && !isError && (
                    <motion.div
                      key="processing"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex h-6 w-6 items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "linear",
                        }}
                      >
                        <Loader2 className="h-6 w-6 text-primary" />
                      </motion.div>
                    </motion.div>
                  )}
                  {isError && (
                    <motion.div
                      key="error"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </motion.div>
                  )}
                  {isPending && (
                    <motion.div
                      key="pending"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${stage.id}-${isCompleted ? "completed" : isActive ? (isError ? "error" : "active") : "pending"}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-center pt-1"
                >
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isCompleted && "text-emerald-600 dark:text-emerald-400",
                      isActive && !isError && "text-foreground",
                      isError && "text-destructive",
                      isPending && "text-muted-foreground",
                    )}
                  >
                    {stage.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
