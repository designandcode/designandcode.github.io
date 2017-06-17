---
layout: post
title:  "The Backlog"
date:   2017-06-04 18:29:51 -0400
categories: jekyll update
permalink: /the-backlog/
description: Sharing my experience learning development while I create something new every day
---
As part of my personal commitment to create digital things online every day I will continuously update this page
to reflect the things I am working on. In addition to creating things, I want to get better at 
*communicating* and sharing my experience learning new tools, processes, and methodologies.

In order to be as transparent as possible, I will share my efforts daily. This serves two purposes:
1.	It will enforce the core habit of creating something every day.
2.	I can share my experience more easily without having to recall what happened.

Please check back here from time to time and see what I'm up to. I hope you are as excited about this as I am.
Actually, I will happily accept even moderate excitement on your part :)

### The List
{% for post in site.posts %}
{% if post.type == 'experiment' %}
<h3>
{{ post.date | date: "%Y-%m-%d" }}: <a href="{{ post.url }}">{{ post.title }}</a>
</h3>
{% endif %}
{% endfor %}