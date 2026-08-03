export interface Breakpoint {
  name: string;
  devices:string[];
  width: [number, number];
  height: [number, number];
}

export const breakpoints: Breakpoint[] = [
  // Mobile
  {
    name: "mobile-short",
    width: [0, 320],
    height: [0, 568],
    devices: ["Android Small (240x320)", "Android Small (320x480)"],
  },
  {
    name: "mobile-normal",
    width: [321, 375],
    height: [512, 899],
    devices: [
      "Android Medium (360x640)",
      "Android Medium (375x667)",
      "Nokia 3.4",
      "Pixel 3",
      "Pixel 1/2",
    ],
  },
  {
    name: "mobile-tall",
    width: [0, 767],
    height: [900, 9999],
    devices: [
      "Android Medium (384x800)",
      "Android Medium (400x800)",
      "Android Medium (412x732)",
      "Android Medium (414x736)",
      "Android Medium (428x926)",
      "Android Medium (430x932)",
      "Xiaomi 14T",
      "Android Large (480x800)",
      "Android Large (480x854)",
      "Galaxy S20 Ultra/S21 Ultra/S22 Ultra/S23 Ultra/S24 Ultra",
      "OnePlus 7 Pro/7T Pro",
      "Android Large (600x1024)",
      "Android FHD (720x1280)",
      "Nokia 770/N800/N810/N900",
      "Samsung Galaxy Z Fold 2 (Cover)",
      "Samsung Galaxy Z Fold 3 (Cover)",
      "Samsung Galaxy Z Fold 4 (Cover)",
      "Samsung Galaxy Z Fold 6 (Cover)",
      "Google Pixel Fold (Cover)",
      "Nokia 6.2",
      "Android FHD+ (1080x1920)",
      "Android FHD+ (1080x2160)",
      "Android FHD+ (1080x2340)",
    ],
  },

  // Tablet
  {
    name: "tablet-short",
    width: [768, 1023],
    height: [0, 799],
    devices: ["iPad 1/2/Mini 1", "Lenovo Tab M8"],
  },
  {
    name: "tablet-normal",
    width: [768, 1023],
    height: [800, 9999],
    devices: [
      "iPad Mini 6 (2021)",
      "Xiaomi Mi Mix Fold",
      "iPad 10 (2022)",
      "iPad Pro 10.5",
      "iPad Pro 11 (2018/2020)",
      "iPad Pro 12.9 (2015/2017)",
      "iPad Pro 13 (2024)",
      "Lenovo Tab M10",
      "Lenovo Tab M10 Plus",
      "Samsung Galaxy Fold (Main)",
      "Xiaomi Pad 5",
      "Xiaomi Pad 6",
      "Samsung Galaxy Z Fold 2 (Main)",
      "Samsung Galaxy Z Fold 4 (Main)",
      "Lenovo Tab P12",
      "Lenovo Tab Extreme",
      "Samsung Galaxy Z Fold 6 (Main)",
      "Xiaomi Pad 6S Pro",
      "Google Pixel Fold (Main)",
    ],
  },

  // Desktop
  {
    name: "desktop-1024-short",
    width: [1024, 1279],
    height: [500, 767],
    devices: ["Lenovo ThinkPad T410", "Lenovo Chromebook 100e"],
  },
  {
    name: "desktop-1024-medium",
    width: [1024, 1279],
    height: [768, 899],
    devices: [
      "MacBook Air 13 (2010)",
      "Lenovo ThinkPad X1 Carbon Gen 1",
      "iMac 20 (2009)",
      "Lenovo ThinkBook Plus",
    ],
  },
  {
    name: "desktop-1024-tall",
    width: [1024, 1279],
    height: [900, 9999],
    devices: [
      "Microsoft Surface Laptop 3",
      "Microsoft Surface Laptop Studio",
      "Microsoft Surface Pro 7",
      "Lenovo Yoga Slim 7i",
      "Microsoft Surface Book 2",
    ],
  },

  {
    name: "desktop-1280",
    width: [1280, 1535],
    height: [0, 999],
    devices: [
      "Android QHD (1440x2560)",
      "MacBook Pro 14 M1 (2021)",
      "MacBook Pro 16 Intel (2019)",
      "MacBook Pro 16 M1 (2021)",
    ],
  },

  {
    name: "desktop-1536",
    width: [1536, 9999],
    height: [0, 999],
    devices: [
      "Lenovo Legion 7i (2024)",
      "Vision Pro",
      "ASUS ZenBook Pro",
      "iMac 21.5 4K (2015)",
      "iMac 24 4.5K (2021)",
      "Studio Display",
      "Mac Pro Display XDR",
    ],
  },
];
