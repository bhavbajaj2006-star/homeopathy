// ============================================================================
// src/components/wizard/StepDocumentUpload.tsx
// ============================================================================

import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import type { UseFormReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { File, FileCheck2, Trash2, UploadCloud } from "lucide-react";
import type {
  ConsultationFormData,
  UploadedDocument,
} from "../../types/consultation.types";

export interface StepDocumentUploadProps {
  readonly form: UseFormReturn<ConsultationFormData>;
}

const ACCEPTED_EXTENSIONS: readonly string[] = ["pdf", "jpg", "jpeg", "png", "docx"];
const MAX_FILE_SIZE_KB = 10 * 1024;

function getExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? (parts[parts.length - 1] ?? "").toLowerCase() : "";
}

function formatFileSize(sizeKb: number): string {
  if (sizeKb < 1024) {
    return `${sizeKb.toFixed(0)} KB`;
  }
  return `${(sizeKb / 1024).toFixed(1)} MB`;
}

export function StepDocumentUpload({ form }: StepDocumentUploadProps): JSX.Element {
  const { watch, setValue } = form;
  const files = watch("documents.files");
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [rejectedFileNames, setRejectedFileNames] = useState<readonly string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeIntervalIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const activeIntervalIds = activeIntervalIdsRef.current;
    return () => {
      activeIntervalIds.forEach((id) => window.clearInterval(id));
      activeIntervalIds.clear();
    };
  }, []);

  const simulateUploadProgress = useCallback(
    (documentId: string): void => {
      const intervalId = window.setInterval(() => {
        setValue(
          "documents.files",
          watch("documents.files").map((doc) =>
            doc.id === documentId
              ? { ...doc, uploadProgress: Math.min(100, doc.uploadProgress + 18) }
              : doc
          ),
          { shouldValidate: true }
        );

        const updatedDoc = watch("documents.files").find(
          (doc) => doc.id === documentId
        );
        // Clear once complete, or if the file was removed mid-upload —
        // otherwise this interval would run forever with no matching doc.
        if (!updatedDoc || updatedDoc.uploadProgress >= 100) {
          window.clearInterval(intervalId);
          activeIntervalIdsRef.current.delete(intervalId);
        }
      }, 220);
      activeIntervalIdsRef.current.add(intervalId);
    },
    [setValue, watch]
  );

  const handleFilesAdded = useCallback(
    (fileList: FileList): void => {
      const accepted: UploadedDocument[] = [];
      const rejected: string[] = [];

      Array.from(fileList).forEach((file) => {
        const extension = getExtension(file.name);
        const sizeKb = file.size / 1024;

        if (!ACCEPTED_EXTENSIONS.includes(extension) || sizeKb > MAX_FILE_SIZE_KB) {
          rejected.push(file.name);
          return;
        }

        accepted.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          fileName: file.name,
          fileSizeKb: sizeKb,
          extension,
          uploadProgress: 0,
        });
      });

      if (rejected.length > 0) {
        setRejectedFileNames(rejected);
        window.setTimeout(() => setRejectedFileNames([]), 4000);
      }

      if (accepted.length > 0) {
        setValue("documents.files", [...files, ...accepted], { shouldValidate: true });
        accepted.forEach((doc) => simulateUploadProgress(doc.id));
      }
    },
    [files, setValue, simulateUploadProgress]
  );

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files.length > 0) {
      handleFilesAdded(event.dataTransfer.files);
    }
  };

  const handleRemoveFile = (documentId: string): void => {
    setValue(
      "documents.files",
      files.filter((doc) => doc.id !== documentId),
      { shouldValidate: true }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
        Upload previous prescriptions, lab reports, or scan copies relevant to
        your case. This step is optional but helps build a fuller picture
        before your consultation.
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-200 ${
          isDraggingOver
            ? "border-primary bg-primary-50 dark:bg-primary-900/30"
            : "border-primary-200 bg-clinical-surface dark:border-primary-900/50 dark:bg-clinical-surface-dark"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-secondary-300">
          <UploadCloud className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <p className="font-serif text-lg font-medium text-text-primary dark:text-text-primary-dark">
            Drag and drop files here
          </p>
          <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
            or{" "}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:text-secondary-300"
            >
              browse from your device
            </button>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {ACCEPTED_EXTENSIONS.map((extension) => (
            <span
              key={extension}
              className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:bg-primary-900/40 dark:text-secondary-300"
            >
              .{extension}
            </span>
          ))}
        </div>
        <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
          Maximum 10 MB per file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS.map((extension) => `.${extension}`).join(",")}
          onChange={(event) => {
            if (event.target.files) {
              handleFilesAdded(event.target.files);
            }
            event.target.value = "";
          }}
          className="sr-only"
          aria-label="Upload clinical documents"
        />
      </div>

      <AnimatePresence>
        {rejectedFileNames.length > 0 ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
          >
            Couldn't upload: {rejectedFileNames.join(", ")}. Please check file
            type and size (max 10 MB, accepted types listed above).
          </motion.p>
        ) : null}
      </AnimatePresence>

      {files.length > 0 ? (
        <ul className="flex flex-col gap-3">
          <AnimatePresence>
            {files.map((doc) => (
              <motion.li
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex items-center gap-4 rounded-2xl border border-primary-100 bg-clinical-surface px-4 py-3.5 dark:border-primary-900/50 dark:bg-clinical-surface-dark"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-secondary-300">
                  {doc.uploadProgress >= 100 ? (
                    <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <File className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary dark:text-text-primary-dark">
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
                    {formatFileSize(doc.fileSizeKb)} · .{doc.extension}
                  </p>
                  {doc.uploadProgress < 100 ? (
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary-50 dark:bg-primary-900/40">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-200 ease-linear"
                        style={{ width: `${doc.uploadProgress}%` }}
                      />
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(doc.id)}
                  aria-label={`Remove ${doc.fileName}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:text-text-secondary-dark dark:hover:bg-red-950/30"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : null}
    </div>
  );
}
