

let CRAFTITEMS = (id, qty) => {
    $.post(`https://farmrpg.com/worker.php?go=craftitem&id=${id}&qty=${qty}`, (data) => {
        console.log(`craft item ${id}x${qty}=${data}`);
    });
}

STOP = false;

let GOPLACE = (place) => {
    Array.from($('.item-link')).filter(x => x.href.includes(place))[0].click()
}

let CLICKLINK = (query) => {
    Array.from($(query))[0].click();
}

let GOTOWORKSHOP = () => GOPLACE('workshop.php');
let GOHOME = () => GOPLACE('index.php');
let GOINVENTORY = () => GOPLACE('inventory.php');
let GOxFARM = () => GOPLACE('xfarm.php');
let CLICKHARVESTALL = () => CLICKLINK('.harvestallbtn');
let CLICKPLANTALL = () => CLICKLINK('.plantallbtn');
let GOKITCHEN = () => GOPLACE('kitchen.php');

let DELAY = async (ms) => new Promise(res => setTimeout(res, ms));

let GOFARM = async () => {
    GOHOME();
    await DELAY(1500);
    GOxFARM();
    await DELAY(1500);
}

let POST = (uri) => {
    return new Promise(resolve => {
        $.post(uri, (data) => {
            console.log(`POST: ${uri} = ${data}`);
            resolve(data);
        })
    });
}

let BUYSEEDS = async (seed, qty) => {
    return await POST(`https://farmrpg.com/worker.php?go=buyitem&id=${seed}&qty=${qty}`);
}

let SETSEED = async (seed) => {
    // https://farmrpg.com/worker.php?go=setfarmseedcounts&cachebuster=33646&id=64
    return await POST(`https://farmrpg.com/worker.php?go=setfarmseedcounts&cachebuster=33646&id=${seed}`);
}

let GETSEEDS = (id) => {
    return $(`select.seedid option[value=${id}]`).data('amt');
}

let SEEDS = {
    mushroom: { id: 395, item: 43, grows: 1 },
    onion: { id: 34, item: 33, max: 2000, grows: 1 },

    carrot: { id: 20, item: 19, max: 1600, grows: 1 },

    gold_pepper: { id: 158, item: 157, max: 1500, grows: 1, needSeed: true },
    gold_carrot: { id: 160, item: 159, max: 1500, grows: 1, needSeed: true },
    gold_pea: { id: 162, item: 161, max: 1500, grows: 1, needSeed: true },
    gold_cucumber: { id: 190, item: 189, max: 1500, grows: 1, needSeed: true },
    gold_eggplant: { id: 352, item: 262, max: 1500, grows: 1, needSeed: true },


    // FROZEN VEGGIES:
    pea: { id: 28, item: 27, max: 1400, grows: 1 },
    cabbage: { id: 66, item: 67, max: 1400, grows: 1 },
    pine: { id: 410, item: 409, max: 1400, grows: 1 },

    // pine_frz: { id: 410, item: 409, max: 1400, grows: 1, grape: true },
    // cabbage_frz: { id: 66, item: 67, max: 1400, grows: 1, grape: true },

    corn: { id: 64, item: 65, max: 1400, grows: 1 },

    pepper: { id: 12, item: 11, max: 1400, grows: 1 },
    // carrot: { id: 20, item: 19, max: 1000, grows: 1 },
    // pea: { id: 28, item: 27, max: 1000, grows: 1 },
    cucumber: { id: 30, item: 29, max: 1600, grows: 1 },
    eggplant: { id: 14, item: 13, max: 1600, grows: 1 },
    radish: { id: 32, item: 31, max: 1600, grows: 1 },
    hops: { id: 47, item: 46, max: 1600, grows: 1 },
    potato: { id: 49, item: 48, max: 1600, grows: 1 },
    tomato: { id: 16, item: 15, max: 1600, grows: 1 },
    leek: { id: 51, item: 50, max: 1600, grows: 1 },
    watermelon: { id: 60, item: 59, max: 1400, grows: 1 },
    //corn: { id: 64, item: 65, max: 1400, grows: 1 },
    // cabbage: { id: 66, item: 67, max: 1400, grows: 1 },
    pumpkin: { id: 68, item: 69, max: 1400, grows: 1 },
    // pine: { id: 410, item: 409, max: 1400, grows: 1 },
    wheat: { id: 70, item: 71, max: 1400, grows: 1 },


    cotton: { id: 255, item: 254, max: 1400, grows: 1, grape: true },
    broccoli: { id: 257, item: 256, max: 1400, grows: 1, grape: true },
    rice: { id: 631, item: 630, max: 1600, grows: 1, grape: true },
    mega_beet: { id: 588, item: 450, max: 1600, grows: 10, needSeed: true, grape: true },
    mega_sunflower: { id: 589, item: 373, max: 1600, grows: 10, needSeed: true, grape: true },
    // beet: { id: 449, item: 450, max: 1400, grows: 1, grape: true },
    // sunflower: { id: 374, item: 373, max: 1400, grows: 1, grape: true },
}

