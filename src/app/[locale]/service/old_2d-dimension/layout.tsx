import type { Metadata } from "next";

// The previous 2D-dimension service page, kept only to compare it with the redesign.
// It stays out of search results so it doesn't compete with "/service/2d-dimension".
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Old2dDimensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
