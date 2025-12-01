import { argv } from "bun";

const day = argv[2] || "day1";

try {
  await import(`./${day}.ts`);
} catch (error) {
  console.error(`Failed to load ${day}.ts:`, error);
  process.exit(1);
}
