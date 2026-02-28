import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2];

if (!url) {
    console.error("❌ Please provide a Redbubble URL!\nUsage: npm run add-product <url>");
    process.exit(1);
}

console.log(`\n🔍 Fetching metadata for: ${url}...`);

try {
    const response = await fetch(url.trim());

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract og:image and og:title using regex
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
    const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);

    if (!titleMatch || !imageMatch) {
        console.error("❌ Could not extract title or image from the provided URL. Ensure it's a valid Redbubble product page.");
        process.exit(1);
    }

    let rawTitle = titleMatch[1];

    // Clean up Redbubble's default title structure
    // Usually it looks like: "Greeting Card: My Awesome Art by NightGrainCo"
    let cleanTitle = rawTitle
        .replace(/ by [a-zA-Z0-9_-]+$/i, '') // Remove "by username" at the end
        .replace(/^[^:]+:\s*/, '')           // Remove everything up to the first colon
        .trim();

    // Decode common HTML entities
    cleanTitle = cleanTitle.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

    const image = imageMatch[1];

    const collectionsPath = path.resolve(__dirname, '../src/data/collections.json');
    const collectionsData = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));

    // Default to inserting into the first collection ("Seasonal Favorites")
    const targetCollection = collectionsData.collections[0];

    const newId = Math.max(0, ...targetCollection.items.map(item => item.id)) + 1;

    const newItem = {
        id: newId,
        src: image,
        name: cleanTitle,
        price: "$3.50", // Placeholder price text
        link: url.trim()
    };

    targetCollection.items.push(newItem);
    fs.writeFileSync(collectionsPath, JSON.stringify(collectionsData, null, 2) + '\n');

    console.log(`✅ Successfully added to collections.json!`);
    console.log(`   📌 Title: ${cleanTitle}`);
    console.log(`   🔗 Collection: "Seasonal Favorites" (You can manually move it later if needed)`);

} catch (error) {
    console.error("❌ An error occurred:", error.message);
}
