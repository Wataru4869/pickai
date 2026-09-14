import fs from "node:fs";
import path from "node:path";

const sitemapPath = path.join(process.cwd(), "public", "sitemap-0.xml");
const xml = fs.readFileSync(sitemapPath, "utf8");
const entries = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)]
  .map(match => ({ loc: match[1], xml: match[0] }));

if (!entries.length || new Set(entries.map(entry => entry.loc)).size !== entries.length) {
  throw new Error("sitemap-0.xml must contain unique URL entries");
}

const prefix = xml.slice(0, xml.indexOf(entries[0].xml));
const suffix = xml.slice(xml.lastIndexOf(entries.at(-1).xml) + entries.at(-1).xml.length);
const sorted = entries.sort((a, b) => a.loc < b.loc ? -1 : a.loc > b.loc ? 1 : 0);
const normalized = `${prefix}${sorted.map(entry => entry.xml).join("\n")}${suffix.trimEnd()}\n`;

if (normalized !== xml) fs.writeFileSync(sitemapPath, normalized);
