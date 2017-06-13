---
layout: post
title:  "Chrome Extension"
date:   2017-06-06 18:29:51 -0400
categories: jekyll update
permalink: /chrome-extension/
type: experiment
---
## DOMCapture - Chrome Extension

To solve a common problem I have online I am creating a Google Chrome Extension called *DOMCapture*. 
When activated, the extension will update the page to show all the DOM nodes that can be captured
as a screenshot. Here are screenshots of early development version.

### 6/12 Release Candidate
Today I will begin the process of publishing this extension to the Chrome Web Store. Since beginning
development, I have learned quite a few things about developing this plugin and Chrome extensions in
general.

 1. Finding the right balance of simpicity and usability is challenging and it took many iterations
and refactoring to come up with an acceptable solution (UX).
 2. Adding functionality to an existing website without affecting it in any way is a very interesting
problem. In particular for this to work, whatever UI I add to the existing website cannot affect
the layout of the page in any way (Modularity).
 3. In addition to not affecting the website when the plugin is activated, I also wanted to be sure that
there were no artifacts or remnants of the plugin (Deletability).
 4. Chrome Dev: Content_scripts are the actual JavaScript that gets executed on the website in the active tab while
Background_scripts have access to the Chrome API and can pass messages to 
Content_scripts but don't have direct acceess to them (Sandboxing).


### Page without plugin activated
![Alt text]({{ '/img/domcapture_early1.png' }})

### Page with plugin activated
![Alt text]({{ '/img/domcapture_early2.png' }})

### Clicking on camera screenshots the node
![Alt text]({{ '/img/domcapture_early3.png' }})

### It worked!
![Alt text]({{ '/img/domcapture_early4.png' }})

### Remove plugin artifacts
![Alt text]({{ '/img/domcapture_early5.png' }})

#### Resources:
More about [Chrome Developer Guide][chrome-dev]
[Basic Extension Template][make-red]
[Communicating With Webpages][cross-origin]
[Helpful resource][helpful-resource]
[Publish On Chrome Store][chrome-publish]


[chrome-dev]: https://developer.chrome.com/extensions/devguide
[make-red]: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/browserAction/make_page_red/
[cross-origin]: https://stackoverflow.com/questions/4976996/chromes-tabs-executescript-passing-parameters-and-using-libraries#answer-4979785
[helpful-resource]: https://robots.thoughtbot.com/how-to-make-a-chrome-extension
[chrome-publish]: https://developer.chrome.com/webstore/publish
