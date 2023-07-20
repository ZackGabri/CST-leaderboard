# Chess Simp Tournaments Leaderboard

A chess leaderboard made for the chess simp tournaments server.

## **This is Intended to run on cloudflare pages**

It utilizes cloudflare workers in the form of pages functions, as shown by the functions directory.\
And as a result, **it will not run on github pages**

if you want to host your own version of it, fork or clone this repositry, and then follow [this guide][cf-starter-guide] to learn how to host it.

to test the project locally, install the required dependencies with `npm install`, then run `npm run dev`, this will start a local server using [wrangler][wrangler-docs].

[wrangler-docs]: https://developers.cloudflare.com/workers/wrangler/
[cf-starter-guide]: https://developers.cloudflare.com/pages/get-started/guide/