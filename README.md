# astro-narrow

[English](./README.en.md) · **简体中文**

[hugo-narrow](https://github.com/tom2almighty/hugo-narrow) 的 Astro 移植版。

这不是逐行翻译模板，而是按 Astro 的方式重写了一遍：功能与视觉对齐上游，实现上凡是能换成 Astro 原生能力的地方都换掉了（图片管线、代码高亮、目录、配置校验）。

- 上游版本：`hugo-narrow v2.0.1`
- 技术栈：Astro 7 + Tailwind CSS 4
- 在线示例：[imsxx.com](https://imsxx.com)——作者的博客，跑的就是这个主题，没有二次定制

## 已实现

- 布局骨架：单栏正文、浮动 dock、面包屑上下文栏、页脚
- 外观面板：12 套配色、明暗/跟随系统、宽度 / 模糊 / 噪点滑杆
- 文章页：元信息、正文排版、可固定目录面板、阅读进度、上下篇、相关文章、系列进度条与浮层
- 列表页：分页文章列表、按年月归档、标签、分类、系列
- 搜索：客户端索引 + `Ctrl+K` 弹窗
- 代码块：Shiki 双主题、语言标签、复制、折叠
- 数学公式：KaTeX 构建时渲染
- 图表：Mermaid 按需加载，切换主题时重绘
- 图片：相邻图片自动成组，支持布局切换与灯箱
- 嵌入组件：按钮、链接卡、标签页、Bilibili、腾讯视频（MDX 组件）
- 独立页：关于、简历、时间线、项目
- 评论：giscus、disqus、utterances、waline、artalk、twikoo、comentario
- 统计：Google、百度、Clarity、Umami
- 界面语言：由上游 i18n 文件生成的 13 种语言
- 订阅与元数据：RSS、sitemap、SVG 图标 sprite、web manifest

## 功能开关

开关关掉就是彻底关掉——没有残留标记、不加载脚本、不发请求。全部集中在 `src/config/site.ts`，由 Zod 校验。

| 开关 | 默认 | 关闭后的效果 |
| --- | --- | --- |
| `announcement.enabled` | `false` | 不显示公告条 |
| `toc.enabled` | `true` | 无目录面板，dock 上的目录按钮一并隐藏 |
| `readingProgress.enabled` | `true` | 无阅读进度条 |
| `search` | 始终开启 | 搜索索引端点仍会生成 |
| `comments.enabled` + `system` | `false` | 无评论结构；需填对应服务商配置 |
| `analytics.provider` | `""` | 不加载统计脚本 |
| `katex.enabled` | `true` | 公式保持原文，KaTeX 插件不注册 |
| `mermaid.enabled` | `true` | 图表按代码块显示，运行时不加载 |
| `gallery.enabled` | `true` | 图片退回普通 `<img>` |
| `lightbox.enabled` | `true` | 画廊没有灯箱 |
| `codeblock.collapse.enabled` | `true` | 无折叠按钮 |
| `post.showRelated` | `true` | 无相关文章区块 |

### 页面级覆盖

单篇文章可以在 front matter 里覆盖站点默认值：

```yaml
toc: false
comments: false # 或 { enabled: true, system: "giscus" }
katex: false
mermaid: false
lightbox: false
license: "CC BY-ND 4.0" # 或 false 隐藏
```

`key: false` 和 `key: { enabled: false }` 两种写法都支持，与上游一致。`katex` 和 `mermaid` 在 Markdown 渲染前就已判定，关闭后整块保持原样，不会出现「渲染了一半」。

## 尚未移植

- 内容级多语言路由（界面文案可切换，文章保持单语言）
- 上游脚本自带的三种画廊布局之外的扩展

## 环境要求

- Node.js 22.23.4+（Astro 7）
- pnpm 10

## 开发

```bash
pnpm install
pnpm dev
```

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 本地开发服务器 |
| `pnpm build` | 构建静态站点到 `dist/` |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm check` | 检查 `.astro` 与 `.ts` 类型 |
| `pnpm format` | 用 Biome 格式化 |
| `pnpm i18n` | 从上游快照重新生成语言字典 |
| `pnpm upstream:pull <tag>` | 把 `upstream/hugo-narrow` 更新到指定标签 |

Biome 负责脚本、配置和数据文件。`.astro` 不在格式化范围内——它的实验性 HTML 解析器读不了 Astro 的 `define:vars`。模板的类型安全由 `pnpm check` 保证。

## 部署

产物是全静态的：`pnpm build` 之后发布 `dist/` 即可。Cloudflare Pages、Vercel、Netlify、S3、nginx 都行。

```ts
// astro.config.ts
export default defineConfig({
  site: "https://example.com", // 你的域名，决定 canonical、sitemap 和 robots.txt
  base: "/", // 部署在子路径时改成 "/repo"
  // ...
})
```

`site` 和 `base` 都会贯穿到站内链接、封面图、图标 sprite、搜索索引、manifest 与 RSS。`base` 用于 GitHub Pages 之类的子路径部署，根目录部署保持 `"/"`。

Node 版本由 CI 读取 `.node-version`，请保持在 24；Node 25 目前在 Windows 上构建会崩。

## 示例内容

`src/content/posts` 里有四篇示例文章。其中三篇组成「主题使用指南」系列，分别讲 Markdown 排版、MDX 嵌入组件和页面级开关；第四篇是同样内容的英文版。换成自己的文章后可以删掉——它们的 front matter 本身就是一份字段参考。

`src/content/pages` 放关于 / 简历 / 时间线，`src/content/projects` 放项目列表。

## 目录结构

```
src/
├── config/       # 站点配置，Zod 校验
├── content/      # 文章（.md / .mdx）与独立页
├── components/
│   ├── ui/       # dock、上下文栏、目录、搜索、外观、菜单
│   ├── content/  # 卡片、栅格、列表、分页、相关文章
│   ├── embeds/   # 替代 Hugo shortcode 的 MDX 组件
│   └── features/ # 评论
├── layouts/      # 基础布局
├── pages/        # 路由、订阅、搜索索引、sprite 端点
├── lib/          # 数据聚合、日期、分页、rehype 插件
├── i18n/         # 类型化字典
├── styles/       # Tailwind 入口 + 上游样式
├── icons/        # 上游 SVG 图标
└── scripts/      # 上游交互脚本
upstream/         # 上游只读快照，用于 diff
```

## 移植策略

`src/styles`、`src/icons`、`src/scripts` 从上游原样复制——`main.css` 只多了一行 Shiki 的 `@import`。其余部分都是 Astro 组件。逐文件的对应关系见 [PORTING.md](./PORTING.md)。

## 许可证

AGPL-3.0-only。原主题版权归其作者所有，详见 [LICENSE](./LICENSE)。
