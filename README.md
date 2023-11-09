# Litalino/flarum-more-bbcode

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/litalino/flarum-more-bbcode.svg)](https://packagist.org/packages/litalino/flarum-more-bbcode) [![Total Downloads](https://img.shields.io/packagist/dt/litalino/flarum-more-bbcode.svg)](https://packagist.org/packages/litalino/flarum-more-bbcode)

A [Flarum](http://flarum.org) extension. Adds more BBCode

## Install

Install using composer:

```sh
composer require litalino/flarum-more-bbcode:"*"
```

## How to use

### Login/reply visible
When creating/editing a post, you can simply use [reply]BBCode to make it hidden from other users. Only the user who replied can see the hidden content.

```bbcode
[login]The content here is visible after login[/login]
[reply]The content of the reply here can be seen[/reply]
```
### Network disk style
Very elegant sharing network disk link, or Github/Gitee warehouse link
```bbcode
[cloud type=google title=title url=link]password[/cloud]
[cloud type=one title=title url=link]password[/cloud]
[cloud type=f title=title url=link]password[/cloud]

[cloud type=lz title=title url=link]password[/cloud]
[cloud type=123 title=title url=link]password[/cloud]
[cloud type=ali title=title url=link]password[/cloud]
[cloud type=bd title=title url=link]password[/cloud]
[cloud type=ty title=title url=link]password[/cloud]
[cloud type=360 title=title url=link]password[/cloud]
[cloud type=ct title=title url=link]password[/cloud]
[cloud type=tx title=title url=link]password[/cloud]
[cloud type=kk title=title url=link]password[/cloud]
[cloud type=other title=title url=link]password[/cloud]
[cloud type=github title=title url=link]v1.0.0[/cloud]
[cloud type=gitee title=title url=link]v1.0.0[/cloud]
```
## Known issues

* After the user replies to a post with hidden content and clicks the reply button again, the hidden content style will be lost.
* The summary of the post list will show the hidden content (temporary solution: don’t put the hidden content too early in the post)
* ~~When the post author is editing, the network disk download address cannot be clicked~~ (Fixed)

## TODO
* Try to fix known issues
* Permission control
  

## Renew

```sh
composer update litalino/flarum-more-bbcode:"*"
php flarum migrate
php flarum cache:clear
```

## Update content
### 1.0.4
* Clone https://github.com/imeepo/flarum-more-bbcode
### 1.0.3
* 修复了en.yml（[Litalino修复](https://github.com/imeepo/flarum-more-bbcode/pull/2/commits/5ac34546d7a6c372af65471c22c2304943c3f0f0)）
* 为other下载添加了语言
### 1.0.2
* * Fixed the issue where the network disk download address cannot be clicked when the post author is editing ([zxy19 repair](https://github.com/imeepo/flarum-more-bbcode/commit/c1e4cfcde7c1de0314be5656306fe9c7c81b9e2b))
* Added Quark network disk

## Link

- [Packagist](https://packagist.org/packages/litalino/flarum-more-bbcode)
- [GitHub](https://github.com/litalino/flarum-more-bbcode)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
