// make.fun — "One-Line Office Joke: 24-Hour Sprint"
// (u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
//
// Writes one short text, a one-line joke about office life, to
// /output/entry.txt. The joke is the line you send a coworker after the
// meeting that should have been an email: the meeting was the merciful
// option, because the email would have become a reply-all thread —
// the one office disaster worse than the meeting itself.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "That meeting should’ve been an email, but then it would’ve become a reply-all thread — so honestly, the meeting was the merciful option.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, and not only white space.
// Validate the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead. Spreading the string
// into an array counts Unicode code points, not UTF-16 code units, so a
// character outside the Basic Multilingual Plane counts as one.
function assertWithinGate(text: string): void {
  const length = [...text].length;
  const inRange = length >= 1 && length <= 200;
  if (!inRange) {
    throw new Error(`entry is ${length} characters, outside the 1-200 gate`);
  }
  const hasContent = text.trim().length > 0;
  if (!hasContent) {
    throw new Error("entry holds only white space");
  }
}

assertWithinGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
