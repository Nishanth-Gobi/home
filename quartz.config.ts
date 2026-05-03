import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🪴 Nishanth Gobi",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "garden.nishanthgobi.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "Fraunces",
          includeItalic: true,
          axes: { opsz: "9..144", wght: "300..900", SOFT: "0..100" },
        },
        body: {
          name: "Source Serif 4",
          includeItalic: true,
          axes: { opsz: "8..60", wght: "300..700" },
        },
        code: {
          name: "JetBrains Mono",
          weights: [400, 500, 700],
        },
      },
      colors: {
        lightMode: {
          light: "#F0EBE0",
          lightgray: "#D9D2C2",
          gray: "#8A8170",
          darkgray: "#1A1611",
          dark: "#1A1611",
          secondary: "#B73A1E",
          tertiary: "#B73A1E",
          highlight: "rgba(183, 58, 30, 0.10)",
          textHighlight: "rgba(183, 58, 30, 0.18)",
        },
        darkMode: {
          light: "#1F1A14",
          lightgray: "#2E2820",
          gray: "#7A7163",
          darkgray: "#D4CBB8",
          dark: "#E8E0CC",
          secondary: "#D85838",
          tertiary: "#D85838",
          highlight: "rgba(216, 88, 56, 0.15)",
          textHighlight: "rgba(216, 88, 56, 0.22)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveSpecials()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
