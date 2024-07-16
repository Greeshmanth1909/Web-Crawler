# Web Crawler
A node js application that recursively crawls a blog website and generates a report of number of links to other pages of the same website

## Requirements
`Node.js 21.2.0` or higher

## Installation
1. clone the repo with `git clone https://github.com/Greeshmanth1909/Web-Crawler`
2. run `npm init`

## Usage
1. run `npm start <link to a blog website>` to begin crawling the website. Note that the url to the web site must be an absolute url ie. `https://example.com`

### Example
`npm start https://wagslane.dev` returns the following to the console

```
Scraping with https://wagslane.dev as base URL
`Printing Results to the Console
Found 2 internal links to wagslane.dev
Found 2 internal links to wagslane.dev/tags
Found 2 internal links to wagslane.dev/about
Found 2 internal links to wagslane.dev/index.xml
Found 1 internal links to boot.dev
Found 1 internal links to wagslane.dev/posts/zen-of-proverbs
Found 1 internal links to wagslane.dev/posts/college-a-solution-in-search-of-a-problem
Found 1 internal links to wagslane.dev/posts/guard-keyword-error-handling-golang
Found 1 internal links to wagslane.dev/posts/no-one-does-devops
Found 1 internal links to wagslane.dev/posts/developers-learn-to-say-no
Found 1 internal links to wagslane.dev/posts/dark-patterns
Found 1 internal links to wagslane.dev/posts/func-y-json-api
Found 1 internal links to wagslane.dev/posts/seo-is-a-scam-job
Found 1 internal links to wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business
Found 1 internal links to wagslane.dev/posts/what-a-crazy-religion
Found 1 internal links to wagslane.dev/posts/collapsing-quality-of-devto
Found 1 internal links to wagslane.dev/posts/keep-your-data-raw-at-rest
Found 1 internal links to wagslane.dev/posts/continuous-deployments-arent-continuous-disruptions
Found 1 internal links to wagslane.dev/posts/kanban-vs-scrum
Found 1 internal links to wagslane.dev/posts/gos-major-version-handling
Found 1 internal links to wagslane.dev/posts/optimize-for-simplicit-first
Found 1 internal links to wagslane.dev/posts/go-struct-ordering
Found 1 internal links to wagslane.dev/posts/managers-that-cant-code
Found 1 internal links to wagslane.dev/posts/leave-scrum-to-rugby
Found 1 internal links to wagslane.dev/posts/a-case-against-a-case-for-the-book-of-mormon
Found 1 internal links to github.com/wagslane
Found 1 internal links to twitter.com/wagslane
DONE
```

## Unit tests
run unit tests with `npm test`

## Errors
- the program prints an error to the console if the response body of any of the urls is not html
- the program throws an error and quits if the given base url is not valid or absent

# Technical details
The program gets the base url as a command line argument and fetches html from that url with the help of `JSDOM` library. Once the html is fetched, the program filters for anchor tags
`<a></a>`, obtains the `href` links and converts them to absolute urls with the base url as the domain name. Note that any links that donot have the same domain name as the base url
will be ignored. Upon obtaining the urls, the program recursively repeats the above process until it has visited all the links in the website