let MEALS = {
    'onion_soup': { id: 635 },
    'bone_broth': { id: 641 },
    //'over_the_moon': { id: 647 }
}

let GETMAXINVENTORY = () => {
    // needs to happen on inventory page.
    const x = parseInt($($('div.item-after[style="color:red"]')[0]).text());
    if (isNaN(x)) return 1000;
    return x;
}

let GETCURRENTINVENTORY = (id) => {
    const x = Array.from($('a.item-link')).find(x => x.href.endsWith(`?id=${id}`));
    const y = parseInt($(x).find('div.item-after').text()) ?? 0;
    if (isNaN(y)) return 0;
    return y;
}

let GETMOSTTIMELEFT = () => {
    const x = Math.max(...Array.from($('img.itemimg[data-seconds]')).map(x => x.getAttribute('data-seconds')).map(x => parseInt(x)));
    if (isNaN(x)) return 0;
    return x;
}

let GETGRAPESLEFT = () => {
    try {
        const a = parseInt($('a.drinkgjbtn').data('left'));
        if (isFinite(a))
            return a;
        return 0;
    }
    catch {
        return 0;
    }
}

let FINDSEED = async (SLOTS, grapes) => {
    const bonus = 15 + 25;
    const yield = 1 + (bonus / 100);

    GOINVENTORY();
    await DELAY(1500);
    const max = GETMAXINVENTORY();
    console.log(`Inv Max: ${max}`);


    const availableSeeds = Object.fromEntries(Array.from($('select.inlineinputlg').find('option'))
        .map(x => x.innerText)
        .map(x => x.match(/([\w\s]+) \((\d+)\)/i))
        .filter(x => !!x)
        .map(([_, a, b]) => [a.toLowerCase().replace(' ', '_'), parseInt(b)]));

    const amts = Object.entries(SEEDS).map(([name, entry]) => {
        return {
            qty: GETCURRENTINVENTORY(entry.item) ?? 0,
            yield: Math.floor((entry.grows * SLOTS) * yield),
            max: entry.max ?? max,
            seed: { ...entry, name },
            hasEnoughSeeds: entry.needSeed ? (availableSeeds[name] ?? 0) >= SLOTS : true
        }
    });
    //console.debug(JSON.stringify(amts, 0, 2));

    let seed = amts.find(x => x.hasEnoughSeeds && x.qty < (x.max - x.yield));
    if (grapes > 0) {
        seed = amts.find(x => x.hasEnoughSeeds && x.seed.grape == true && x.qty < (x.max - x.yield)) ?? seed;
    }

    return seed;
}

