import {
  siPhp,
  siLaravel,
  siNodedotjs,
  siPython,
  siRedis,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siTypescript,
  siAlpinedotjs,
  siMysql,
  siPostgresql,
  siMongodb,
  siGit,
  siDocker,
  siPostman,
  siLinux,
} from "simple-icons";

export type BrandIcon = { path: string; hex: string };

/** Official brand icons keyed by the skill names in data.ts. */
export const brandIcons: Record<string, BrandIcon> = {
  PHP: { path: siPhp.path, hex: `#${siPhp.hex}` },
  Laravel: { path: siLaravel.path, hex: `#${siLaravel.hex}` },
  "Node.js": { path: siNodedotjs.path, hex: `#${siNodedotjs.hex}` },
  Python: { path: siPython.path, hex: `#${siPython.hex}` },
  Redis: { path: siRedis.path, hex: `#${siRedis.hex}` },
  "React.js": { path: siReact.path, hex: `#${siReact.hex}` },
  "Next.js": { path: siNextdotjs.path, hex: `#${siNextdotjs.hex}` },
  "Tailwind CSS": { path: siTailwindcss.path, hex: `#${siTailwindcss.hex}` },
  TypeScript: { path: siTypescript.path, hex: `#${siTypescript.hex}` },
  "Alpine.js": { path: siAlpinedotjs.path, hex: `#${siAlpinedotjs.hex}` },
  MySQL: { path: siMysql.path, hex: `#${siMysql.hex}` },
  PostgreSQL: { path: siPostgresql.path, hex: `#${siPostgresql.hex}` },
  MongoDB: { path: siMongodb.path, hex: `#${siMongodb.hex}` },
  "Git & GitHub": { path: siGit.path, hex: `#${siGit.hex}` },
  Docker: { path: siDocker.path, hex: `#${siDocker.hex}` },
  Postman: { path: siPostman.path, hex: `#${siPostman.hex}` },
  Linux: { path: siLinux.path, hex: `#${siLinux.hex}` },
};
