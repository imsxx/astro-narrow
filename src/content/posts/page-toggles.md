---
title: "页面级开关：全部关闭"
summary: "验证 toc、mermaid、katex、lightbox 的页面级覆盖，以及 license 的页面级设置。"
date: 2026-10-10T10:00:00+08:00
categories: ["组件"]
tags: ["开关"]
toc: false
mermaid: false
katex: false
lightbox: false
license: "CC BY-ND 4.0"
comments: false
---

这篇在 front matter 里关掉了目录、图表渲染和灯箱，并单独指定了授权协议。

## 公式不渲染

质能方程 $E = mc^2$ 应该保持原文，而不是排版成公式。

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 图表不退化成图片

```mermaid
flowchart LR
  A[浏览器] --> B[服务器]
```

关闭后它应该还是一片代码块，带语言标签，而不是被交给 mermaid 渲染。

## 图片没有灯箱

![普通图片](/images/placeholder/1.jpg)

图片仍然参与画廊排版，但点击不会打开灯箱。

## 没有目录

因为 `toc: false`，右侧目录面板和 dock 上的目录按钮都不会出现。
