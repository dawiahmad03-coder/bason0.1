const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE0MTI3MjAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhiMjIyZDYzY0U5MTVCZGVjYjczODZENzkwMjQ4ODgzOGM0ZGQzMERBIn0",
    payload: "eyJkb21haW4iOiJiYXNvbi1vbmUudmVyY2VsLmFwcCJ9",
    signature:
      "pNb+q/gYlnUr4mNAYu3/TJMOjEpedPCCCeYMi0yHoeJqTnCApdJBPztIfKMydFNmOspseQ0ZcNUlpkwm7TQGwxw=",
  },
  baseBuilder: {
    ownerAddress: "",
  },
  miniapp: {
    version: "1",
    name: "Bason Todo",
    subtitle: "Liste de tâches",
    description: "Mini app de productivité pour créer et suivre vos tâches.",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "productivity",
    tags: ["productivity", "todo"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Gérez vos tâches au quotidien",
    ogTitle: "Bason Todo",
    ogDescription: "Créez, suivez et terminez vos tâches au quotidien.",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
