/** Routes that always render dark, regardless of the visitor's theme choice. */
// Empty today: every page follows the visitor's theme. Add a route here to pin it to dark.
export const FORCED_DARK_ROUTES: ReadonlySet<string> = new Set<string>();

export function isForcedDarkRoute(pathname: string): boolean {
  return FORCED_DARK_ROUTES.has(pathname);
}
