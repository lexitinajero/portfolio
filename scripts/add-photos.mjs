import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const inbox = path.join(root, "photos-inbox");
const done = path.join(inbox, "done");
const outDir = path.join(root, "public", "photos");
const listFile = path.join(root, "src", "photos.json");

const photoTypes = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);

mkdirSync(inbox, { recursive: true });
mkdirSync(done, { recursive: true });
mkdirSync(outDir, { recursive: true });

const list = JSON.parse(readFileSync(listFile, "utf8"));
const files = readdirSync(inbox).filter((f) => photoTypes.has(path.extname(f).toLowerCase()));

if (files.length === 0) {
  console.log("photos-inbox/ is empty. drop some photos in there first.");
  process.exit(0);
}

function freeName(file) {
  const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "photo";
  let name = base;
  for (let n = 2; existsSync(path.join(outDir, `${name}.jpg`)); n++) name = `${base}-${n}`;
  return name;
}

let added = 0;
for (const file of files) {
  const source = path.join(inbox, file);
  let input = source;

  const isHeic = [".heic", ".heif"].includes(path.extname(file).toLowerCase());
  if (isHeic) {
    input = path.join(tmpdir(), `${path.parse(file).name}-${Date.now()}.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", source, "--out", input], { stdio: "ignore" });
  }

  const name = freeName(file);
  const output = path.join(outDir, `${name}.jpg`);

  const info = await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  if (isHeic) rmSync(input);

  const meta = await sharp(output).metadata();
  if (meta.exif || meta.xmp || meta.iptc) {
    rmSync(output);
    console.error(`skipped ${file}: metadata survived, so it was NOT added`);
    continue;
  }

  list.push({ src: `/photos/${name}.jpg`, caption: "", place: "", width: info.width, height: info.height });
  renameSync(source, path.join(done, file));
  added++;
  console.log(`added ${file} -> public/photos/${name}.jpg (location data removed)`);
}

writeFileSync(listFile, JSON.stringify(list, null, 2) + "\n");
console.log(`\n${added} photo${added === 1 ? "" : "s"} added. now write captions in src/photos.json.`);
