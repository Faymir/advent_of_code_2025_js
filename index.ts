import { argv } from "bun";

const day = argv[2] || "day1";
const part = argv[3] || "1";

try {
  const module = await import(`@/${day}.ts`);
  await module.run(part === "1");
} catch (error) {
  console.error(`Failed to load ${day}.ts:`, error);
  process.exit(1);
}
