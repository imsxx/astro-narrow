---
title: "数学公式与流程图"
summary: "验证 KaTeX 构建时渲染与 Mermaid 按需加载，包含行内公式、块级公式和流程图。"
date: 2026-10-14T09:00:00+08:00
categories: ["组件"]
tags: ["数学", "图表"]
---

上游用 CDN 在浏览器里跑 KaTeX 和 Mermaid；这里数学公式在构建时就渲染成静态 HTML，图表仍然留给浏览器。

## 行内公式

质能方程 $E = mc^2$ 是最常见的那一个。行内公式应该和正文基线对齐，不撑高行距。

再看一个带下标的：$a_1^2 + a_2^2 = c^2$。

## 块级公式

高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

矩阵也能写：

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

## 流程图

```mermaid
flowchart LR
  A[浏览器] --> B[OpenResty]
  B --> C[PHP-FPM]
  B --> D[WordPress 容器]
  C --> E[(MariaDB)]
  D --> E
  D --> F[(Redis)]
```

## 时序图

```mermaid
sequenceDiagram
  participant U as 用户
  participant S as 站点
  participant C as 缓存
  U->>S: 请求页面
  S->>C: 查询缓存
  alt 命中
    C-->>S: 返回 HTML
  else 未命中
    S->>S: 执行 PHP
    S->>C: 写入缓存
  end
  S-->>U: 返回响应
```

公式是静态的，关掉 JavaScript 也能看；图表需要脚本，所以只在含 `mermaid` 代码块的页面加载。
