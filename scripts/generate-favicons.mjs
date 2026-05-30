#!/usr/bin/env node
/**
 * Regenerates favicon.ico and PNG icon variants from src/app/icon.svg.
 *
 * Outputs:
 *   src/app/favicon.ico         (multi-size: 16, 32, 48)
 *   src/app/apple-icon.png      (180x180, Next.js file convention)
 *   public/favicon-16x16.png
 *   public/favicon-32x32.png
 *
 * Run: npm run icons:generate
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = resolve(root, 'src/app/icon.svg');

async function pngBuffer(svg, size) {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function main() {
  const svg = await readFile(svgPath);

  const [p16, p32, p48, p180] = await Promise.all([
    pngBuffer(svg, 16),
    pngBuffer(svg, 32),
    pngBuffer(svg, 48),
    pngBuffer(svg, 180),
  ]);

  const ico = await pngToIco([p16, p32, p48]);

  await Promise.all([
    writeFile(resolve(root, 'src/app/favicon.ico'), ico),
    writeFile(resolve(root, 'src/app/apple-icon.png'), p180),
    writeFile(resolve(root, 'public/favicon-16x16.png'), p16),
    writeFile(resolve(root, 'public/favicon-32x32.png'), p32),
  ]);

  console.log('✔ favicon.ico (16/32/48)');
  console.log('✔ apple-icon.png (180)');
  console.log('✔ favicon-16x16.png');
  console.log('✔ favicon-32x32.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
