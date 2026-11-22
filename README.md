# 常灏的技术笔记

这是一个使用 Astro 搭建的静态技术博客。文章保存在 Markdown 文件中，网站通过 Cloudflare Workers 发布，源代码保存在 GitHub。

## 一、认识项目

最重要的目录只有三个：

```text
src/content/blog/   文章放在这里
src/styles/         网站样式
src/pages/          网站页面
```

一篇文章就是一个 `.md` 文件。修改 Markdown 后，Astro 会自动生成对应网页。

## 二、第一次在电脑上运行

### 1. 安装 Node.js

本项目需要 Node.js 22.12 或更高版本。打开 PowerShell，执行：

```powershell
node --version
npm --version
```

如果两条命令都能显示版本号，就可以继续。

### 2. 安装项目依赖

打开 PowerShell，进入博客目录：

```powershell
cd "E:\常灏\博客\kunstnere-tech-blog"
npm install
```

只需要在第一次使用或依赖发生变化时执行。

### 3. 启动本地预览

```powershell
npm run dev
```

终端会显示一个本地地址，通常是：

```text
http://localhost:4321/
```

按住 `Ctrl` 并点击地址，或者把它复制到浏览器打开。修改文件时页面会自动刷新。

需要停止本地网站时，在终端按 `Ctrl + C`。

## 三、写一篇新文章

### 第 1 步：新建文件

在 `src/content/blog/` 中新建一个 `.md` 文件，例如：

```text
my-first-post.md
```

文件名会成为网址的一部分。建议使用英文小写和短横线，例如：

```text
how-i-learned-astro.md
```

### 第 2 步：填写文章信息

每个 Markdown 文件顶部都要有这段 Frontmatter：

```markdown
---
title: "文章标题"
description: "用一两句话说明文章解决什么问题。"
pubDate: 2026-11-23
tags: ["Astro", "前端"]
featured: false
draft: false
---
```

含义：

- `title`：文章标题。
- `description`：文章摘要，也会用于搜索和分享。
- `pubDate`：发布日期。
- `tags`：文章标签。
- `draft`：设为 `true` 时不会公开。

### 第 3 步：写正文

Frontmatter 之后空一行，再开始写正文：

````markdown
## 问题背景

这里写遇到了什么问题。

## 解决过程

这里写尝试和最终方案。

```ts
// 这里放代码
```
````

### 第 4 步：本地检查

回到运行 `npm run dev` 的终端，浏览器中的文章列表应自动更新。依次检查：

1. 首页能看到新文章。
2. 点击标题能打开文章详情。
3. 代码块不会超出手机屏幕。
4. 标签链接可以正常使用。

### 第 5 步：提交代码

确认文章没问题后执行：

```powershell
git add .
git commit -m "post: 添加第一篇技术文章"
git push
```

如果这是第一次提交，需要先从 GitHub 创建一个远程仓库，再按该仓库页面显示的命令关联。

## 四、发布到互联网

### 第 1 步：注册 GitHub

1. 打开 https://github.com/
2. 点击 `Sign up`。
3. 按页面提示注册账号。
4. 验证邮箱并开启两步验证。

### 第 2 步：创建 GitHub 仓库

1. 登录 GitHub。
2. 点击右上角 `+`，选择 `New repository`。
3. 仓库名填写 `tech-blog`。
4. 选择 `Private` 或 `Public`。私有仓库也可以部署到 Cloudflare Workers。
5. 不要勾选自动创建 README，因为本地已经有文件。
6. 点击 `Create repository`。

### 第 3 步：把本地代码推送到 GitHub

打开 PowerShell，在博客目录执行：

```powershell
cd "E:\常灏\博客\kunstnere-tech-blog"
git init
git add .
git commit -m "initial: create personal blog"
git branch -M main
git remote add origin https://github.com/你的用户名/tech-blog.git
git push -u origin main
```

把命令中的 `你的用户名` 换成 GitHub 用户名。推送时可能需要通过浏览器登录 GitHub。

### 第 4 步：注册 Cloudflare

1. 打开 https://dash.cloudflare.com/sign-up
2. 注册并验证邮箱。

### 第 5 步：连接 GitHub 仓库

1. 登录 Cloudflare Dashboard。
2. 进入 `Workers & Pages`。
3. 点击 `Create application`。
4. 选择从 Git 仓库导入。
5. 授权 Cloudflare 访问 GitHub，并选择 `tech-blog` 仓库。

构建配置填写：

```text
Project name: kunstnere-tech-blog
Production branch: main
Build command: npm run build
Deploy command: npx wrangler deploy
Preview command: npx wrangler preview
```

建议在 Cloudflare 的环境变量中增加：

```text
NODE_VERSION=22.20.0
```

点击 `Save and Deploy`。第一次构建通常需要一到三分钟。

部署成功后，Cloudflare 会提供一个类似下面的免费网址：

```text
https://kunstnere-tech-blog.3213209647.workers.dev
```

以后每次执行 `git push`，Cloudflare Workers 都会自动重新构建并发布。

## 五、绑定自己的域名

免费网址适合测试，正式运营建议购买域名。

1. 在域名服务商购买域名，例如 `yourname.com`。
2. 在 Cloudflare Workers 项目中选择 `Settings`，再进入 `Domains & Routes`。
3. 点击 `Set up a custom domain`。
4. 按提示添加域名。
5. 如果域名使用 Cloudflare DNS，通常可以自动配置；否则按提示添加 CNAME 记录。

绑定域名后，还需要把 `astro.config.mjs` 中的网站地址改掉：

```js
site: "https://你的域名",
```

同时把 `src/data/site.ts` 中的邮箱和 GitHub 地址改成真实信息。

## 六、日常写作流程

以后只需要记住四步：

```powershell
cd "E:\常灏\博客\kunstnere-tech-blog"
npm run dev
```

写文章并本地检查，然后：

```powershell
git add .
git commit -m "post: 文章标题"
git push
```

等待 Cloudflare 自动部署完成即可。

## 七、新手常见问题

### 端口 4321 被占用

Astro 会自动改用其他端口，以终端显示的地址为准。

### 修改文章后页面没有变化

先确认浏览器打开的是 `npm run dev` 输出的地址，再刷新浏览器。

### 构建失败

先执行：

```powershell
npm run build
```

根据终端中的第一条红色错误信息排查，不要同时改多个地方。

### 发布后页面没有更新

打开 Cloudflare Workers 项目的部署记录，确认最新部署已经成功。
