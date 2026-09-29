/** Routes that always render dark, regardless of the visitor's theme choice. */
export const FORCED_DARK_ROUTES: ReadonlySet<string> = new Set(["/about"]);

export function isForcedDarkRoute(pathname: string): boolean {
  return FORCED_DARK_ROUTES.has(pathname);
}
