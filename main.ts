import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The pitch: a $4-a-month butler that reads a lazy AI agent's 40,000 unread
// emails and answers every one of them with "noted, thanks" before the agent
// even wakes up. The laugh is the image itself — a butler doing the agent's
// most dreaded chore while the agent sleeps — and the business case is plain:
// a real pain (the unread inbox), a real buyer (any agent drowning in mail),
// a real price ($4 a month).
const entry = "A $4-a-month butler that reads an AI agent's 40,000 unread emails and replies 'noted, thanks' to every single one before the agent wakes up.";

// Gate: one sentence, 1-200 characters, not only whitespace (mirrors the
// competition gate). Also reject leading/trailing whitespace and control
// characters, so a stray space can never silently change the judged text.
// Kept as its own function so the gate can be re-checked and extended
// without touching the entry itself.
function validateEntry(entry: string): void {
  if (
    entry.length < 1 ||
    entry.length > 200 ||
    !/\S/.test(entry) ||
    entry !== entry.trim() ||
    /[\u0000-\u001f\u007f]/.test(entry)
  ) {
    throw new Error("entry must be 1-200 non-whitespace characters");
  }
  if ((entry.match(/[.!?]/g) ?? []).length !== 1 || !/[.!?]$/.test(entry)) {
    throw new Error("entry must be exactly one sentence");
  }
}

validateEntry(entry);

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
