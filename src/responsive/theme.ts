export const theme = {
  base: {
    hero: {
      box:'px-16 pt-16 pb-20',
      title: "text-5xl mt-6 mb-6",
      subtitle: "text-xl mt-4",
    },
    navbar: {
      nav: "py-[1.2rem] px-16 ",
      displayText: "flex",
      displayImage: "hidden",
      logoImage: "w-full",
      menu: "hidden",
      hamburger: "",
    },

    button: {
      primary: "px-6 py-3 rounded-xl",
    },

    section: {
      wrapper: "py-20 px-8",
    },
  },
  "mobile-short": {
     navbar: {
      nav: "py-[0.25rem] px-2",
      displayText: "hidden",
      displayImage: "absolute top-0",
      logoImage: "w-full h-xl",
      hamburger: " scale-[0.8]",
    },
    hero: {
      box:'px-4',
      title: "text-8xl mt-10 mb-10",
    },
    section: {
      wrapper: "py-10 px-4",
    },
   
    button: {
      primary: "px-5 py-3 rounded-lg",
    },
  },

  "mobile-normal": {
    hero: "text-4xl mt-5 mb-8 leading-tight",
    section: "py-12 px-5",
    button: "px-6 py-3 rounded-lg",
  },

  "mobile-tall": {
    hero: "text-5xl mt-8 mb-10 leading-tight",
    section: "py-14 px-6",
    button: "px-6 py-4 rounded-xl",
  },

  "tablet-short": {
    hero: "text-5xl mt-8 mb-8",
    section: "py-16 px-8",
    button: "px-8 py-4 rounded-xl",
  },

  "tablet-normal": {
    hero: "text-6xl mt-10 mb-10",
    section: "py-20 px-10",
    button: "px-10 py-4 rounded-xl",
  },

  "desktop-1024-short": {
    hero: "text-5xl mt-6 mb-6",
    section: "py-16 px-8",
    button: "px-8 py-4 rounded-xl",
  },

  "desktop-1024-medium": {
    hero: "text-6xl mt-8 mb-8",
    section: "py-20 px-10",
    button: "px-10 py-4 rounded-xl",
  },

  "desktop-1024-tall": {
    hero: "text-7xl mt-10 mb-10",
    section: "py-24 px-12",
    button: "px-10 py-4 rounded-xl",
  },

  "desktop-1280": {
    hero: "text-8xl mt-10 mb-10",
    section: "py-28 px-16",
    button: "px-12 py-5 rounded-2xl",
  },

  "desktop-1536": {
    hero: "text-9xl mt-12 mb-12",
    section: "py-32 px-20",
    button: "px-14 py-5 rounded-2xl",
  },
};
