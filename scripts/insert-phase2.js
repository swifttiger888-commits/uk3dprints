import fs from 'fs';
const file = './src/data/collections.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const meerkats = {
    id: "meerkats-crayon",
    name: "Meerkats Crayon Art",
    redbubbleLink: "https://www.redbubble.com/shop/ap/178846018",
    description: "A funny Scottish Fold cat awkwardly standing with a group of meerkats.",
    items: [
        { id: 11, name: "Premium Oversized Hoodie", price: "$55.00", src: "https://ih1.redbubble.net/image.6086552000.6018/ssrco,oversized_hoodie,mens_01,e8e6e1:aa8ffd9f0f,front,close_portrait,x1000.u1.webp", link: "https://www.redbubble.com/i/hoodie/Scottish-Fold-Cat-Standing-With-Meerkats-Crayon-Art-by-NightGrainCo/178846018.6N9P2" },
        { id: 12, name: "Oversized T-Shirt", price: "$23.00", src: "https://ih1.redbubble.net/image.6086552000.6018/ssrco,oversize_tee,mens,ffffff:affd82b53f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Scottish-Fold-Cat-Standing-With-Meerkats-Crayon-Art-by-NightGrainCo/178846018.5U9OZ" },
        { id: 13, name: "Premium Oversized Sweatshirt", price: "$47.00", src: "https://ih1.redbubble.net/image.6086552000.6018/ssrco,oversized_sweatshirt,mens_01,e8e6e1:aa8ffd9f0f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/sweatshirt/Scottish-Fold-Cat-Standing-With-Meerkats-Crayon-Art-by-NightGrainCo/178846018.E3041" },
        { id: 14, name: "Mouse Pad", price: "$14.00", src: "https://ih1.redbubble.net/image.6086551991.6018/ur,mouse_pad_small_flatlay_prop,square,1000x1000.u1.jpg", link: "https://www.redbubble.com/i/mouse-pad/Scottish-Fold-Cat-Standing-With-Meerkats-Crayon-Art-by-NightGrainCo/178846018.G1FH6" },
        { id: 15, name: "Boxy T-Shirt", price: "$23.00", src: "https://ih1.redbubble.net/image.6086552000.6018/ssrco,boxy_tee,womens_01,ffffff:affd82b53f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Scottish-Fold-Cat-Standing-With-Meerkats-Crayon-Art-by-NightGrainCo/178846018.3KEDS" }
    ]
};

const trex = {
    id: "t-rex-stacked",
    name: "T-Rex Stacked Animals",
    redbubbleLink: "https://www.redbubble.com/shop/ap/178845465",
    description: "A goofy T-Rex carrying a mountain of animal friends.",
    items: [
        { id: 16, name: "Premium Oversized Hoodie", price: "$55.00", src: "https://ih1.redbubble.net/image.6086534030.5465/ssrco,oversized_hoodie,mens_01,e8e6e1:aa8ffd9f0f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/hoodie/Funny-T-Rex-Stacked-Animals-St-Patricks-Day-by-NightGrainCo/178845465.6N9P2" },
        { id: 17, name: "Oversized T-Shirt", price: "$23.00", src: "https://ih1.redbubble.net/image.6086534030.5465/ssrco,oversize_tee,mens,ffffff:affd82b53f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Funny-T-Rex-Stacked-Animals-St-Patricks-Day-by-NightGrainCo/178845465.5U9OZ" },
        { id: 18, name: "Premium Oversized Sweatshirt", price: "$47.00", src: "https://ih1.redbubble.net/image.6086534030.5465/ssrco,oversized_sweatshirt,mens_01,e8e6e1:aa8ffd9f0f,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/sweatshirt/Funny-T-Rex-Stacked-Animals-St-Patricks-Day-by-NightGrainCo/178845465.E3041" },
        { id: 19, name: "Mouse Pad", price: "$14.00", src: "https://ih1.redbubble.net/image.6086534016.5465/ur,mouse_pad_small_flatlay_prop,square,1000x1000.u1.jpg", link: "https://www.redbubble.com/i/mouse-pad/Funny-T-Rex-Stacked-Animals-St-Patricks-Day-by-NightGrainCo/178845465.G1FH6" },
        { id: 20, name: "Classic T-Shirt", price: "$22.00", src: "https://ih1.redbubble.net/image.6086534030.5465/ssrco,classic_tee,mens_02,fafafa:ca443f4786,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Funny-T-Rex-Stacked-Animals-St-Patricks-Day-by-NightGrainCo/178845465.1YY78" }
    ]
};

