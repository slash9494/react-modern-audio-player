import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderPlayer } from "./fixtures/render";

describe("Repeat type cycling", () => {
  it("5-1: default repeat type is ALL", () => {
    renderPlayer();
    const btn = screen.getByTestId("repeat-btn");
    expect(btn).toHaveAttribute("data-repeattype", "ALL");
  });

  it("5-2: clicking repeat cycles ALL → ONE → NONE → SHUFFLE → ALL", () => {
    renderPlayer();
    const btn = screen.getByTestId("repeat-btn");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("data-repeattype", "ONE");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("data-repeattype", "NONE");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("data-repeattype", "SHUFFLE");

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("data-repeattype", "ALL");
  });
});
