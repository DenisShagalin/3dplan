import type { Metadata } from "next";

// The previous price page, kept only to compare it with the redesign.
// It stays out of search results so it doesn't compete with "/price".
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OldPriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
