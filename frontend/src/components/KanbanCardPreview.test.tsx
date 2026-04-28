import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KanbanCardPreview } from "./KanbanCardPreview";

describe("KanbanCardPreview", () => {
  it("renders card title and details", () => {
    render(
      <KanbanCardPreview
        card={{
          id: "card-1",
          title: "Plan sprint scope",
          details: "Define stories and acceptance criteria.",
        }}
      />
    );

    expect(screen.getByText("Plan sprint scope")).toBeInTheDocument();
    expect(
      screen.getByText("Define stories and acceptance criteria.")
    ).toBeInTheDocument();
  });
});
