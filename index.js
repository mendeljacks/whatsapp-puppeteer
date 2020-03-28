const puppeteer = require('puppeteer');

const message_objs = [
    {
        contact: 'John Smith',
        messages: [
            "We're no strangers to love",
            "You know the rules and so do I",
            "A full commitment's what I'm thinking of",
            "You wouldn't get this from any other guy",
            "I just wanna tell you how I'm feeling",
            "Gotta make you understand",
            "Never gonna give you up",
            "Never gonna let you down",
            "Never gonna run around and desert you",
            "Never gonna make you cry",
            "Never gonna say goodbye",
            "Never gonna tell a lie and hurt you",
            "We've known each other for so long",
            "Your heart's been aching but you're too shy to say it",
            "Inside we both know what's been going on",
            "We know the game and we're gonna play it",
            "And if you ask me how I'm feeling",
            "Don't tell me you're too blind to see",
            "Never gonna give you up",
            "Never gonna let you down",
            "Never gonna run around and desert you",
            "Never gonna make you cry",
            "Never gonna say goodbye",
            "Never gonna tell a lie and hurt you",
            "Never gonna give you up",
            "Never gonna let you down",
            "Never gonna run around and desert you",
            "Never gonna make you cry",
            "Never gonna say goodbye",
            "Never gonna tell a lie and hurt you",
]
    },
    // {
    //     contact: 'person2',
    //     messages: ['list', 'of', 'mesages to send']
    // }
];

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    // const page = await browser.newPage()
    const [page] = await browser.pages();
    // await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://web.whatsapp.com/')
    await page.waitForFunction(() => {
        const no_more_landing_page = document.getElementsByClassName('landing-title').length === 0
        return no_more_landing_page
    })
    for (message_obj of message_objs) {
        const contact = message_obj.contact
        const messages = message_obj.messages
        await page.waitForSelector('._3u328')
        await page.waitFor(1000)
        await page.type('._3u328', contact);
        await page.waitForSelector(`[title="${contact}"]`)
        await page.waitFor(1000)
        await page.click(`[title="${contact}"]`);
        await page.waitFor(1000)
        for (const message of messages) {
            await page.keyboard.type(message);
            await page.waitFor(500)
            await page.click('._3M-N-');
            await page.waitFor(500)
        }

    }

    await page.waitFor(5000)
    await browser.close();
})();