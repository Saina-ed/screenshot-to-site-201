import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/features/focus/dashboard";
import { pageHead } from "@/features/focus/metadata";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Your Learning Space",
      "Stay focused. Learn your way. Your personal dashboard for clear notes and thoughtful revision.",
    ),
  component: Dashboard,
});
