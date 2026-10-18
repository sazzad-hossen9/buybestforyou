import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env.local
function getApiKey() {
  const envPath = path.join(rootDir, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      if (trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        if (k.trim() === 'PIXABAY_API_KEY') {
          return v.join('=').trim().replace(/^["']|["']$/g, '');
        }
      } else if (trimmed.length > 20 && !trimmed.includes(' ')) {
        return trimmed;
      }
    }
  }
  return process.env.PIXABAY_API_KEY || null;
}

const PIXABAY_API_KEY = getApiKey();

// 24-hour persistent file cache
const CACHE_FILE = path.join(__dirname, '.pixabay-cache.json');
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  } catch (err) {
    console.warn('[CACHE] Failed to save cache:', err.message);
  }
}

// 24 curated editorial slots with visually verified Pixabay photo IDs
export const SLOTS = [
  {
    slug: 'cat-automotive',
    photoId: 2645700,
    searchQuery: 'car workshop tools',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Automotive socket wrenches, ratchet sets, and tools in a mechanic workshop drawer'
  },
  {
    slug: 'cat-electronics',
    photoId: 1109588,
    searchQuery: 'dj headphones audio',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Modern audio production and electronic gadgets setup with headphones, laptop, and turntable'
  },
  {
    slug: 'cat-home',
    photoId: 5835289,
    searchQuery: 'modern kitchen interior appliances',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Clean contemporary home kitchen with countertops, island, and modern appliances'
  },
  {
    slug: 'cat-health',
    photoId: 2465478,
    searchQuery: 'dumbbells gym fitness equipment',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Fitness exercise weights, running shoes, and training equipment in a gym'
  },
  {
    slug: 'cat-lawn',
    photoId: 224443,
    searchQuery: 'lush green lawn garden backyard',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Lush green manicured lawn in a landscaped residential garden with mature trees'
  },
  {
    slug: 'paint-pen-hero',
    photoId: 5956471,
    searchQuery: 'car paint repair',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Automotive technician applying clear coat and color finish during car paint restoration'
  },
  {
    slug: 'vacuum-hero',
    photoId: 268162,
    searchQuery: 'vacuum cleaner cleaning floor',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Vacuum cleaner maintaining clean hardwood floors in a home'
  },
  {
    slug: 'projector-hero',
    photoId: 873241,
    searchQuery: 'home cinema projector',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Dedicated home theater cinema room with plush seating and ceiling projector beam'
  },
  {
    slug: 'facemask-hero',
    photoId: 1612308,
    searchQuery: 'skincare spa beauty wellness flat lay',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Curated organic facial masks, essential oils, and spa wellness bottles flat lay'
  },
  {
    slug: 'lawn-mower-hero',
    photoId: 3403793,
    searchQuery: 'robotic lawn mower grass',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Smart robotic lawn mower automatically trimming green grass in a landscaped lawn'
  },
  {
    slug: 'electric-mower',
    photoId: 1593898,
    searchQuery: 'lawn mower mowing grass lawn',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Cordless electric push lawn mower cutting green grass in a garden'
  },
  {
    slug: 'carplay-hero',
    photoId: 3725428,
    searchQuery: 'car gps navigation',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'In-car touchscreen infotainment display and GPS navigation system on dashboard'
  },
  {
    slug: 'robot-toy',
    photoId: 6946984,
    searchQuery: 'toy robot',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Educational programmable STEM robotics kit toy with smart microcontroller'
  },
  {
    slug: 'pressure-cooker',
    photoId: 7116220,
    searchQuery: 'pressure cooker pot',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Stainless steel pressure cooker venting steam during high-pressure cooking'
  },
  {
    slug: 'blender-hero',
    photoId: 10934,
    searchQuery: 'kitchen blender smoothie fruit',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Countertop kitchen blender filled with fresh fruit smoothie ingredients'
  },
  {
    slug: 'carwash-hero',
    photoId: 1397382,
    searchQuery: 'car wash foam sponge detailing',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Car washing foam suds and cleaning sponge during vehicle paint detailing'
  },
  {
    slug: 'welder-hero',
    photoId: 2819147,
    searchQuery: 'welding machine metal workshop sparks',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Metal fabrication welding process with protective helmet and illuminated sparks'
  },
  {
    slug: 'lathe-hero',
    photoId: 539407,
    searchQuery: 'wood lathe turning workshop machine',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Precision lathe turning metal and wood stock in a craftsman workshop'
  },
  {
    slug: 'headlights-hero',
    photoId: 933273,
    searchQuery: 'car headlight illuminated',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Modern automotive front headlight assembly illuminated with bright LED projector beams'
  },
  {
    slug: 'espresso-hero',
    photoId: 1867659,
    searchQuery: 'espresso coffee machine brewing cup',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Stainless steel commercial espresso machine with portafilter group heads and coffee cups'
  },
  {
    slug: 'charger-hero',
    photoId: 926308,
    searchQuery: 'car battery jumper cables engine',
    type: 'card',
    targetWidth: 900,
    targetHeight: 562,
    alt: 'Automotive battery jumper cables connected to vehicle terminal inside engine bay'
  },
  {
    slug: 'car-scratch-hero',
    photoId: 3789848,
    searchQuery: 'car detailing microfiber',
    type: 'hero',
    targetWidth: 1280,
    targetHeight: 720,
    alt: 'Detailing and cleaning automotive car paint with a microfiber cloth before scratch repair'
  },
  {
    slug: 'affiliate-guide-hero',
    photoId: 1433427,
    searchQuery: 'laptop analytics charts office workspace',
    type: 'hero',
    targetWidth: 1280,
    targetHeight: 720,
    alt: 'Tablet on modern office desk showing business traffic and performance analytics charts'
  },
  {
    slug: 'contact-hero',
    photoId: 1076597,
    searchQuery: 'desk envelopes notebook write letter',
    type: 'card',
    targetWidth: 900,
    targetHeight: 675,
    alt: 'Editorial office desk with letters, envelopes, and notebook ready for messages'
  }
];