const pub = {
    id: "going-pub",
    name: "Going To The Pub",
    redbubbleLink: "https://www.redbubble.com/shop/ap/178838327",
    description: "Guess who's going to the pub? A very thirsty St. Patrick's Day pal.",
    items: [
        { id: 21, name: "Active T-Shirt", price: "$24.00", src: "https://ih1.redbubble.net/image.6086323672.8327/ssrco,active_tshirt,mens,101010:01c5ca27c6,front,square_three_quarter,1000x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Guess-Whos-Going-To-The-Pub-St-Patricks-Day-by-NightGrainCo/178838327.UGYPM" },
        { id: 22, name: "Baseball 3/4 Sleeve", price: "$26.00", src: "https://ih1.redbubble.net/image.6086323672.8327/ra,raglan,x1950,white_black,front-c,160,90,1000,1000-bg,f8f8f8.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Guess-Whos-Going-To-The-Pub-St-Patricks-Day-by-NightGrainCo/178838327.TR8D9" },
        { id: 23, name: "Classic T-Shirt", price: "$22.00", src: "https://ih1.redbubble.net/image.6086323672.8327/ssrco,classic_tee,mens_02,fafafa:ca443f4786,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/t-shirt/Guess-Whos-Going-To-The-Pub-St-Patricks-Day-by-NightGrainCo/178838327.WFLAH" },
        { id: 24, name: "Lightweight Hoodie", price: "$40.00", src: "https://ih1.redbubble.net/image.6086323672.8327/ssrco,lightweight_hoodie,mens_01,heather_mid_grey,front,square_close_portrait,x1000.u1.jpg", link: "https://www.redbubble.com/i/hoodie/Guess-Whos-Going-To-The-Pub-St-Patricks-Day-by-NightGrainCo/178838327.GQV8B" },
        { id: 25, name: "Lightweight Sweatshirt", price: "$35.00", src: "https://ih1.redbubble.net/image.6086323672.8327/ssrco,lightweight_sweatshirt,mens_01,heather_dark_grey,front,square_close_portrait,x1000.1u1.jpg", link: "https://www.redbubble.com/i/sweatshirt/Guess-Whos-Going-To-The-Pub-St-Patricks-Day-by-NightGrainCo/178838327.NUC7A" }
    ]
};

const llama = {
    id: "retro-llama",
    name: "Retro TV Glitch Llama",
    redbubbleLink: "https://www.redbubble.com/shop/ap/178805056",
    description: "No drama, just a glitchy llama on a retro TV.",
    items: [
        { id: 26, name: "Premium Oversized Hoodie", price: "$55.00", src: "https://ih1.redbubble.net/image.6085379628.5056/ssrco,oversized_hoodie,mens_01,e8e6e1:aa8ffd9f0f,front,square_close_portrait,x1000.u3.jpg", link: "https://www.redbubble.com/i/hoodie/No-Lamma-Retro-TV-Glitch-Funny-Llama-by-NightGrainCo/178805056.6N9P2" },
        { id: 27, name: "Oversized T-Shirt", price: "$23.00", src: "https://ih1.redbubble.net/image.6085379628.5056/ssrco,oversize_tee,mens,ffffff:affd82b53f,front,square_close_portrait,x1000.u3.jpg", link: "https://www.redbubble.com/i/t-shirt/No-Lamma-Retro-TV-Glitch-Funny-Llama-by-NightGrainCo/178805056.5U9OZ" },
        { id: 28, name: "Premium Oversized Sweatshirt", price: "$47.00", src: "https://ih1.redbubble.net/image.6085379628.5056/ssrco,oversized_sweatshirt,mens_01,e8e6e1:aa8ffd9f0f,front,square_close_portrait,x1000.u3.jpg", link: "https://www.redbubble.com/i/sweatshirt/No-Lamma-Retro-TV-Glitch-Funny-Llama-by-NightGrainCo/178805056.E3041" },
        { id: 29, name: "Boxy T-Shirt", price: "$23.00", src: "https://ih1.redbubble.net/image.6085379628.5056/ssrco,boxy_tee,womens_01,ffffff:affd82b53f,front,square_close_portrait,x1000.u3.jpg", link: "https://www.redbubble.com/i/t-shirt/No-Lamma-Retro-TV-Glitch-Funny-Llama-by-NightGrainCo/178805056.3KEDS" },
        { id: 30, name: "Mouse Pad", price: "$14.00", src: "https://ih1.redbubble.net/image.6085379556.5056/ur,mouse_pad_small_flatlay_prop,square,1000x1000.u3.jpg", link: "https://www.redbubble.com/i/mouse-pad/No-Lamma-Retro-TV-Glitch-Funny-Llama-by-NightGrainCo/178805056.G1FH6" }
    ]
};

data.collections.push(meerkats, trex, pub, llama);
fs.writeFileSync(file, JSON.stringify(data, null, 2));
