import type{ ReactElement } from "react";

export type BeamVariant = "rust" | "teal" | "dual";

export interface BeamProps {
  /**
   * Gradient yang digunakan pada border
   * rust -> url(#g-rust)
   * teal -> url(#g-teal)
   * dual -> url(#g-dual)
   */
  variant?: BeamVariant;

  /**
   * Border radius
   */
  radius?: number;

  /**
   * Tebal border
   */
  strokeWidth?: number;

  /**
   * Durasi animasi masuk (ms)
   */
  duration?: number;

  /**
   * Durasi animasi keluar (ms)
   */
  leaveDuration?: number;

  /**
   * Menjadikan child sebagai root element
   * (<Beam asChild><a /></Beam>)
   */
  asChild?: boolean;

  /**
   * Hanya menerima SATU React Element
   */
  children: ReactElement;
}