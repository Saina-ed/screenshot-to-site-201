export type Layout = "Key ideas" | "Step by step" | "Question & answer" | "Mind map";
export type Note = {
  id: string;
  title: string;
  text: string;
  topic: string;
  color: string;
  question: string;
};
export type Document = {
  id: string;
  title: string;
  subject: string;
  notes: Note[];
  views: Record<string, number>;
  created: string;
  opened: string;
  layout: Layout;
  confidence: Record<string, string>;
};
export const layouts: Layout[] = ["Key ideas", "Step by step", "Question & answer", "Mind map"];
export const biologyNotes: Note[] = [
  [
    "What is photosynthesis?",
    "Plants convert light energy into chemical energy stored in glucose.",
    "The basics",
    "blue",
    "What is photosynthesis?",
  ],
  [
    "Where does it happen?",
    "Photosynthesis takes place in chloroplasts. They contain the green pigment chlorophyll.",
    "Inside the leaf",
    "green",
    "Where does photosynthesis take place?",
  ],
  [
    "The word equation",
    "Carbon dioxide + water → glucose + oxygen. Light energy and chlorophyll are needed.",
    "The basics",
    "blue",
    "What is the word equation for photosynthesis?",
  ],
  [
    "The light reactions",
    "Chlorophyll absorbs light energy. This powers reactions that release oxygen and store energy for making glucose.",
    "Light & energy",
    "lavender",
    "What happens when chlorophyll absorbs light?",
  ],
  [
    "Making carbohydrates",
    "Carbon dioxide is used to make carbohydrates using energy from the light reactions. This stage is called the Calvin cycle.",
    "Making glucose",
    "peach",
    "How is carbon dioxide used to make carbohydrates?",
  ],
  [
    "Role of chlorophyll",
    "Chlorophyll absorbs light, providing the energy needed for photosynthesis.",
    "Inside the leaf",
    "green",
    "What is the role of chlorophyll?",
  ],
  [
    "Limiting factors",
    "Light intensity, carbon dioxide concentration and temperature can limit the rate of photosynthesis.",
    "Limiting factors",
    "yellow",
    "Name three limiting factors of photosynthesis.",
  ],
  [
    "Effect of light intensity",
    "More light increases the rate until another factor becomes limiting. The rate then levels off.",
    "Limiting factors",
    "yellow",
    "Why does increasing light eventually stop increasing the rate?",
  ],
  [
    "Testing photosynthesis",
    "Measure oxygen production in pondweed. Change one factor and keep the others constant for a fair test.",
    "Investigating",
    "peach",
    "How could you investigate the rate of photosynthesis?",
  ],
].map((n, i) => ({
  id: `note-${i}`,
  title: n[0] ?? "",
  text: n[1] ?? "",
  topic: n[2] ?? "",
  color: n[3] ?? "blue",
  question: n[4] ?? "",
}));
export function makeDocument(
  title: string,
  subject: string,
  notes: Note[],
  layout: Layout = "Key ideas",
): Document {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    subject,
    notes,
    views: {},
    created: now,
    opened: now,
    layout,
    confidence: {},
  };
}
export function sampleDocuments(): Document[] {
  const names = [
    ["Photosynthesis", "Biology"],
    ["Cell Structure", "Biology"],
    ["Energy Transfers", "Physics"],
    ["Quadratic Equations", "Mathematics"],
  ];
  const content = [
    biologyNotes,
    [
      "Animal cells have a nucleus, cytoplasm and cell membrane.",
      "Plant cells also have a cell wall, chloroplasts and a permanent vacuole.",
      "The nucleus contains genetic material and controls cell activities.",
      "Mitochondria are the site of aerobic respiration.",
    ],
    [
      "Energy can be stored in kinetic, thermal, chemical and gravitational stores.",
      "Energy is conserved: it cannot be created or destroyed.",
      "Energy transfers occur by heating, waves, electric currents and forces.",
      "Efficiency is useful energy output divided by total energy input.",
    ],
    [
      "A quadratic equation contains a squared variable.",
      "Factorise an expression by finding two numbers whose product and sum match.",
      "For x² + 5x + 6 = 0, write (x + 2)(x + 3) = 0.",
      "Each factor can equal zero, so x = −2 or x = −3.",
    ],
  ];
  return names.map(([title, subject], i) => {
    const raw = content[i];
    const notes =
      i === 0
        ? biologyNotes
        : (raw as string[]).map((text, j) => ({
            id: `note-${j}`,
            title: ["Key concept", "Building understanding", "Putting it together", "In practice"][
              j
            ],
            text,
            topic: title,
            color: ["green", "blue", "peach", "lavender"][j],
            question: `Explain: ${["the key concept", "the next idea", "how it works", "the practical example"][j]}`,
          }));
    const d = makeDocument(
      title ?? "Lesson",
      subject ?? "Other",
      notes.map((n) => ({
        ...n,
        title: n.title ?? "Key concept",
        topic: n.topic ?? "Lesson",
        color: n.color ?? "blue",
      })),
    );
    d.id = `sample-${i}`;
    if (i === 0)
      d.views = { "note-0": 2, "note-1": 1, "note-2": 1, "note-3": 1, "note-4": 1, "note-5": 1 };
    return d;
  });
}
export function generateNotes(text: string, density: string): Note[] {
  if (/photosynth|chlorophyll|chloroplast/i.test(text)) return biologyNotes.map((n) => ({ ...n }));
  const sentences = text
    .split(/(?:\n+|(?<=[.!?])\s+)/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.slice(0, 10).map((sentence, i) => {
    const words = sentence.split(/\s+/);
    return {
      id: `note-${i}`,
      title: words
        .slice(0, 5)
        .join(" ")
        .replace(/[.!?:]$/, ""),
      text: words.slice(0, density === "Concise" ? 24 : density === "Detailed" ? 65 : 40).join(" "),
      topic: `Idea ${Math.floor(i / 3) + 1}`,
      color: ["blue", "green", "lavender", "peach", "yellow"][Math.floor(i / 2) % 5] ?? "blue",
      question: `What can you explain about ${words.slice(0, 4).join(" ").toLowerCase()}?`,
    };
  });
}
export function quizAfter(index: number, length: number) {
  return (index + 1) % 4 === 0 && index + 1 < length;
}
export function evaluateAnswer(answer: string, model: string) {
  const keywords = [...new Set(model.toLowerCase().match(/[a-z]{5,}/g) || [])].filter(
    (w) => !["which", "their", "other", "needed", "using", "takes", "these"].includes(w),
  );
  const matches = keywords.filter((w) => answer.toLowerCase().includes(w));
  return { good: matches.length >= Math.max(1, Math.ceil(keywords.length * 0.35)), matches };
}
