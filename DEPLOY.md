# 部署说明

## 第一步：部署 Cloudflare Worker（隐藏 API Key）

1. 访问 https://dash.cloudflare.com/ 注册/登录账号（免费）
2. 左侧菜单点击 **Workers & Pages** → **Create Application** → **Create Worker**
3. Worker 名称填：`weather-proxy`（或任意名称）
4. 点击 **Deploy**
5. 点击 **Edit code**，把 `worker.js` 的内容粘贴进去，点击 **Save and Deploy**
6. 点击 **Settings** → **Variables** → 添加环境变量：
   - 变量名：`QWEATHER_API_KEY`
   - 变量值：你的和风天气 API Key
   - 点击 **Save and Deploy**
7. 记下你的 Worker URL，格式类似：`https://weather-proxy.xxx.workers.dev`

## 第二步：更新前端代码

1. 打开 `index.html`
2. 找到第 248 行左右的 `PROXY_URL`
3. 把 `'https://your-worker-name.your-subdomain.workers.dev'` 替换为你的 Worker URL
4. 保存

## 第三步：部署到 GitHub Pages

```bash
cd "/Users/caotianchong/Desktop/weather visualisation"
git add index.html
git commit -m "update: use Cloudflare Worker proxy"
git push origin main
```

然后在 GitHub 仓库页面：
1. 点击 **Settings** → **Pages**
2. Source 选择 **main** 分支
3. 点击 **Save**
4. 等待几分钟，你会得到一个公开链接，格式：`https://ctccc.github.io/weather-visualisation/`

## 完成！

把链接发给朋友，他们打开就能看到：
- 默认显示演示数据
- 点击"刷新数据"按钮直接获取真实天气数据（无需输入任何内容）
