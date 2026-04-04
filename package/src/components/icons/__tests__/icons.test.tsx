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

describe("SVG icon defaults — MdPlayCircleFilled", () => {
  it('aria-hidden="true"', () => {
    const { container } = render(<MdPlayCircleFilled />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it('focusable="false"', () => {
    const { container } = render(<MdPlayCircleFilled />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("focusable")).toBe("false");
  });

  it('default size → height/width "1em"', () => {
    const { container } = render(<MdPlayCircleFilled />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("height")).toBe("1em");
    expect(svg.getAttribute("width")).toBe("1em");
  });

  it('viewBox="0 0 24 24"', () => {
    const { container } = render(<MdPlayCircleFilled />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("no style.color when color prop absent", () => {
    const { container } = render(<MdPlayCircleFilled />);
    const svg = container.querySelector("svg")!;
    expect(svg.style.color).toBe("");
  });
});

describe("size prop", () => {
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

describe("Tb icon defaults — TbRepeat", () => {
  it('aria-hidden="true"', () => {
    const { container } = render(<TbRepeat />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it('focusable="false"', () => {
    const { container } = render(<TbRepeat />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("focusable")).toBe("false");
  });

  it('fill="none"', () => {
    const { container } = render(<TbRepeat />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("fill")).toBe("none");
  });

  it('strokeWidth="2"', () => {
    const { container } = render(<TbRepeat />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("stroke-width")).toBe("2");
  });
});

describe("Im icon defaults — ImPrevious", () => {
  it('aria-hidden="true"', () => {
    const { container } = render(<ImPrevious />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it('viewBox="0 0 16 16"', () => {
    const { container } = render(<ImPrevious />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("viewBox")).toBe("0 0 16 16");
  });
});

describe("smoke — all 12 icons render svg", () => {
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

  it.each(allIcons)("%s renders an svg element", (_name, Icon) => {
    const { container } = render(<Icon />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
