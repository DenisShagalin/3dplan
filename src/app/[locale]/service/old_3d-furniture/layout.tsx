import type { Metadata } from "next";

// The previous 3D-furniture service page, kept only to compare it with the redesign.
// It stays out of search results so it doesn't compete with "/service/3d-furniture".
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Old3dFurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
