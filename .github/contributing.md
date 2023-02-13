# 贡献指南

`inpageedit-v2`是 InPageEdit-v2 的官方仓库。虽然最初 IPE 只是一个个人项目，但现在它已经拥有了非常多的社区贡献者，我们也非常鼓励您参与到 InPageEdit 及其生态的开发中。同时，基于您对本仓库的贡献，我们也会在适当的时机邀请您成为本仓库的 collaborator。

## 在你贡献之前需要知道

### 我发现了一个 BUG！

首先非常感谢你。不过在提交用于修复 BUG 的 PR 前，你应该先提交一个 Issue，用于说明你遇到的问题，然后在 PR 的说明中，简单描述你修复的方法。

### 我能给 InPageEdit 增加新特性吗？

当然可以。不过在此之前建议你发一个 feature request 或者在官方群中与作者交流意见。这是因为 InPageEdit 目前正由相当多的 wiki 社区使用，它的原始码相当古老且杂乱，为了防止改动一处后另一处炸掉的类似情况，在修改代码前与其他贡献者多多沟通。

## 如何发送 Pull Request

### 基本流程

1. fork 这个仓库
2. 检出 dev 分支（注意不是 master）
3. 在 HEAD 处创建一个自己的分支，比如 my-feature
4. 进行你的开发
5. 创建 pull request 到 dev 分支

### 额外说明

1. InPageEdit-v2 的模块目前遵循 commonjs 规范
2. 请尽量使用 ES6 及以上的语法
3. 在提交前您应该使用 yarn lint 进行质量检查
4. 请不要修改`package.json`中的版本号，我们的发版脚本会自动修改版本号
5. 一般情况下，我们会采取 squash merge —— 但如果你的 commit 写的特别漂亮，我们会考虑直接 merge
6. 如果你不确定自己所做的修改是否正确，可以先发 draft PR 并在其中说明

### 关于 commit Message 规范

我们采用“约定式提交”规范。如果你使用的是 vscode，推荐安装`vivaxy.vscode-conventional-commits`插件。

简单来说：

1. 标题一定要是纯英文（当然可以包含适当的 emoji）
2. 要有一个合适的前缀，即你的 commit 标题应当满足下列格式：
   - fix(xxx): message
   - feat(xxx): message
   - test(xxx): message
   - build: message
   - chore: message
   - docs: message
3. 上面的 `xxx` 应该是修改中对应的组件名，例如 `quickEdit`

注：merge commit 等自动产生的 commit message 不受限制

## 分支命名规范

**主要**

- `master` 被认为是稳定的或可供发行的代码

**团队内开发者**

请内部开发者尽量使用以下分支命名规范

- `user/xxx-patch-number`
  - `user` GitHub 用户名
  - `xxx` 主要修改的模块
  - `number` 避免重名所用的编号，也可以写成时间戳

示例: `Dragon-Fish/quickEdit-patch-114514`

**其他**

- `dependabot/*` 由 GitHub dependabot 自动推送


## 脚本说明

TBC

## 成为 Collaborator

如果你为本仓库做出了许多贡献，你账号绑定的邮箱可能会收到一封带有本仓库神秘链接的电子邮件，你可以通过其中的按钮成为本仓库的正式开发者！

之后，你将可以：

- 审核其他人的 pull request
- 修改代码前不必再 fork，可以直接在本仓库进行操作
- ~~在互动讨论中有一个帅气的 collaborator 标识~~
