/**
 * Utility for merging class names.
 * Filters out falsy values and joins the rest with spaces.
 */
export function cn(
  ...inputs: ReadonlyArray<string | boolean | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
