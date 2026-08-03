export const theme = {
  base: {
    hero: {
      box: "grid grid-cols-2 items-center pt-28 px-16 pb-20 gap-8",
      eyebrow: "gap-4 text-[0.75rem] mb-6 tracking-[0.18em]",
      title: "leading-[0.92] tracking-[-0.03em] mb-5",
      first: "text-[clamp(4.5rem,9vw,7.5rem)]",
      last: "text-[clamp(4.5rem,9vw,7.5rem)] tracking-[-0.02em]",
      heroCTA: "gap-4",
      subtitle:
        "mb-1 leading-[1.3] text-[clamp(2.5rem,1.76rem+1.157vw,2.7rem)]!",
      desc: "text-base leading-[1.75] mb-10 ",
      rustBadge:
        "text-xs tracking-[0.08em] mb-10  py-[0.4rem] px-4 max-w-96 gap-[0.6rem]",
      scrollHint: "bottom-10 left-16 ",
      right: "flex",
      orb: "w-[520px] h-[520px]",
      ring: "w-[460px] h-[460px]",
      ring2: "w-[380px] h-[380px]",
      termCardBack: "w-[280px] h-[130px]",
      termCard: "w-[360px]",
    },
    navbar: {
      nav: "py-[1.2rem] px-16 ",
      displayText: "flex gap-10",
      NavLinkS: "flex justify-center items-center gap-4",
      displayImage: "hidden",
      menuEyeBrow: "text-xs3",
      menuLinkList: "text-[clamp(0.75rem,calc(-1.925rem+13.333vw),1.2rem)]",
      logoImage: "w-full",
      menu: "mt-0",
      hamburger: "",
      logoTextImage: "w-10 h-10",
      logoText: "text-[clamp(1rem,calc(-2.012rem+6.275vw),2rem)]",
      navLink:
        "text-[clamp(0.85rem,calc(0.097rem+1.569vw),1.1rem)] tracking-[0.04em]",
    },
    button: {
      primary: "px-6 py-3 rounded-xl",
      buttonCta: "py-[0.85rem]",
      buttonHero: "py-[0.85rem] px-8",
      buttonOutline: "py-[0.55rem]! px-5! gap-2 rounded-[6px] text-sm",
    },
    section: {
      wrapper: "h-screen inline-table",
      default: "py-24 px-16",
      about: "py-24 px-16",
      skill: "bg-surface py-24 px-16",
    },
    about: {
      grid: "grid grid-cols-1 gap-3 items-start",
      photoWrap: "flex justify-center",
      photoFrame: "w-80 h-90",
      content: "",
      factBox: "grid gap-3 mt-8 grid-cols-2",
      factIcons: "text-rust font-mono text-[0.8rem] shrink-0 mt-[0.1rem]",
    },

    standard: {
      eyebrow:
        "mono-label text-[0.75rem] text-teal tracking-[0.15em] mb-3 flex items-center gap-3",
      header:
        "font-bold tracking-[-0.02em] mb-4 text-[clamp(1.8rem,3vw,2.5rem)]",
      desc: "text-muted leading-[1.8] mb-5 text-[0.97rem]",
      icon: "text-[1.4rem] mb-4",
      stack: "",
    },
    stats: {
      box: "grid grid-cols-4 mb-2 gap-2 p-4",
      stat: "min-w-full borderR rounded-xl shadow-2xl p-4 overflow transition-surface hover:borderY",
      glow: "-bottom-5 -right-2.5 w-15 h-15 rounded-1/2 blur-[25px] opacity-[0.15] bg-teal",
      num: "font-mono text-[2.4rem] font-bold text-text leading-none mb-[0.4rem]",
      label: "text-sm text-muted uppercase tracking-[0.06em]",
    },
    skill: {
      box: "grid3-0.5 border-0! bg-transparent! gap-3",
      card: "",
    },
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
      skill: "bg-surface sectionSkillShort",
    },
    button: {
      buttonCta: "py-[0.5rem]",
      buttonHero:
        "py-[0.5rem] px-[clamp(0.5rem,calc(-1rem+10vw),1rem)] text-[clamp(0.625rem,calc(0.25rem+2.5vw),0.75rem)]",
    },
    about: {
      grid: "about-grid-short",
      photoWrap: "about-photo-wrap-short",
      photoFrame: "about-photo-frame-short",
      content: "mb-3",
      factBox: "about-facts-short",
      factIcons: "about-fact-icon-short",
    },
    standard: {
      eyebrow: "eyebrow-short",
      header: "title-short",
      desc: "desc-short",
      icon: "short",
      stack: "short",
    },
    stats: {
      box: "grid-cols-2 p-2 grid gap-2",
      stat: "min-w-full borderR rounded-xl shadow-2xl p-1 overflow transition-surface hover:borderY",
      glow: "-bottom-5 -right-2.5 w-15 h-10 rounded-1/2 blur-[25px] opacity-[0.15] bg-teal",
      num: "font-mono text-[clamp(0.75rem,calc(0.245rem+2.516vw),1rem)] font-bold text-text leading-none mb-[0.4rem]",
      label:
        "text-[clamp(0.75rem,calc(0.245rem+2.516vw),1rem)] text-muted uppercase tracking-[0.06em]",
    },
    skill: {
      box: "grid-cols-1 gap-2 border-0! bg-transparent! grid px-2 ",
      card: "short beam beam-rust",
    },
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
      skill: "bg-surface sectionSkillShort",
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
    hero: {
      box: "grid grid-cols-2 items-center pt-[clamp(1rem,calc(-29.118rem+37.647vmin),7rem)] px-16 pb-[clamp(2.5rem,calc(-10.049rem+15.686vmin),5rem)] gap-8",
      eyebrow: "gap-4 text-[clamp(0.75rem,calc(-9.038rem+12.235vmin),2.7rem)] mb-[clamp(0.5rem,calc(-4.52rem+6.275vmin),1.5rem)] tracking-[0.18em]",
      title: "leading-[0.92] tracking-[-0.03em] mb-5",
      first: "text-[clamp(4rem,calc(-11.059rem+18.824vmin),7rem)]",
      last: "text-[clamp(4rem,calc(-11.059rem+18.824vmin),7rem)] tracking-[-0.02em]",
      heroCTA: "gap-4",
      subtitle:
        "mb-1 leading-[1.3] text-[clamp(0.75rem,calc(-9.038rem+12.235vmin),2.7rem)]!",
      desc: "text-[clamp(0.75rem,calc(-0.505rem+1.569vmin),1rem)] leading-[1.75] mb-[clamp(0.75rem,calc(-8.034rem+10.98vmin),2.5rem)] ",
      rustBadge:
        "text-xs tracking-[0.08em] mb-[clamp(0.75rem,calc(-8.034rem+10.98vmin),2.5rem)]  py-[0.4rem] px-4 max-w-96 gap-[0.6rem]",
      scrollHint: "bottom-[clamp(4rem,calc(12.784rem+-10.98vmin),2.25rem)] left-16 ",
    },
     navbar: {
      nav: "py-[clamp(0.75rem,calc(-1.509rem+2.824vmin),1.2rem)]! px-16 ",
     }
  },

  "desktop-1536": {
    // hero: "text-9xl mt-12 mb-12",
    // section: "py-32 px-20",
    // button: "px-14 py-5 rounded-2xl",
  },
};
