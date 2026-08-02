import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconSlot } from "@/ui/IconSlot";
import { MdPlayCircleFilled } from "@/ui/icons";

const defaultRender = <MdPlayCircleFilled data-testid="default-svg" />;

describe("IconSlot — customIcon override", () => {
  it("renders render element when customIcon absent", () => {
    const { getByTestId } = render(<IconSlot render={defaultRender} />);
    expect(getByTestId("default-svg")).toBeInTheDocument();
  });

  it("renders render element when customIcon=undefined", () => {
    const { getByTestId } = render(
      <IconSlot render={defaultRender} customIcon={undefined} />
    );
    expect(getByTestId("default-svg")).toBeInTheDocument();
  });

  it("renders customIcon when provided — overrides render", () => {
    const { getByTestId, queryByTestId } = render(
      <IconSlot
        render={defaultRender}
        customIcon={<span data-testid="custom-icon" />}
      />
    );
    expect(getByTestId("custom-icon")).toBeInTheDocument();
    expect(queryByTestId("default-svg")).toBeNull();
  });

  it("customIcon can be a plain string", () => {
    const { getByText } = render(
      <IconSlot render={defaultRender} customIcon="▶" />
    );
    expect(getByText("▶")).toBeInTheDocument();
  });
});