let AUTOGROW = async () => {
    try {
        const SLOTS = 40;

        await GOFARM();
        await CLICKHARVESTALL();
        await DELAY(1500);
        const grapesLeft = GETGRAPESLEFT();
        console.log(`Grapes Left: ${grapesLeft}`);

        const seed = await FINDSEED(SLOTS, grapesLeft);
        if (!seed) {
            console.log('No seed found to grow, waiting 5 minutes.');
            TASKQUEUE.push(['GROW', Date.now() + (5 * 60 * 1000)]);
            RUNTASKS();
            return;
        }

        await GOFARM();

        const toGrow = seed.seed;

        console.log(`${new Date().toISOString()}: Growing Seeds ${toGrow.name}`);

        const s = GETSEEDS(toGrow.id);
        if (!toGrow.needSeed && (!s || s < SLOTS)) {
            await BUYSEEDS(toGrow.id, SLOTS);
        }

        await SETSEED(toGrow.id);
        await CLICKPLANTALL();
        await DELAY(1000);

        if (toGrow.grape && grapesLeft > 0) {
            $('a.drinkgjbtn')[0].click();
            await DELAY(750);
            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);
            $('span.modal-button-bold').click(); // OK
            await DELAY(750);

            TASKQUEUE.push(['GROW', Date.now()]);
            RUNTASKS();
            return;
        }

        let secondsLeft = GETMOSTTIMELEFT();

        if (isNaN(secondsLeft) || !isFinite(secondsLeft)) {
            console.log('An error ocurred calculating seconds left. Waiting 1 minute and trying again.');
            secondsLeft = 60;
        }

        const t = new Date(secondsLeft * 1000 + Date.now());
        console.log(`${secondsLeft} seconds til next batch. Approx ${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`);

        TASKQUEUE.push(['GROW', t.valueOf()]);
        RUNTASKS();
    }
    catch (err) {
        console.log(err);
        console.log(`Error caught... ${err}. Retrying in 30s.`);
        TASKQUEUE.push(['GROW', Date.now() + (30 * 1000)]);
        RUNTASKS();
    }
}

let CALCULATEITEMINDEX = () => {
    GOTOWORKSHOP();
    //await DELAY(2000);
    const ids = Array.from($('li.close-panel[data-id]'))
        .map(x => x.getAttribute('data-id'))
        .filter(x => typeof x == 'string')
        .map(x => parseInt(x));

    const vals = ids.map(id => {

        let name = $(`li.close-panel[data-id="${id}"`).find('strong').text().split(' ');
        name.pop();
        name = name.join('_').toLowerCase();

        return [name, id]
    });

    const o = Object.fromEntries(vals);
    console.log(JSON.stringify(o, undefined, 4));
}

let ITEMINDEX = {
    "christmas_tree": 408,
    "holiday_wreath": 687,
    "mushroom_paste": 75,
    "sturdy_bow": 456,
    "crossbow": 585,
    "garnet": 317,
    "garnet_ring": 316,
    "fishing_net": 194,
    "large_net": 500,
    "lantern": 368,
    "board": 21,
    "wood_plank": 36,
    "sturdy_shield": 167,
    "fancy_pipe": 301,
    "unpolished_shimmer_stone": 76,
    "shimmer_stone": 77,
    "glass_orb": 78,
    "glass_bottle": 117,
    "steel_wire": 392,
    "steel": 145,
    "lemonade": 86,
    "orange_juice": 84,
    "grape_juice": 112,
    "wine": 121,
    "leather": 110,
    "salt": 305,
    "cooking_pot": 637,
    "amethyst_necklace": 126,
    "apple_cider": 379,
    "aquamarine_ring": 125,
    "arnold_palmer": 508,
    "axe": 237,
    "belt_drive": 677,
    "black_powder": 104,
    "blue_dye": 535,
    "blue_purse": 540,
    "bottle_rocket": 105,
    "broom": 129,
    "bucket": 23,
    "butter": 660,
    "butter_churn": 659,
    "canoe": 615,
    "chum": 481,
    "coin_purse": 122,
    "compass": 315,
    "corn_oil": 629,
    "emerald": 143,
    "emerald_ring": 146,
    "energy_coil": 680,
    "essence_of_slime": 492,
    "explosive": 106,
    "fancy_drum": 474,
    "fancy_guitar": 393,
    "flywheel": 341,
    "fruit_punch": 653,
    "green_cloak": 350,
    "green_diary": 82,
    "green_dye": 203,
    "green_parchment": 74,
    "green_scarf": 414,
    "green_shield": 204,
    "hammer": 236,
    "heart_container": 671,
    "horn_canteen": 165,
    "horseshoe": 217,
    "hourglass": 388,
    "iced_tea": 185,
    "inferno_sphere": 169,
    "iron_cup": 130,
    "iron_ring": 95,
    "jade": 264,
    "jade_charm": 265,
    "ladder": 260,
    "lava_sphere": 220,
    "leather_bag": 166,
    "leather_diary": 118,
    "leather_waterskin": 239,
    "lemon_quartz_ring": 124,
    "looking_glass": 79,
    "machine_press": 628,
    "magicite": 176,
    "magna_core": 340,
    "magnifying_glass": 216,
    "metal_spool": 678,
    "mystic_ring": 195,
    "peach_juice": 587,
    "pear_grease": 683,
    "pearl_necklace": 196,
    "purple_bag": 539,
    "purple_diary": 83,
    "purple_dye": 537,
    "purple_parchment": 73,
    "red_dye": 536,
    "red_shield": 538,
    "rope": 193,
    "ruby": 94,
    "ruby_ring": 96,
    "sand": 387,
    "scissors": 326,
    "shimmer_ring": 249,
    "shimmer_topaz": 248,
    "shovel": 238,
    "snow_globe": 428,
    "snowman": 411,
    "spool_of_copper": 679,
    "spoon": 675,
    "steel_plate": 592,
    "sturdy_box": 55,
    "sturdy_sword": 300,
    "treasure_chest": 252,
    "twine": 163,
    "wagon_wheel": 328,
    "white_parchment": 81,
    "wizard_hat": 240,
    "wooden_barrel": 72,
    "wooden_bow": 455,
    "wooden_box": 37,
    "wooden_shield": 127,
    "wooden_sword": 299,
    "wrench": 594,
    "y73841_detector": 613,
    "yarn": 427,
    "valentines_card": 488,
    "heart_necklace": 486
}

