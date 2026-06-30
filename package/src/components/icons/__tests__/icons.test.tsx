import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdPlaylistPlay,
  TbRepeat,
  TbRepeatOnce,
  TbRepeatOff,
  TbArrowsShuffle,
  TbVolume,
  TbVolume2,
  TbVolume3,
  ImPrevious,
  ImNext,
} from "@/components/icons";
import type { SvgIconProps } from "@/components/icons";
import { FC } from "react";

const allIcons: [string, FC<SvgIconProps>][] = [
  ["MdPlayCircleFilled", MdPlayCircleFilled],
  ["MdPauseCircleFilled", MdPauseCircleFilled],
  ["MdPlaylistPlay", MdPlaylistPlay],
  ["TbRepeat", TbRepeat],
  ["TbRepeatOnce", TbRepeatOnce],
  ["TbRepeatOff", TbRepeatOff],
  ["TbArrowsShuffle", TbArrowsShuffle],
  ["TbVolume", TbVolume],
  ["TbVolume2", TbVolume2],
  ["TbVolume3", TbVolume3],
  ["ImPrevious", ImPrevious],
  ["ImNext", ImNext],
];

describe("size prop", () => {
  it.each(allIcons)("%s default → height/width 1em", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("height")).toBe("1em");
    expect(svg.getAttribute("width")).toBe("1em");
  });

  it("numeric size → height/width as string", () => {
    const { container } = render(<MdPlayCircleFilled size={24} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("height")).toBe("24");
    expect(svg.getAttribute("width")).toBe("24");
  });

  it("string size applied", () => {
    const { container } = render(<MdPlayCircleFilled size="2rem" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("height")).toBe("2rem");
    expect(svg.getAttribute("width")).toBe("2rem");
  });
});

describe("color prop", () => {
  it("style.color set when color provided", () => {
    const { container } = render(<MdPlayCircleFilled color="red" />);
    const svg = container.querySelector("svg")!;
    expect(svg.style.color).toBe("red");
  });

  it("color merges with style prop", () => {
    const { container } = render(
      <MdPlayCircleFilled color="blue" style={{ opacity: 0.5 }} />
    );
    const svg = container.querySelector("svg")!;
    expect(svg.style.color).toBe("blue");
    expect(svg.style.opacity).toBe("0.5");
  });

  it("style alone (no color) — style applied without color override", () => {
    const { container } = render(
      <MdPlayCircleFilled style={{ opacity: 0.8 }} />
    );
    const svg = container.querySelector("svg")!;
    expect(svg.style.color).toBe("");
    expect(svg.style.opacity).toBe("0.8");
  });
});

describe("SVGProps forwarding", () => {
  it("className forwarded", () => {
    const { container } = render(<MdPlayCircleFilled className="rmap-icon" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("rmap-icon")).toBe(true);
  });

  it("role forwarded", () => {
    const { container } = render(<MdPlayCircleFilled role="img" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("role")).toBe("img");
  });

  it("explicit aria-hidden overrides default", () => {
    const { container } = render(<MdPlayCircleFilled aria-hidden={false} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("false");
  });
});

describe("smoke — all 12 icons render svg", () => {
  it.each(allIcons)("%s renders an svg element", (_name, Icon) => {
    const { container } = render(<Icon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});

describe("decorative a11y defaults — all icons hidden from AT", () => {
  it.each(allIcons)("%s is aria-hidden and not focusable", (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("focusable")).toBe("false");
  });
});