// Query Pixabay API with caching and 429 guard
async function queryPixabay(query, cache) {
  const cached = cache[query];
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.hits;
  }

  const url = `https://pixabay.com/api/?key=${encodeURIComponent(
    PIXABAY_API_KEY
  )}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&min_width=1200&per_page=20&page=1`;

  console.log(`[API REQUEST] Querying Pixabay: "${query}"...`);
  const res = await fetch(url);

  if (res.status === 429) {
    console.error('[FATAL 429] Pixabay Rate Limit Reached! Stopping run immediately.');
    throw new Error('PIXABAY_429_RATE_LIMIT');
  }

  if (!res.ok) {
    console.error(`[API ERROR] HTTP ${res.status}: ${res.statusText}`);
    return [];
  }

  const data = await res.json();
  const hits = data.hits || [];

  cache[query] = {
    timestamp: now,
    hits: hits,
  };
  saveCache(cache);

  await new Promise((r) => setTimeout(r, 400));
  return hits;
}

// Find hit in cache by photoId
function findHitById(id, cache) {
  for (const q of Object.keys(cache)) {
    const hits = cache[q]?.hits || [];
    const found = hits.find((h) => h.id === id);
    if (found) return found;
  }
  return null;
}

// Fallback search by ID if not in query cache
async function fetchHitById(id, cache) {
  const existing = findHitById(id, cache);
  if (existing) return existing;

  const url = `https://pixabay.com/api/?key=${encodeURIComponent(
    PIXABAY_API_KEY
  )}&id=${encodeURIComponent(id)}`;

  console.log(`[API REQUEST] Fetching Pixabay ID #${id}...`);
  const res = await fetch(url);
  if (res.status === 429) throw new Error('PIXABAY_429_RATE_LIMIT');
  if (!res.ok) return null;
  const data = await res.json();
  const hit = (data.hits || [])[0] || null;
  if (hit) {
    cache[`id:${id}`] = {
      timestamp: Date.now(),
      hits: [hit],
    };
    saveCache(cache);
  }
  await new Promise((r) => setTimeout(r, 400));
  return hit;
}

