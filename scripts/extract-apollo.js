import fs from 'fs';

const workUrls = [
    { id: 'meerkats', url: 'https://www.redbubble.com/shop/ap/178846018' },
    { id: 'trex', url: 'https://www.redbubble.com/shop/ap/178845465' },
    { id: 'pub', url: 'https://www.redbubble.com/shop/ap/178838327' },
    { id: 'llama', url: 'https://www.redbubble.com/shop/ap/178805056' }
];

async function extractProducts() {
    const allData = {};

    for (const work of workUrls) {
        console.log(`Fetching ${work.url}...`);
        try {
            const res = await fetch(work.url);
            if (!res.ok) {
                console.log(`Failed: ${res.status}`);
                continue;
            }
            const html = await res.text();

            // Look for the Apollo state JSON which contains the data.
            // Usually something like window.__APOLLO_STATE__ = {...}
            const match = html.match(/window\.__APOLLO_STATE__\s*=\s*(.*?);<\/script>/);
            if (match && match[1]) {
                fs.writeFileSync(`apollo_${work.id}.json`, match[1]);
                console.log(`Saved apollo data for ${work.id}`);
            } else {
                console.log(`No apollo state found for ${work.id}`);
            }

        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
}

extractProducts();
