// Service packages, shared by the packages page and the order form so the
// prices are written down once. Texts live under "packagesPage.<key>".

export const PACKAGES = [
  {
    key: "plans",
    orderType: "Plans package",
    oldPrice: 78,
    price: 59,
    featured: false,
    itemKeys: ["plan2dView", "plan3d", "revisionsPlan", "delivery"],
  },
  {
    key: "interior",
    orderType: "Interior package",
    oldPrice: 156,
    price: 139,
    featured: true,
    itemKeys: ["plan3d", "rooms", "revisionsItem", "delivery"],
  },
  {
    key: "full",
    orderType: "Full presentation package",
    oldPrice: 415,
    price: 399,
    featured: false,
    itemKeys: ["plan2d", "plan3d", "interior", "exterior", "delivery"],
  },
] as const;

export type PackageOrderType = (typeof PACKAGES)[number]["orderType"];
