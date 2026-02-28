import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const urls = [
    "https://www.redbubble.com/shop/ap/178846018",
    "https://www.redbubble.com/shop/ap/178845761",
    "https://www.redbubble.com/shop/ap/178845465",
    "https://www.redbubble.com/shop/ap/178838327",
    "https://www.redbubble.com/shop/ap/178805558",
    "https://www.redbubble.com/shop/ap/178805056",
    "https://www.redbubble.com/shop/ap/178761269",
    "https://www.redbubble.com/shop/ap/178804641",
    "https://www.redbubble.com/shop/ap/178733956"
];

async function checkUrls() {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log(`Failed to fetch ${url} - Status: ${response.status}`);
                continue;
            }
            const html = await response.text();
            const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
            const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);

            let title = titleMatch ? titleMatch[1] : 'Unknown';
            let image = imageMatch ? imageMatch[1] : 'Unknown';

            // Clean up title
            title = title.replace(/ by [a-zA-Z0-9_-]+$/i, '').replace(/^[^:]+:\s*/, '').trim();
            title = title.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

            console.log(`---`);
            console.log(`URL: ${url}`);
            console.log(`Title: ${title}`);
            console.log(`Image: ${image}`);

        } catch (e) {
            console.log(`Error on ${url}: ${e.message}`);
        }
    }
}

checkUrls();
