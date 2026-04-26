import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Icon } from "@/components/AudioPlayer/Interface/Controller/Icon";
import { MdPlayCircleFilled } from "@/components/icons";

const defaultRender = <MdPlayCircleFilled data-testid="default-svg" />;

describe("Icon — customIcon override", () => {
  it("renders render element when customIcon absent", () => {
    const { getByTestId } = render(<Icon render={defaultRender} />);
    expect(getByTestId("default-svg")).toBeInTheDocument();
  });

  it("renders render element when customIcon=undefined", () => {
    const { getByTestId } = render(
      <Icon render={defaultRender} customIcon={undefined} />
    );
    expect(getByTestId("default-svg")).toBeInTheDocument();
  });

  it("renders customIcon when provided — overrides render", () => {
    const { getByTestId, queryByTestId } = render(
      <Icon
        render={defaultRender}
        customIcon={<span data-testid="custom-icon" />}
      />
    );
    expect(getByTestId("custom-icon")).toBeInTheDocument();
    expect(queryByTestId("default-svg")).toBeNull();
  });

  it("customIcon can be a plain string", () => {
    const { getByText } = render(
      <Icon render={defaultRender} customIcon="▶" />
    );
    expect(getByText("▶")).toBeInTheDocument();
  });
});
