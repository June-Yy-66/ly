---
name: "ly-git-push"
description: "提交项目并推送到 GitHub 仓库 https://github.com/June-Yy-66/ly.git（SSH：git@github.com:June-Yy-66/ly.git），使用已配置的 SSH 公钥 id_ed25519。当用户说“提交到github”“上传到github”“推送到远程”“同步代码到仓库”时使用。"
---

# 提交并推送项目到 GitHub（ly 仓库）

将 `d:\June_css` 项目提交 commit 并 push 到 `https://github.com/June-Yy-66/ly.git`（SSH 地址 `git@github.com:June-Yy-66/ly.git`），使用本机已设置的公钥 `C:\Users\Administrator\.ssh\id_ed25519`。

## 执行步骤

### 1. 提示词留痕（必须先做）

按项目规则，执行前先把本次提示词**追加**到 `d:\June_css\ly_prompt.md`，不得覆盖已有内容：

```powershell
Add-Content -Path "d:\June_css\ly_prompt.md" -Value "`n## <YYYY-MM-DD> | 模型：<模型名> | 提示词：`n<提示词原文>" -Encoding utf8
```

### 2. 检查状态与远程

```powershell
git -C d:\June_css status --short
git -C d:\June_css remote -v
```

### 3. 配置远程仓库

若 remote 不存在：

```powershell
git -C d:\June_css remote add origin git@github.com:June-Yy-66/ly.git
```

若已存在但地址不是 ly.git：

```powershell
git -C d:\June_css remote set-url origin git@github.com:June-Yy-66/ly.git
```

### 4. 验证 SSH 公钥可用

```powershell
ssh -T git@github.com
```

- 成功标志：`Hi <用户名>! You've successfully authenticated, but GitHub does not provide shell access.`
- 失败时检查：
  - 公钥是否已添加到 GitHub（Settings → SSH and GPG keys）
  - `C:\Users\Administrator\.ssh\config` 是否需要走 443 端口（22 端口常被校园网/公司网拦截）：
    ```
    Host github.com
      HostName ssh.github.com
      Port 443
      User git
      IdentityFile C:\Users\Administrator\.ssh\id_ed25519
      IdentitiesOnly yes
    ```

### 5. 提交改动

```powershell
git -C d:\June_css add -A
git -C d:\June_css commit -m "<中文简短描述本次变更>"
```

若 `git status` 显示无变更则跳过 commit。

### 6. 推送到 GitHub

```powershell
git -C d:\June_css push -f origin HEAD:master
```

- 需要同时同步 main 分支时：`git -C d:\June_css push -f origin HEAD:main`
- 成功标志：输出中包含 `-> master`

### 7. 网络异常时的处理（不要无限重试）

若出现 `Connection reset`、`Connection timed out`、`Permission denied (publickey)`：

1. 最多重试 3 次，每次间隔 8~10 秒；
2. 仍失败则**停止**，告知用户属于本机到 GitHub 的网络拦截，给出替代方案：
   - 换网络（如手机热点）后执行同一条 push 命令；
   - 或改用 HTTPS + PAT：`git remote set-url origin https://github.com/June-Yy-66/ly.git`，然后 `git -c http.sslVerify=false push -f origin HEAD:master`。
3. 不要修改全局 git 配置，不要删除或重建仓库。

### 8. 验证结果

```powershell
git -c http.sslVerify=false ls-remote --heads https://github.com/June-Yy-66/ly.git
```

确认 `refs/heads/master` 指向本地最新提交。

## 注意事项

- 私钥 `id_ed25519` 绝不外泄、绝不提交到仓库。
- 项目内有独立 `.git` 的子目录会变成子模块，导致 GitHub Pages checkout 报 `No url found for submodule path`；这类目录需先 `git rm -r --cached` 并写入 `.gitignore`。
- 提交信息用中文，简短说明改了什么。
- 远程仓库若不存在，需先在 GitHub 网页或 `gh repo create` 创建仓库，再加 remote。
