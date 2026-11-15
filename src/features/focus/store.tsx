import { useContext, useEffect, useState, type ReactNode } from "react";
import { sampleDocuments, type Document } from "./model";
import { FocusContext, type FocusState as State } from "./context";
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
    <FocusContext.Provider value={{ ...state, update: setState, saveDocument }}>
      {children}
    </FocusContext.Provider>
  );
}
export function useFocus() {
  const s = useContext(FocusContext);
  if (!s) throw new Error("FocusProvider required");
  return s;
}
