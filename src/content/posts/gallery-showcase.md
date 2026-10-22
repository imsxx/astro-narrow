---
title: "图片画廊与灯箱"
summary: "验证相邻图片自动聚合成画廊、布局切换和灯箱查看。"
date: 2026-10-12T16:00:00+08:00
categories: ["组件"]
tags: ["图片", "画廊"]
---

图片不需要额外的 shortcode，渲染时会自动包成 figure，相邻的图片再聚合成画廊。

## 一组图片

![示例图片一](/images/placeholder/1.jpg "第一张：带说明文字")

![示例图片二](/images/placeholder/2.jpg)

![示例图片三](/images/placeholder/3.jpg)

![示例图片四](/images/placeholder/4.jpg "第四张：说明支持行内标记")

## 单张图片

![单独一张](/images/placeholder/1.jpg)

单独出现的图片不聚合，点击可以直接打开灯箱。

## 与正文混排

上面两组图片之间隔着标题，所以不会被合并。如果图片前后还有其他元素，画廊会按相邻关系重新分组。

画廊右上角可以切换布局（justified / masonry / grid），这个状态会记在本地，下次打开沿用。
