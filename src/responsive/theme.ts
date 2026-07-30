export const theme = {
  base: {
    hero: {
      box: "px-16 pt-16 pb-20 flex flex-col justify-center ",
      eyebrow: "text-[0.8rem] tracking-[0.15em] mb-6",
      title: "text-5xl",
      heroCTA: "gap-4",
      subtitle: "mb-8 text-base",
      desc: "text-base leading-[1.75] mb-10 ",
      rustBadge:
        "text-xs tracking-[0.08em] mb-10  py-[0.4rem] px-4 max-w-96 gap-[0.6rem]",
      scrollHint: "bottom-10 left-16 ",
    },
    navbar: {
      nav: "py-[1.2rem] px-16 ",
      displayText: "flex",
      displayImage: "hidden",
      menuEyeBrow: "text-xs3",
      menuLinkList: "text-xs",
      logoImage: "w-full",
      menu: "mt-0",
      hamburger: "",
    },

    button: {
      primary: "px-6 py-3 rounded-xl",
      buttonCta: "py-[0.85rem]",
      buttonHero: "py-[0.85rem] px-8",
    },

    section: {
      wrapper: "h-screen",
      default:"py-24 px-16"
    },
  },
  "mobile-short": {
    navbar: {
      nav: "py-[0.25rem] px-2",
      displayText: "hidden",
      displayImage: "static top-0",
      logoImage: "w-full h-xl",
      hamburger: " scale-[0.8]",
      menu: "mt-4",
    },
    hero: {
      box: "px-2 py-3 flex flex-col justify-start",
      title: "text-[clamp(2.25rem,calc(-2.25rem+30vw),3.75rem)]",
      eyebrow: "text-[clamp(0.5rem,calc(0.125rem+2.5vw),0.625rem)] mb-4",
      subtitle: "mb-4 text-xs",
      desc: "text-[clamp(0.5rem,calc(-0.25rem+5vw),0.75rem)] leading-1.7 mb-6 ",
      rustBadge:
        "text-[clamp(0.5rem,calc(-0.25rem+5vw),0.75rem)] tracking-[0.03em] mb-6  py-[0.4rem] px-4 max-w-96 gap-[clamp(0.2rem,calc(-1rem+8vw),0.6rem)]",
      heroCTA: "gap-[clamp(0.5rem,calc(-1rem+10vw),1rem)]",
      scrollHint: "bottom-10 left-0 ",
    },
    section: {
      wrapper: "h-[clamp(90dvh,92.5dvh,95dvh)]",
      default:"py-24 px-16"
    },

    button: {
      buttonCta: "py-[0.5rem]",
      buttonHero:
        "py-[0.5rem] px-[clamp(0.5rem,calc(-1rem+10vw),1rem)] text-[clamp(0.625rem,calc(0.25rem+2.5vw),0.75rem)]",
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
