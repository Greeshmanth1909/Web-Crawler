import { JSDOM } from 'jsdom';

function normalizeURL(input) {
    // remove http or https :// first
    const httpregex = /(http|https):\/\//;
    var newstring = input.replace(httpregex, '');
    newstring = newstring.replace(/\/$/, '');
    return newstring;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    // anchors can either be absolute or relative ie. /something
    const absoluteRegex = /(http|https):\/\//;
    const relativeRegex = /\/$/;
    let absoluteAnchors = [];
    anchors.forEach((anchor) => {
        const matchArr = anchor.getAttribute('href');
        if (matchArr.startsWith('http://') || matchArr.startsWith('https://')) {
            absoluteAnchors.push(anchor.getAttribute('href'));
        } else {
            absoluteAnchors.push(baseURL + anchor.getAttribute('href'));
        }
        
    });
    return absoluteAnchors;
}

async function crawlPage(baseURL, currentURL = '', pages = {}) {

    if (!(currentURL.startsWith(baseURL))) {
        return;
    };

    if (currentURL === '') {const response = await fetch(baseURL)};

    const response = await fetch(currentURL);
    const statusCode = response.status;

    if (statusCode >= 400) {
        console.log(`Error: got status code ${statusCode}`);
        return;
    }

    const contentType = response.headers.get('content-type');
    if (contentType !== 'text/html; charset=utf-8') {
        console.log('Error: content type not html or text, quitting..');
        return;
    }
    const html = await response.text();
    const hrefArr = getURLsFromHTML(html, baseURL);

    if (hrefArr.length === 0) {
        return;
    };
    // Iterate through array and update pages
    hrefArr.forEach((val) => {
        const normalizedURL = normalizeURL(val);
        if (normalizedURL in pages) {
            pages[normalizedURL] += 1;
            return;
        } else {
            pages[normalizedURL] = 1;
        };
        
        // Visit page and update pages
        crawlPage(baseURL, val, pages);
    });

    return pages;
}
export { normalizeURL,
         getURLsFromHTML,
         crawlPage };
