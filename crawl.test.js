import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalize http://example.com/ to example.com', () => {
    expect(normalizeURL('http://example.com/')).toBe('example.com');
    expect(normalizeURL('https://example.com/')).toBe('example.com');
    expect(normalizeURL('http://example.com')).toBe('example.com');
    expect(normalizeURL('https://example.com')).toBe('example.com');
    expect(normalizeURL('example.com')).toBe('example.com');
    expect(normalizeURL('example.com/')).toBe('example.com');
});

test('Get links from anchor tags in html', () => {
    expect(getURLsFromHTML('<a href="https://boot.dev">Learn Backend Development</a>', 'https://boot.dev')).toStrictEqual(['https://boot.dev']);
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>', 'https://boot.dev')).toStrictEqual(['https://blog.boot.dev']);
    expect(getURLsFromHTML('<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="/post1"></a></body></html>', 'https://blog.boot.dev')).toStrictEqual(['https://blog.boot.dev', 'https://blog.boot.dev/post1']);
});
