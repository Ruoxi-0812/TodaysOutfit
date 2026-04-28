"use client";

import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="w-full max-w-lg rounded-card p-0 shadow-xl backdrop:bg-black/40 open:flex open:flex-col outline-none"
    >
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-blush-100">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
      )}
      <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
    </dialog>
  );
}
