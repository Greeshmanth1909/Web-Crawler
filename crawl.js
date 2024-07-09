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
        console.log('============================')
        console.log(matchArr);
        if (matchArr.startsWith('http://') || matchArr.startsWith('https://')) {
            absoluteAnchors.push(anchor.getAttribute('href'));
        } else {
            absoluteAnchors.push(baseURL + anchor.getAttribute('href'));
        }
        
    });
    return absoluteAnchors;

}

async function crawlPage(currentURL) {
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
    console.log(await response.text())
}
export { normalizeURL,
         getURLsFromHTML,
         crawlPage };
