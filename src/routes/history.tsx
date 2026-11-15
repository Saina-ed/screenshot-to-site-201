import { createFileRoute } from "@tanstack/react-router";
import { Library } from "@/features/focus/library";
import { pageHead } from "@/features/focus/metadata";
export const Route = createFileRoute("/history")({
  head: () =>
    pageHead("Your Library", "Revisit your saved learning documents and revision progress."),
  component: () => <Library />,
});
