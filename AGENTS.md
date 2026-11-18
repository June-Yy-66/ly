# AGENTS.md — 项目开发规则

> 本文件定义 d:\June_css 项目的所有开发规则，所有 AI Agent 在生成或修改代码前必须遵守。

---

## 一、命名规则

- **所有 CSS 类名、ID 名、JS 变量**必须以 `ly_` 作为前缀
  - ✅ 正确：`ly_nav`, `ly_header`, `ly_clickHandler`
  - ❌ 错误：`nav`, `lyue_nav`, `myClickHandler`

## 二、HTML 文件规则

- 所有**新建** HTML 文件必须包含指向 `index.html` 的返回首页超链接
- 所有**新建** HTML 文件的第一行（`<!DOCTYPE html>` 之后）必须添加文件头注释，格式如下：

```html
<!--
  作者：刘悦
  建立时间：YYYY-MM-DD
  使用大模型：GLM-5.3-FlashX
  功能名称：<简要描述该页面的功能>
-->
```

**示例：**

```html
<!DOCTYPE html>
<!--
  作者：刘悦
  建立时间：2026-11-04
  使用大模型：GLM-5.3-FlashX
  功能名称：移动端底部导航栏演示页面
-->
<html lang="zh-CN">
```

## 三、JavaScript 函数注释规则

- 每一个 JS 函数（包括全局函数和对象方法）**必须**在函数上方添加注释，说明该函数的主要功能
- 注释风格统一使用 `//` 或 `/* */`，推荐 JSDoc 风格

**示例：**

```javascript
/**
 * 计算并返回学生的平均分
 * @param {Array} ly_scores - 分数数组
 * @returns {number} 平均分
 */
function ly_getAvg(ly_scores) {
  let ly_sum = ly_scores.reduce((a, b) => a + b, 0);
  return ly_sum / ly_scores.length;
}
```

## 四、提示词留痕规则

- 每次执行任务前，必须将提示词以**追加**方式写入项目根目录 `ly_prompt.md`
- 写入内容必须包含：时间、使用的模型名称、提示词原文
- 绝对不能覆盖 `ly_prompt.md` 已有内容

## 五、外部资源规则

- 项目使用的外部 CDN 资源（CSS、JS、字体等）必须下载到项目本地 `cdn/` 目录后再引用
- 图标实现支持两种方式：
  - 字体图标方式（对应 iconfont-1.html、iconfont-3.html）
  - SVG 方式（对应 iconfont-2.html、iconfont-4.html）

## 六、移动端底部导航约定

- 固定在屏幕底部，自适应宽度
- 支持 4 个导航项
- 每个导航项右上角支持数字徽章和红点提示
