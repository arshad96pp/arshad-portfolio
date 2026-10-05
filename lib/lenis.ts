import type Lenis from "lenis";

/** Module-level handle so the menu can pause scrolling without prop-drilling. */
let instance: Lenis | null = null;

export const lenisStore = {
  get: () => instance,
  set: (l: Lenis | null) => {
    instance = l;
  },
};
