import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const urls = [
    "https://www.redbubble.com/i/mug/Scottish-Fold-Cat-Buddha-Sit-Deadpan-Cute-by-NightGrainCo/178845761.9Q0AD",
    "https://www.redbubble.com/i/tote-bag/Scottish-Fold-Cat-Buddha-Sit-Deadpan-Cute-by-NightGrainCo/178845761.P1QBH",
    "https://www.redbubble.com/i/throw-pillow/Scottish-Fold-Cat-Buddha-Sit-Deadpan-Cute-by-NightGrainCo/178845761.5X2YF",
    "https://www.redbubble.com/i/t-shirt/Party-Capybara-Birthday-Hat-Cute-Crayon-by-NightGrainCo/178805558.WFLAH",
    "https://www.redbubble.com/i/mug/Party-Capybara-Birthday-Hat-Cute-Crayon-by-NightGrainCo/178805558.9Q0AD",
    "https://www.redbubble.com/i/tote-bag/Party-Capybara-Birthday-Hat-Cute-Crayon-by-NightGrainCo/178805558.P1QBH",
    "https://www.redbubble.com/i/throw-pillow/Party-Capybara-Birthday-Hat-Cute-Crayon-by-NightGrainCo/178805558.5X2YF"
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
            const imageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
            let image = imageMatch ? imageMatch[1] : 'Unknown';

            console.log(`URL: ${url}`);
            console.log(`Image: ${image}`);
            console.log(`---`);

        } catch (e) {
            console.log(`Error on ${url}: ${e.message}`);
        }
    }
}

checkUrls();
