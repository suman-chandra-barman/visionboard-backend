import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  {
    key: "frameMaterial",
    label: "Frame Material",
    children: [
      {
        key: "Titanium",
        label: "Titanium",
      },
      {
        key: "Stainless Steel",
        label: "Stainless Steel",
      },
      {
        key: "Flexon",
        label: "Flexon",
      },
      {
        key: "Monel",
        label: "Monel",
      },
      {
        key: "Aluminum",
        label: "Aluminum",
      },
      {
        key: "Nylon",
        label: "Nylon",
      },
      {
        key: "Carbon Fiber",
        label: "Carbon Fiber",
      },
    ],
  },
  {
    key: "frameShape",
    label: "Frame Shape",
    children: [
      {
        key: "Round",
        label: "Round",
      },
      {
        key: "Square",
        label: "Square",
      },
      {
        key: "Rectangle",
        label: "Rectangle",
      },
      {
        key: "Oval",
        label: "Oval",
      },
      {
        key: "Cat Eye",
        label: "Cat Eye",
      },
    ],
  },
  {
    key: "lensType",
    label: "Lens Type",
    children: [
      {
        key: "Single Vision",
        label: "Single Vision",
      },
      {
        key: "Bifocal",
        label: "Bifocal",
      },
      {
        key: "Trifocal",
        label: "Trifocal",
      },
      {
        key: "Progressive",
        label: "Progressive",
      },
    ],
  },
  {
    key: "brand",
    label: "Brand",
    children: [
      {
        key: "Gucci",
        label: "Gucci",
      },
      {
        key: "Ray-Ban",
        label: "Ray-Ban",
      },
      {
        key: "Oakley",
        label: "Oakley",
      },
      {
        key: "Lenskart",
        label: "Lenskart",
      },
      {
        key: "Tom Ford",
        label: "Tom Ford",
      },
      {
        key: "Prada",
        label: "Prada",
      },
      {
        key: "Persol",
        label: "Persol",
      },
    ],
  },
  {
    key: "gender",
    label: "Gender",
    children: [
      {
        key: "Unisex",
        label: "Unisex",
      },
      {
        key: "Men",
        label: "Men",
      },
      {
        key: "Women",
        label: "Women",
      },
      {
        key: "Kids",
        label: "Kids",
      },
    ],
  },
];
