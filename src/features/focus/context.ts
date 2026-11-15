import { createContext } from "react";
import type { Document } from "./model";

export type FocusState = {
  documents: Document[];
  user: { name: string; email: string } | null;
  dark: boolean;
  tracking: boolean;
  sessions: { title: string; covered: number; total: number; date: string }[];
};

export type FocusStore = FocusState & {
  update: (fn: (state: FocusState) => FocusState) => void;
  saveDocument: (doc: Document) => void;
};

// Keep context identity outside the refreshable provider/component module.
// A live update must not give existing providers and refreshed consumers
// different context objects.
export const FocusContext = createContext<FocusStore | null>(null);