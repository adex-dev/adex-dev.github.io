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
      displayText: "flex justify-center items-center gap-4",
      displayImage: "hidden",
      menuEyeBrow: "text-xs3",
      menuLinkList: "text-[clamp(0.75rem,calc(-1.925rem+13.333vw),1.2rem)]",
      logoImage: "w-full",
      menu: "mt-0",
      hamburger: "",
      logoTextImage: "w-16 h-16",
      logoText: "text-[clamp(1rem,calc(-2.012rem+6.275vw),2rem)]",
      navLink:
        "text-[clamp(0.85rem,calc(0.097rem+1.569vw),1.1rem)] tracking-[0.04em]",
    },
    button: {
      primary: "px-6 py-3 rounded-xl",
      buttonCta: "py-[0.85rem]",
      buttonHero: "py-[0.85rem] px-8",
    },
    section: {
      wrapper: "h-screen",
      default: "py-24 px-16",
      about: "py-24 px-16",
    },
    about:{
      grid:"grid grid-cols-1 gap-3 items-start",
      photoWrap:"flex justify-center",
      photoFrame:"w-80 h-90",
      content:"",
      desc:"text-muted leading-[1.8] mb-5 text-[0.97rem]",
      factBox:"grid gap-3 mt-8 grid-cols-2",
      facts:"flex items-start gap-2.5 text-[0.85rem] text-muted;",
      factIcons:"text-rust font-mono text-[0.8rem] shrink-0 mt-[0.1rem]"
    },
    eyebrow:"mono-label text-[0.75rem] text-teal tracking-[0.15em] mb-3 flex items-center gap-3",
    title:{
      about:"font-bold tracking-[-0.02em] mb-4 text-[clamp(1.8rem,3vw,2.5rem)]"
    }
  },
  "mobile-short": {
    navbar: {
      nav: "nav-short",
      displayText: "hidden",
      displayImage: "static top-0",
      logoImage: "logo-image-short",
      hamburger: " hamburger-short",
      heroCTA: "heroCTAShort",
      menu: "mt-4",
    },
    hero: {
      box: "hero-box-short",
      title: "hero-title-short",
      eyebrow: "hero-eyebrow-short",
      subtitle: "hero-subtitle-short",
      desc: "hero-desc-short ",
      rustBadge: "rust-badge-short",
      scrollHint: "scrollHintShort",
    },
    section: {
      wrapper: "wrapperShort",
      about: "sectionAboutShort",
    },
    button: {
      buttonCta: "py-[0.5rem]",
      buttonHero:
        "py-[0.5rem] px-[clamp(0.5rem,calc(-1rem+10vw),1rem)] text-[clamp(0.625rem,calc(0.25rem+2.5vw),0.75rem)]",
    },
    about:{
      grid:"about-grid-short",
      photoWrap:"about-photo-wrap-short",
      photoFrame:"about-photo-frame-short",
      content:"mb-3",
      desc:"about-desc-short",
      factBox:"about-facts-short",
      facts:"about-fact-short",
      factIcons:"about-fact-icon-short"
    },
    eyebrow:"eyebrow-short",
    title:{
      about:"about-title-short"
    }
  },

  "mobile-normal": {
    navbar: {
      nav: "py-[0.25rem] px-2",
      displayText: "hidden",
      displayImage: "static top-0",
      logoImage: "w-full h-10",
      hamburger: " scale-[0.8]",
      menu: "mt-4",
      menuLinkList: "text-[clamp(0.75rem,calc(-1.925rem+13.333vw),1.2rem)]",
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
      scrollHint: "bottom-10 left-2 ",
    },
    section: {
      wrapper: "h-[clamp(90dvh,92.5dvh,95dvh)]",
      default: "py-24 px-16",
    },

    button: {
      buttonCta: "py-[0.5rem]",
      buttonHero:
        "py-[0.9rem]  px-[clamp(1.4rem,calc(-3.356rem+23.704vw),2.2rem)]",
    },
  },

  "mobile-tall": {
    navbar: {
      nav: "py-[1.2rem] px-5 ",
      displayText: "flex justify-center items-center gap-4",
      displayImage: "hidden",
      logoImage: "w-full",
      menu: "mt-0",
      logoTextImage: "w-16 h-16",
      logoText: "text-sm",
    },

    section: "py-14 px-6 min-h-screen",
    button: "px-6 py-4 rounded-xl",
  },

  "tablet-short": {
    navbar: {
      nav: "py-[1.2rem] px-5 ",
    },
    hero: "text-5xl mt-8 mb-8",
    section: "py-16 px-8",
    button: "px-8 py-4 rounded-xl",
  },

  "tablet-normal": {
    navbar: {
      nav: "py-[1.2rem] px-5 ",
    },
    hero: "text-6xl mt-10 mb-10",
    section: "py-20 px-10",
    button: "px-10 py-4 rounded-xl",
  },

  "desktop-1024-short": {
    navbar: {
      nav: "py-[1.2rem] px-5 ",
    },
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
