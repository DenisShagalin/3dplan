import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Drop-in replacements for "next/link" and "next/navigation" that keep the
// active locale prefix on every internal href. External and empty hrefs are
// passed straight through.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