export async function run() {
  if (!PIXABAY_API_KEY) {
    console.error('[ERROR] PIXABAY_API_KEY is not available in .env.local.');
    process.exit(1);
  }

  console.log('[START] Sourcing and optimizing license-safe photos via Pixabay API...');
  const cache = loadCache();
  const imagesDir = path.join(rootDir, 'public', 'images');
  const creditsPath = path.join(rootDir, 'public', 'data', 'image-credits.json');
  const creditsMdPath = path.join(rootDir, 'IMAGE_CREDITS.md');

  const credits = [];
  const reportResults = [];

  for (const slot of SLOTS) {
    const destJpg = path.join(imagesDir, `${slot.slug}.jpg`);

    let hit = findHitById(slot.photoId, cache);
    if (!hit) {
      // Try search query from cache
      const hits = await queryPixabay(slot.searchQuery, cache);
      hit = hits.find((h) => h.id === slot.photoId) || null;
    }
    if (!hit) {
      hit = await fetchHitById(slot.photoId, cache);
    }

    if (!hit) {
      console.warn(`[WARN] Could not find Pixabay photo #${slot.photoId} for ${slot.slug}.`);
      reportResults.push({
        slug: slot.slug,
        file: `${slot.slug}.jpg`,
        source: 'Neutral Placeholder',
        matchedOk: false,
      });
      continue;
    }

    // Download image
    console.log(`[PROCESS] Slot "${slot.slug}" -> Pixabay #${hit.id} by @${hit.user}...`);
    try {
      const imgRes = await fetch(hit.largeImageURL);
      if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status} downloading image`);
      const buffer = Buffer.from(await imgRes.arrayBuffer());

      // Sharp resize & crop without upscaling
      const processed = await sharp(buffer)
        .resize(slot.targetWidth, slot.targetHeight, {
          fit: 'cover',
          position: 'centre',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 82, progressive: true })
        .toBuffer();

      fs.writeFileSync(destJpg, processed);
      const sizeKb = Math.round(processed.length / 1024);
      console.log(`[SAVED] public/images/${slot.slug}.jpg (${sizeKb} KB, target: ${slot.targetWidth}x${slot.targetHeight})`);

      const photographerUrl = hit.user_id
        ? `https://pixabay.com/users/${encodeURIComponent(hit.user)}-${hit.user_id}/`
        : `https://pixabay.com/users/${encodeURIComponent(hit.user)}/`;

      credits.push({
        slug: slot.slug,
        fileName: `${slot.slug}.jpg`,
        sourceSite: 'Pixabay',
        photoId: hit.id,
        photographer: hit.user,
        photographerUrl: photographerUrl,
        originalPageUrl: hit.pageURL,
        licenseName: 'Pixabay Content License (Free for commercial use, no attribution required)',
        downloadDate: new Date().toISOString().split('T')[0],
        alt: slot.alt,
      });

      reportResults.push({
        slug: slot.slug,
        file: `${slot.slug}.jpg`,
        source: 'Pixabay',
        photographer: hit.user,
        photoId: hit.id,
        sizeKb: sizeKb,
        matchedOk: true,
      });
    } catch (err) {
      if (err.message === 'PIXABAY_429_RATE_LIMIT') throw err;
      console.error(`[ERROR] Processing ${slot.slug}:`, err.message);
    }
  }

  // Write image-credits.json
  fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 2), 'utf8');

  // Write IMAGE_CREDITS.md
  let md = '# Image Credits & Licensing Compliance\n\n';
  md += 'All editorial photos on **BuyBestForYou** are sourced from the official **Pixabay API** under the [Pixabay Content License](https://pixabay.com/service/license-summary/).\n\n';
  md += 'Under the Pixabay Content License, content may be used for free for commercial and non-commercial purposes without asking permission or giving attribution. However, in the spirit of open attribution and compliance transparency, BuyBestForYou proudly credits every contributor and links back to their Pixabay profiles and original photo pages below.\n\n';
  md += '| File Name | Section / Slug | Contributor | Pixabay Source | License | Date Downloaded |\n';
  md += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
  for (const c of credits) {
    md += `| \`${c.fileName}\` | \`${c.slug}\` | [${c.photographer}](${c.photographerUrl}) | [Pixabay Photo #${c.photoId}](${c.originalPageUrl}) | ${c.licenseName} | ${c.downloadDate} |\n`;
  }

  md += '\n## Neutral Placeholder Slots (Product Media)\n\n';
  md += 'In accordance with our strict licensing policy, all Amazon product photos and manufacturer review media remain neutral SVG/JPEG placeholders and are never scraped or hotlinked without explicit licensing.\n\n';
  md += '- `gardena-mower.jpg`: Neutral placeholder for Gardena Sileno Minimo\n';
  md += '- `rtk-mower.jpg`: Neutral placeholder for Wire-free RTK Mower\n';
  md += '- `paint-pen-thumb-1.jpg`: Neutral placeholder for Dupli-Color Scratch-Fix\n';
  md += '- `paint-pen-thumb-2.jpg`: Neutral placeholder for Rust-Oleum Touch-Up Pen\n';
  md += '- `paint-pen-thumb-3.jpg`: Neutral placeholder for Meguiar\'s Quik Scratch Eraser\n';
  md += '- `paint-pen-thumb-4.jpg`: Neutral placeholder for ACME Paint Pen\n';

  fs.writeFileSync(creditsMdPath, md, 'utf8');
  console.log(`[SUCCESS] Generated credits in ${creditsPath} and ${creditsMdPath}`);

  return { reportResults, credits };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run()
    .then(() => console.log('[DONE] All images processed and credits updated.'))
    .catch((e) => console.error(e));
}
