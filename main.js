import { crawlPage } from './crawl.js'
import { reportResults } from './report.js'

async function main() {
    if (process.argv.length <= 2) {
        console.error('Not enough arguments, quitting');
        return;
    } else if (process.argv.length > 3) {
        console.error('Too many arguments, please provide url, quitting')
        return;
    }
    // Valid arguments received, starting scraping
    const url = process.argv[2];
    console.log(`Scraping with ${url} as base URL`);
    const k = await crawlPage(url, url, {});
    reportResults(k);
}

main();
