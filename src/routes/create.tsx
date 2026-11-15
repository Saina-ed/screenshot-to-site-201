import { createFileRoute } from "@tanstack/react-router";
import { CreateNotes } from "@/features/focus/create";
import { pageHead } from "@/features/focus/metadata";
export const Route = createFileRoute("/create")({
  head: () =>
    pageHead(
      "Create Notes",
      "Transform your lesson material into clear, structured learning cards.",
    ),
  component: CreateNotes,
});
