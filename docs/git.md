# 涉及版本控制系统（git）的一些相关

## 分支遵循 git-flow 工作流

- master：稳定的历史分支，又叫保护分支，表示正式发布的历史, 所有对外正式版本发布都会合并到这里, 并打上版本标签。

- develop：开发的历史分支，用来整合功能分支， 表示最新的开发状态。

- feature：用来开发功能的分支，从 develop 衍生，最终合并到 develop。

- release：介于 develop 和 master 之间的分支，在这个分支上不会再有新的功能添加进来，只是做一些 bug 修复。从 develop 衍生，最终合并到 master 和 develop。

- hotfix：补丁分支，一般用于生产版本紧急修复。从 master 衍生，修复后合并到 master 和 develop。

## git 提交规范

```md
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- type 和 subject必填，其他可选

```md
fix: ***
```

## git 常用命令

...