let AUTOCRAFTITEMS = {
    'mushroom_paste': {},
    'heart_necklace': {},
    'valentines_card': {},
    'fishing_net': { max: 1200 },
    'shimmer_stone': { max: 1200 },
    'glass_orb': { max: 1200 },
    'black_powder': {},
    'wooden_shield': {},
    'wooden_box': {},
    'wooden_barrel': {},
    'wagon_wheel': {},
    'treasure_chest': {},
    'sturdy_box': {},
    'ladder': { max: 1200 },
    'iced_tea': {},
    'horseshoe': { max: 1200 },
    'bucket': { max: 1200 },
    'broom': {},
    // 'arnold_palmer': {},
    'sturdy_shield': { max: 1200 },
    'wood_plank': {},
    'board': { max: 1200 },
    'large_net': {},
    'explosive': { max: 1200 },
    'bottle_rocket': {},
    'chum': {},
    'coin_purse': { max: 1200 },
    'blue_dye': { max: 1200 },
    'green_dye': { max: 1200 },
    'glass_bottle': { max: 1200 },
    "axe": { max: 1200 },
    "hammer": { max: 1200 },
    "shovel": { max: 1200 },
    "fancy_pipe": { max: 1200 },
    'iron_cup': {},
    'lantern': {},
    'leather_bag': {},
    'leather_waterskin': {},
    'looking_glass': {},
    'magnifying_glass': {},
    'metal_spool': {},
    'white_parchment': {},
    'wooden_sword': {},
    'yarn': {}
};

let AUTOCRAFT = async () => {

    GOTOWORKSHOP();
    await DELAY(1500);

    const items = Object.entries(AUTOCRAFTITEMS).map(([name, data]) => ({ name, ...data }));

    for (const i of items) {
        const item = ITEMINDEX[i.name];
        const button = $(`button.craftbtnnc[data-id=${item}]`);
        const input = $(`input.qty[data-id=${item}]`);
        if (button.length > 0) {
            const number = parseInt(button.parent().prev().find('strong span').text().match(/\d+/gi));
            if (i.max) {
                if (number >= i.max) {
                    console.log(`Skipping craft of ${i.name} due to max value`);
                    continue;
                }

                const val = parseInt(input.val());
                const left = i.max - number;

                if (left < val) {
                    console.log(`Setting max of ${left} for ${i.name} due to max value`);
                    $(`input.qty[data-id=${item}]`).val(left);
                }
            }

            console.log(`Crafting ${i.name} x ${input.val()}...`);
            button.click();
            await DELAY(1500);
        }
        else {
            console.log(`Skipping craft of ${i.name} due to no button found.`);
        }
    }

    TASKQUEUE.push(['CRAFT', Date.now() + (5 * 60 * 1000)]);
    RUNTASKS();
}


