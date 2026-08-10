import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const requireBox = async (locator: Locator): Promise<BoundingBox> => {
  const box = await locator.boundingBox();
  expect(box).toBeTruthy();
  return box as BoundingBox;
};
