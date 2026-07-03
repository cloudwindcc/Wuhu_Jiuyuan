# Wuhu Jiuyuan Website

芜湖鸠源建筑设计有限公司官网静态网页项目。

## 项目内容

- `website/index.html`：中文官网页面结构
- `website/en.html`：英文对照页面
- `website/styles.css`：响应式样式
- `website/script.js`：移动端导航、项目启动建议、表单记录逻辑
- `website/script-en.js`：英文页面导航、项目启动建议、表单记录逻辑
- `website/assets/hero-architecture-studio.png`：官网主视觉资产
- `index.html`：GitHub Pages 根路径跳转页

## 本地预览

```powershell
python -m http.server 5177 -d website
```

打开：

```text
http://127.0.0.1:5177/
```

## 上线说明

这是一个原生静态站点，可部署到 GitHub Pages、Cloudflare Pages、Nginx、对象存储静态网站等平台。

如使用 GitHub Pages 并选择仓库根目录作为发布源，根目录的 `index.html` 会自动跳转到 `website/index.html`。

后续可继续补充营业执照、资质证书、案例图片、联系人、备案域名和表单收件方式。
