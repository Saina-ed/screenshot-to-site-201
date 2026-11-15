import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { sampleDocuments, type Document } from "./model";
type User = { name: string; email: string };
type State = {
  documents: Document[];
  user: User | null;
  dark: boolean;
  tracking: boolean;
  sessions: { title: string; covered: number; total: number; date: string }[];
};
type Store = State & {
  update: (fn: (state: State) => State) => void;
  saveDocument: (doc: Document) => void;
};
const Context = createContext<Store | null>(null);
const initial: State = { documents: [], user: null, dark: false, tracking: true, sessions: [] };
export function FocusProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("focus-frame-demo");
      setState(
        raw ? { ...initial, ...JSON.parse(raw) } : { ...initial, documents: sampleDocuments() },
      );
    } catch {
      setState({ ...initial, documents: sampleDocuments() });
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      localStorage.setItem("focus-frame-demo", JSON.stringify(state));
      document.documentElement.classList.toggle("dark", state.dark);
    }
  }, [state, ready]);
  function saveDocument(doc: Document) {
    setState((s) => ({
      ...s,
      documents: s.documents.some((d) => d.id === doc.id)
        ? s.documents.map((d) => (d.id === doc.id ? doc : d))
        : [doc, ...s.documents],
    }));
  }
  return (
    <Context.Provider value={{ ...state, update: setState, saveDocument }}>
      {children}
    </Context.Provider>
  );
}
export function useFocus() {
  const s = useContext(Context);
  if (!s) throw new Error("FocusProvider required");
  return s;
}
