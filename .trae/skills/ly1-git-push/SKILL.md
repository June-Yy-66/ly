---
name: "ly1-git-push"
description: "提交项目并推送到 GitHub 仓库 https://github.com/June-Yy-66/ly1.git（SSH：git@github.com:June-Yy-66/ly1.git），使用已配置的 SSH 公钥 id_ed25519。当用户说“提交到 ly1”“上传到 github（ly1）”“推送到远程仓库”时使用。"
---

# 提交并推送项目到 GitHub（ly1 仓库）

将 `d:\June_css` 项目提交 commit 并 push 到 `https://github.com/June-Yy-66/ly1.git`（SSH 地址 `git@github.com:June-Yy-66/ly1.git`），使用本机公钥 `C:\Users\Administrator\.ssh\id_ed25519`。

## 执行步骤

### 1. 提示词留痕（必须先做）

执行前先把本次提示词**追加**到 `d:\June_css\ly_prompt.md`，不得覆盖已有内容：

```powershell
Add-Content -Path "d:\June_css\ly_prompt.md" -Value "`n## <YYYY-MM-DD> | 模型：<模型名> | 提示词：`n<提示词原文>" -Encoding utf8
```

### 2. 检查状态与远程

```powershell
git -C d:\June_css status --short
git -C d:\June_css remote -v
```

### 3. 配置远程仓库为 ly1

不存在则添加：

```powershell
git -C d:\June_css remote add origin git@github.com:June-Yy-66/ly1.git
```

已存在但地址不是 ly1：

```powershell
git -C d:\June_css remote set-url origin git@github.com:June-Yy-66/ly1.git
```

### 4. 验证 SSH 公钥

```powershell
ssh -T git@github.com
```

成功标志：`Hi June-Yy-66! You've successfully authenticated, but GitHub does not provide shell access.`

若报 `Connection reset` / `timed out`，说明网络拦截，可分别测试 22 与 443：

```powershell
ssh -o ConnectTimeout=10 -p 22 -T git@github.com
ssh -o ConnectTimeout=10 -T git@github.com      # 走 .ssh/config 中配置的 443
```

两者都能通过认证但仍无法传输数据时，属于链路对 TCP 数据段的干扰，不要继续死循环重试。

### 5. 提交改动

```powershell
git -C d:\June_css add -A
git -C d:\June_css commit -m "<中文简短描述本次变更>"
```

若 `git status` 无变更则跳过 commit。

### 6. 推送到 GitHub

```powershell
git -C d:\June_css push -f origin HEAD:master
```

- 需要同步 main：`git -C d:\June_css push -f origin HEAD:main`
- 成功标志：输出中出现 `-> master`
- ly1 若是新仓库（空仓库），首次推送即创建 `master`

### 7. 网络失败的处理（最多 3 次）

1. 重试 3 次，每次间隔 8~15 秒；
2. 仍失败立即停止，把失败原因（如 `Connection reset by 20.205.243.160 port 443`）告诉用户，并给出两条可执行路径：
   - 让用户在**自己的 PowerShell** 中执行同一条 push（不受工具代理影响）；
   - 或改用 HTTPS + PAT：`git remote set-url origin https://github.com/June-Yy-66/ly1.git`，再 `git -c http.sslVerify=false push -f origin HEAD:master`；
   - 或建议网页上传：仓库页 `Add file` → `Upload files`。
3. 不要修改全局 git 配置，不要删除仓库、不要改写历史。

### 8. 验证结果

```powershell
git -c http.sslVerify=false ls-remote --heads https://github.com/June-Yy-66/ly1.git
git -C d:\June_css log --oneline -1
```

确认 `refs/heads/master` 与本地最新提交一致。

## 注意事项

- 私钥 `id_ed25519` 绝不外泄、绝不提交到仓库。
- 只上传指定文件时，可在临时目录建独立仓库（`$env:TEMP\xxx`）单独 push，避免把整个项目推上去。
- 项目内带独立 `.git` 的子目录会被识别为子模块，导致 GitHub Pages 报 `No url found for submodule path`；需 `git rm -r --cached <目录>` 并写入 `.gitignore`。
- 提交信息用中文，简短说明改了什么。
