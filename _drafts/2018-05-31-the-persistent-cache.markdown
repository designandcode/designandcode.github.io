---
layout: post
title: "The Persistent Cache"
data: 2018-05-31 13:07:00 -0400
categories: jekyll update
permalink: /the-persistent-cache/
description: This is about the time when I spent debugging browser cache
---
Making things that 'just work' on the web can sometimes be a tricky thing. When programming any website, there are several tiers to consider and this can lead to spending more time than expected working on something seemingly trivial - like editing a CSS file to change the look of the website and having those changes seen by visitors.

In this debugging adventure, I wanted to demonstrate the steps I took to get to the bottom of a problem I had updating a WordPress blog and in particular, the caching of the CSS file I was editing.

### The quest to bust the cache
As with any debugging session, mine started from humble beginnings. As mentioned in the introduction, the website I am updating is a WordPress blog. I am using Visual Composer's Custom CSS to make changes to the website without touching the core template CSS file. This is more for convenience than anything and in the past when I updated the custom CSS, the changes immediately took effect. But this time, something was different.

Refreshing the browser did not show the changes I made in WordPress. This was weird and unexpected because this had not happened before. Having assumed that I was seeing a browser cached version of the file, the next thing I did was clear the browser cache for the website and loaded the page again. Still, the changes I made were not visible.

### The adventure continues
Now i'm thinking to myself - where is this old CSS file coming from?
1. Is WordPress changing the CSS file on the webserver? (Yes)
2. Okay, so the server has the correct CSS file and the CSS file is not being served from the browser cache.

Being a bit stumped at this point, I decided to take a look at the HTTP headers to see if any clues would be provided there.

### Introducing CDN caching
Upon inspecting the HTTP headers, one response caught my attention immediately - 'cf-cache-status: HIT'. A quick Google search brought up Cloudflare, the reverse proxy service I use to serve my content over https.

What this header indicates is that Cloudflare, an internet company offering hosted security and performance solutions, is serving a cached version of the file from their content delivery network (CDN). This can potentially decrease website load time (a good thiing) since they have data centers that may be closer to the user requesting it and serving a cached version that hasn't expired will decrease the time the file takes to reach the browser.

This is a good and useful feature that I have complete control over, but I admittedly was not aware of it since I primarily signed up to use the service specifically for their SSL offering. To solve the caching issue I cleared the cached file on Cloudflare's CDN, the latest file was requested from the web server, and CloudFlare is now serving that fresh file for requests.

### Bridging the knowledge gap with.. knowledge
So now I know how resources are served on my website

1. Browser requests hostname.com
2. DNS lookup returns a CloudFlare IP address which handles http(s) for hostname.com
3. Browser makes http(s) request to CloudFlare IP address provided
4. CloudFlare accepts this request and the IP address of the browser requesting it
5. CloudFlare then searches for the server on their network (CDN) that is closest to the requestor
6. If no cached resources are found on the closest server, a fresh resource will be requested from the web server and then cached on the CDN nearest the requesting browser
7. Subsequent requests can get a cached resource from the CDN closest to it (if available)

<span style="text-align: center; display: block;">![Alt text]({{ '/img/oip-disabled-scheme.png' }}) image © MaxCDN.com</span>




