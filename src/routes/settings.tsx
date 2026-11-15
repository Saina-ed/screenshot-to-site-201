import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/features/focus/settings";
import { pageHead } from "@/features/focus/metadata";
export const Route = createFileRoute("/settings")({
  head: () =>
    pageHead(
      "Settings",
      "Personalise your Focus Frame learning space and simulated focus tracking.",
    ),
  component: Settings,
});