// AUTOGROW();
// AUTOCRAFT();

let TASKQUEUE = [
    ['GROW', 0],
    ['CRAFT', 0],
    ['CHICKEN', 0],
    ['COW', 0],
    ['PIG', 0],
    ['KITCH', 0],
    ['MORNING', 0]
];


let RUNTASKS = async () => {
    const now = Date.now();
    TASKQUEUE.sort((a, b) => a[1] - b[1]);

    console.log(JSON.stringify(TASKQUEUE));

    if (TASKQUEUE.length == 0) {
        console.log(`No tasks, waiting for 10 minutes...`)
        await DELAY(10 * 60 * 1000); // wait 10 minutes for another task to appear.
        RUNTASKS();
        return;
    }

    if (TASKQUEUE[0][1] > now) {
        const left = TASKQUEUE[0][1] - now;
        console.log(`Tasks not ready, waiting for ${left}ms`)
        await DELAY(left);
        RUNTASKS();
        return;
    }

    const task = TASKQUEUE.shift();
    const func = TASKS[task[0]];
    console.log(`Running task: ${task[0]}`);
    try {
        func();

    } catch (err) {
        console.log(err);
        TASKQUEUE.push(task);
        await DELAY(60 * 1000);
        RUNTASKS();
    }

    // don't RUNTASKS again, the functions will do it when they are done.
}

let TOMORROW3AM = () => {
    const now = new Date();
    return (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 3, 0, 0)).valueOf();
}

let AUTOCHICKEN = async () => {
    await GOFARM();
    await GOPLACE('coop.php');
    await DELAY(1000);
    $('a.petallbtn').find('div.item-content').click();
    await DELAY(1000);
    Array.from($('span.modal-button')).filter(x => x.innerText == 'OK')[0].click(); // "OK"
    await DELAY(500);

    TASKQUEUE.push(['CHICKEN', TOMORROW3AM()]);

    RUNTASKS();
}

let AUTOCOW = async () => {

    const TOTALCOWS = 5;

    try {
        await GOFARM();
        await GOPLACE('pasture.php');
        await DELAY(1500);

        const cowText = $('div.content-block-title').text();
        const cowsOwned = parseInt(/Cows\s+\((\d+)\)/i.exec(cowText)[1]);
        const toBuy = 250 - cowsOwned;
        const cowsAwaitingSlaughter = Array.from($('img')).filter(x => x.getAttribute('src').includes('5773.PNG')).length;
        const left = TOTALCOWS - cowsAwaitingSlaughter;

        console.log(`COWS TO BUY: ${toBuy}`);
        if (toBuy > 0) {
            $('input.addamt').val(toBuy);
            await DELAY(750);
            $('button.massaddbtn').click();
            await DELAY(750);
            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);
            $('span.modal-button-bold').click(); // OK
            await DELAY(750);
        }

        $('a.petallbtn').find('div.item-content').click();
        await DELAY(1500);
        Array.from($('span.modal-button')).filter(x => x.innerText == 'OK')[0].click(); // "OK"
        await DELAY(500);

        console.log(`COWS LEFT TO SLAUGHTER: ${left}`);
        for (let c = 0; c < left; c++) {
            console.log(`Slaughtering cow ${c + 1} of ${left}`);
            Array.from($('img')).filter(x => x.getAttribute('src').includes('items/cow.png') && x.getAttribute('data-id') !== null)[0].click();
            await DELAY(750);

            $('a.steakbtn').find('div.item-content').click();    // "SLAUGHTER"
            await DELAY(750);

            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);

            $('span.modal-button-bold').click(); // OK
            await DELAY(750);

            // GO BACK: 
            Array.from($('a')).filter(x => x.getAttribute('href').includes('pasture.php'))[0].click();
            await DELAY(750);
        }

    }
    catch (error) {
        console.log(error);
    }

    TASKQUEUE.push(['COW', TOMORROW3AM()]);

    RUNTASKS();
}

