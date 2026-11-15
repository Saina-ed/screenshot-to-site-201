import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Plus, Pencil, Trash2, FolderOpen, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shell, PageHeader } from "./shell";
import { useFocus } from "./store";
import { DocumentCard } from "./dashboard";
export function Library({ revision = false }: { revision?: boolean }) {
  const { documents, update } = useFocus();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [sort, setSort] = useState("opened");
  const [rename, setRename] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const docs = documents
    .filter(
      (d) =>
        d.title.toLowerCase().includes(search.toLowerCase()) &&
        (subject === "All subjects" || d.subject === subject),
    )
    .sort((a, b) =>
      sort === "created" ? b.created.localeCompare(a.created) : b.opened.localeCompare(a.opened),
    );
  return (
    <Shell>
      <PageHeader
        title={revision ? "Revision" : "History"}
        eyebrow={revision ? "Revision" : "History"}
      />
      <main className="page-content">
        <div className="page-intro">
          <div>
            <h1>
              {revision
                ? "A little recall. A lot of understanding."
                : "Your learning, all in one place."}
            </h1>
            <p>
              {revision
                ? "Choose a lesson and give your knowledge a little space to grow."
                : "Every idea you’ve collected, ready when you are."}
            </p>
          </div>
          <Button asChild>
            <Link to="/create">
              <Plus />
              New notes
            </Link>
          </Button>
        </div>
        <div className="library-tools">
          <div className="search-field">
            <Search />
            <input
              aria-label="Search documents"
              placeholder="Search your documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            aria-label="Filter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {["All subjects", ...new Set(documents.map((d) => d.subject))].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            aria-label="Sort documents"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="opened">Last opened</option>
            <option value="created">Date created</option>
          </select>
        </div>
        <div className="document-grid library-grid">
          {docs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              actions={
                <>
                  {revision ? (
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link to="/canvas" search={{ doc: doc.id, mode: "revision" }}>
                        Start revision
                      </Link>
                    </Button>
                  ) : (
                    <div className="doc-actions">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Rename document"
                        onClick={() => {
                          setRename(doc.id);
                          setName(doc.title);
                        }}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete document"
                        onClick={() => setDeleting(doc.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  )}
                  {rename === doc.id && (
                    <div className="mt-3 flex gap-2">
                      <input
                        aria-label="New document title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Button
                        size="icon"
                        aria-label="Save title"
                        disabled={!name.trim()}
                        onClick={() => {
                          update((s) => ({
                            ...s,
                            documents: s.documents.map((d) =>
                              d.id === doc.id ? { ...d, title: name.trim() } : d,
                            ),
                          }));
                          setRename(null);
                        }}
                      >
                        <Check />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Cancel rename"
                        onClick={() => setRename(null)}
                      >
                        <X />
                      </Button>
                    </div>
                  )}
                  {deleting === doc.id && (
                    <div className="notice">
                      <p>Delete “{doc.title}”? This cannot be undone.</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            update((s) => ({
                              ...s,
                              documents: s.documents.filter((d) => d.id !== doc.id),
                            }));
                            setDeleting(null);
                          }}
                        >
                          Delete
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleting(null)}>
                          Keep it
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              }
            />
          ))}
        </div>
        {!docs.length && (
          <div className="empty-state">
            <FolderOpen size={35} />
            <h2>No documents here yet.</h2>
            <p>
              {search ? "Try a different search." : "Your next big idea starts with a small note."}
            </p>
            <Button asChild>
              <Link to="/create">Create notes</Link>
            </Button>
          </div>
        )}
      </main>
    </Shell>
  );
}
