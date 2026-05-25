// docusaurus.config.ts

import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "Akmad Nudin",
  tagline: "Fullstack Engineer",
  favicon: "img/favicon.svg",

  url: "https://adex-dev.github.io",
  baseUrl: "/",

  organizationName: "akmad nudin",
  projectName: "portfolio",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },

    navbar: {
      title: "Akmad Nudin",
    },

    footer: {
      style: "dark",
      links: [],
      copyright: `akmad nudin`,
    },

    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "rust",
        "python",
        "toml",
        "yaml",
        "log",
        "hcl",
      ],
    },
    metadata: [
      {name: 'keywords', content: 'Akmad Nudin, Fullstack Engineer, TypeScript Developer, React Developer, Golang Developer, DevOps Engineer, Backend Engineer, Linux Developer, Rust Developer, Php Developer'},
      {name: 'author', content: 'Akmad Nudin'},
      {property: 'og:type', content: 'website'},
      {property: 'og:description', content: 'Fullstack Engineer, React, and Linux-inspired UI.'},
      {property: 'og:url', content: 'https://adex-dev.github.io'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'Akmad Nudin | Fullstack Engineer'},
      {name: 'twitter:description', content: 'Akmad Nudin, Fullstack Engineer, TypeScript Developer, React Developer, Golang Developer, DevOps Engineer, Backend Engineer, Linux Developer, Rust Developer, Php Developer'},
      {name: 'robots', content: 'index, follow'},
      {name: 'theme-color', content: '#300a24'},
    ],
     headTags: [
    // Declare a <link> preconnect tag
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://adex-dev.github.io',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Person',
        name: 'Akmad Nudin',
        url: 'https://akmadnudin.com/',
        logo: 'https://adex-dev.github.com/static/img/logo.svg',
        sameAs: [
        "https://github.com/akmadnudin",
        "https://linkedin.com/in/akmadnudin",
      ],
      jobTitle: "Fullstack Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      knowsAbout: [
        "React",
        "Rust",
        "Python",
        "Tailwindcss",
        "Docker",
        "Linux",
        "Go",
      ],
      }),
    },
  ],
  },
};

export default config;