let AUTOPIG = async () => {

    const TOTALPIGS = 13;

    try {
        await GOFARM();
        await GOPLACE('pigpen.php');
        await DELAY(1500);

        const pigText = $('div.content-block-title').text();
        const pigsOwned = parseInt(/Pigs\s+\((\d+)\)/i.exec(pigText)[1]);
        const toBuy = 250 - pigsOwned;
        const awaitingSlaughter = Array.from($('img')).filter(x => x.getAttribute('src').includes('bacon.png')).length;
        const left = TOTALPIGS - awaitingSlaughter;

        console.log(`PIGS TO BUY: ${toBuy}`);
        if (toBuy > 0) {
            $('input.addamt').val(toBuy);
            await DELAY(750);
            $('button.massaddbtn').click();
            await DELAY(750);
            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);
            $('span.modal-button-bold').click(); // OK
            await DELAY(750);
        }

        $('a.feedallbtn').find('div.item-content').click();
        await DELAY(1500);
        Array.from($('span.modal-button')).filter(x => x.innerText == 'OK')[0].click(); // "OK"
        await DELAY(500);

        console.log(`PIGS LEFT TO SLAUGHTER: ${left}`);
        for (let c = 0; c < left; c++) {
            console.log(`Slaughtering pig ${c + 1} of ${left}`);
            Array.from($('img')).filter(x => x.getAttribute('src').includes('items/pig.png') && x.getAttribute('data-id') !== null)[0].click();
            await DELAY(750);

            $('a.baconbtn').find('div.item-content').click();    // "SLAUGHTER"
            await DELAY(750);

            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);

            $('span.modal-button-bold').click(); // OK
            await DELAY(750);

            Array.from($('a')).filter(x => x.getAttribute('href').includes('pigpen.php'))[0].click();
            await DELAY(750);
        }
    }
    catch (error) {
        console.log(error);
    }

    TASKQUEUE.push(['PIG', TOMORROW3AM()]);

    RUNTASKS();
}

let AUTOKITCH = async () => {
    let next = Number.MAX_SAFE_INTEGER;

    try {
        GOKITCHEN();
        await DELAY(750);

        const reg = /oven\.php\?num=(\d+)/i
        const pots = Array.from($('a.item-link')).filter(x => x.href.includes('oven.php?num=')).map(x => reg.exec(x.href)[1]);

        for (const potnum of pots) {

            const pot = Array.from($('a.item-link')).find(x => x.href.includes(`oven.php?num=${potnum}`));
            pot.click();
            await DELAY(750);

            // meal is ready to collect
            if ($('a.cookreadybtn').length == 1) {
                $('a.cookreadybtn')[0].click();
                await DELAY(750);
                $('span.modal-button-bold').click(); // OK
                await DELAY(750);
            }

            const cookbuttons = $('button.cookbtn');
            if (cookbuttons.length > 0) {
                const available = Array.from($('button.cookbtn')).map(x => x.getAttribute('data-id'));
                const found = Object.entries(MEALS).find(([_, x]) => available.some(y => y == x.id));
                if (found) {
                    Array.from($('button.cookbtn')).find(x => x.getAttribute('data-id') == String(found[1].id)).click();
                    await DELAY(750);
                    Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
                    await DELAY(750);
                }
            }

            const cls = ['seasonbtn', 'tastebtn', 'stirbtn'];
            for (const c of cls) {
                if ($(`button.${c}`).length > 0) {
                    $(`button.${c}`).click();
                    await DELAY(250);
                    $('span.modal-button-bold').click(); // OK
                    await DELAY(250);
                }
            }

            const date = Array.from($('span[data-countdown-to]'))
                .map(e => e.getAttribute('data-countdown-to'))
                .map(e => luxon.DateTime.fromISO(e, { zone: "America/Chicago" }))
                .map(e => e.valueOf())
                .sort((a, b) => a - b)
                .filter(a => a >= Date.now())
                .filter(a => a < next)
                .find(a => !!a);

            if (date !== undefined)
                next = date;

            GOKITCHEN();
            await DELAY(750);
        }

        if (next == Number.MAX_SAFE_INTEGER) {
            next = Date.now() + (30 * 60 * 1000);   // 30 minute poll.
        }

    }
    catch (err) {
        console.log(err);
    }

    console.log(`Next kitchen check: ${(next - Date.now()) / 60000}m`);
    TASKQUEUE.push(['KITCH', next]);
    RUNTASKS();
}

let AUTOMORNING = async () => {
    try {
        // storehouse
        await GOFARM();
        GOPLACE('storehouse.php');
        await DELAY(1000);
        $('a.workbtnnc')[0].click();
        await DELAY(750);
        $('span.modal-button-bold').click(); // OK
        await DELAY(750);

        await GOFARM();
        GOPLACE('storehouse.php');
        await DELAY(1000);
        const maxInventory = parseInt(/your MAX Inventory is (\d+)/.exec($('html').text())[1]);

        // farmhouse
        await GOFARM();
        GOPLACE('farmhouse.php');
        await DELAY(1000);
        $('a.restbtnnc')[0].click();
        await DELAY(750);
        $('span.modal-button-bold').click(); // OK
        await DELAY(750);

        // raptors
        await GOFARM();
        GOPLACE('pen.php');
        await DELAY(1000);
        $('a.incubateallbtn')[0].click();
        await DELAY(750);
        $('span.modal-button-bold').click(); // OK
        await DELAY(750);

        // Orchard
        await GOFARM();
        GOPLACE('orchard.php');
        await DELAY(1000);
        const treeNames = ['Apple', 'Orange', 'Lemon'];
        const TREE_MULTIPLIER = 1.20;
        const effectiveInventory = Math.floor(maxInventory / TREE_MULTIPLIER);
        const numbers = treeNames.map(x => parseInt(new RegExp(`(\\d+)${x} Trees`).exec($('html').text())[1]));
        for (let i = 0; i < treeNames.length; i++) {
            const toBuy = effectiveInventory - numbers[i];
            if (toBuy > 0) {
                console.log(`Buying ${toBuy} ${treeNames[i]} trees...`);
                $(`input.addamt${i + 1}`).val(toBuy);
                $(`button.massaddbtn${i + 1}`).click();
                await DELAY(750);
                Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
                await DELAY(750);
                $('span.modal-button-bold').click(); // OK
                await DELAY(750);
            }
        }

        await GOFARM();
        GOPLACE('vineyard.php');
        await DELAY(1000);
        const vines = parseInt(/Currently generating (\d*,\d+) per day/.exec($('html').text())[1].replace(',', ''));
        const toBuy = (maxInventory - 100) - vines;
        if (toBuy > 0) {
            console.log(`Buying ${toBuy} grape vines...`);
            $(`input.addamt`).val(toBuy);
            $(`button.massaddbtn`).click();
            await DELAY(750);
            Array.from($('div.actions-modal-button')).filter(x => x.innerText == 'Yes')[0].click(); // "YES"
            await DELAY(750);
            $('span.modal-button-bold').click(); // OK
            await DELAY(750);
        }

        await GOFARM();
        GOPLACE('cellar.php');
        await DELAY(1000);
        Array.from($('div.item-title')).filter(x => x.textContent.trim() == '0 Days Old');
        const bottlesToday = Array.from($('div.item-title')).filter(x => x.textContent.trim() == '0 Days Old').length;
        if (bottlesToday < 6) {
            const ready = Array.from($('button.sellbtnnc')).filter(x => x.textContent.trim() == '15,000,000 Silver').length;

            const max = Math.min(6 - bottlesToday, ready);
            for (let i = 0; i < max; i++) {
                const sell = Array.from($('button.sellbtnnc')).find(x => x.textContent.trim() == '15,000,000 Silver');
                sell.click();
                await DELAY(750);
            }

            while ($('a.storewinenc').length > 0) {
                $('a.storewinenc')[0].click();
                await DELAY(750);
            }
        }
    }
    catch (err) {
        console.log(`Error in MORNING`);
        console.log(err);
    }

    TASKQUEUE.push(['MORNING', TOMORROW3AM()]);
    RUNTASKS();
}

let TASKS = {
    'GROW': AUTOGROW,
    'CRAFT': AUTOCRAFT,
    'CHICKEN': AUTOCHICKEN,
    'COW': AUTOCOW,
    'PIG': AUTOPIG,
    'KITCH': AUTOKITCH,
    'MORNING': AUTOMORNING
}

RUNTASKS();