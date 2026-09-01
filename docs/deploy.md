# 鲲 Galgame 导航页 · 部署

> 线上域名:**`nav.kungal.org`**。
> 与 `nextmoe-infra` 同一套部署惯例:**CI 构建 → 推 GHCR → Dokploy 拉预构建镜像**,Dokploy 内置 **Traefik** 反代 + 自动 Let's Encrypt 证书。服务器开荒 / Dokploy 安装 / 隐藏源站等**共用步骤**见 infra 的 [`docs/deploy/`](../../nextmoe-infra/docs/deploy/)(`SERVER-SETUP.md`、`QUICKSTART.md`、`12-dokploy.md`、`13-registry-ci.md`)。

## 0 · 这是什么

一个 **SolidStart**(vinxi → Nitro `node-server` preset)的纯前端站点:

- **无状态、无数据库、无密钥、无运行时环境变量**——卡片链接都是字面量,什么都不用配。
- 单个 web 容器:`node .output/server/index.mjs`,容器内监听 **3000**。
- 产物自包含(`.output`),运行镜像只含 Node + `.output`,不带源码 / pnpm。

| 项 | 值 |
|---|---|
| 镜像 | `ghcr.io/kunmoe/kun-galgame-nav` |
| 容器端口 | `3000`（`expose`，不 `ports`，由 Traefik 内部路由）|
| 网络 | `dokploy-network`（external，与其它 Dokploy 应用共享）|
| 域名 | `nav.kungal.org` → 服务 `web` : `3000` |

相关文件:[`Dockerfile`](../Dockerfile)、[`docker-compose.prod.yml`](../docker-compose.prod.yml)、[`.github/workflows/build.yml`](../.github/workflows/build.yml)。

## 1 · 镜像:CI 构建 → GHCR(不在生产机 build)

`.github/workflows/build.yml` 在 push 到 `main` 时自动构建并推送:

```bash
git push          # → GitHub Actions: build Dockerfile → ghcr.io/kunmoe/kun-galgame-nav:latest + :<sha>
```

- 到 GitHub 仓库 **Packages**,把 `kun-galgame-nav` 包设为 **public** → Dokploy 免凭证拉取;若保持私有,则在 Dokploy 配一个有 `read:packages` 权限的 PAT。
- 镜像同时打 `:latest` 与 `:<git-sha>` 两个 tag,**回滚** = 把引用临时改成某个 `:<git-sha>` 再 redeploy。

> 起步捷径:不想配 CI,可在第 2 步让 Dokploy 直接用 **Git source** 在服务器上 build(本站镜像很轻,单机 build 也扛得住)。

## 2 · Dokploy 部署

前提:服务器已装好 Dokploy(见 infra `QUICKSTART.md` §2),`dokploy-network` 已存在(部署任一 infra 应用后即有;若单独部署本站,Dokploy 创建 Compose 应用时会自动接入)。

1. 面板 → **Create → Compose**,关联本仓库,Compose 文件指向 **`docker-compose.prod.yml`**。
2. **无需填任何环境变量 / `.env`**(本站没有密钥与运行时配置)。
3. **Deploy**,等 `web` 容器 healthy。
4. 应用 **Domains** 标签加一条:

   | 域名 | 路径 | 目标服务 | 容器端口 |
   |---|---|---|---|
   | `nav.kungal.org` | `/` | `web` | `3000` |

   Dokploy 自动注入 Traefik labels 并签 Let's Encrypt 证书。
   > 若按 infra `QUICKSTART.md` §10 给该域名开了 Cloudflare 橙云,Traefik 的 LE **HTTP 验证会被拦** → 改用 **DNS-01** 或挂 **Cloudflare Origin CA** 证书,CF SSL 模式设 **Full (strict)**。

## 3 · DNS

把 `nav.kungal.org` 的 **A 记录指向服务器公网 IP**(建议同 infra 一样开 Cloudflare 橙云 + 防火墙锁 CF 段以隐藏源站,见 infra `QUICKSTART.md` §10)。

## 4 · 验证

```bash
curl -I https://nav.kungal.org           # 200 + 有效证书
curl -s https://nav.kungal.org/en  | grep -o '<html[^>]*lang="en"'      # 英文路由
curl -s https://nav.kungal.org/zzz | grep -o '页面未找到'               # 404
```

Dokploy 应用页看 **Logs / 健康状态**。

## 5 · 本地用 Docker 跑(可选,验证镜像)

```bash
docker build -t kun-galgame-nav .
docker run --rm -p 3000:3000 kun-galgame-nav
# 打开 http://localhost:3000
```

> 不用 Docker 时,纯 Node 预览:`pnpm build && node .output/server/index.mjs`(默认 3000,可用 `PORT` 改)。

## 6 · 持续更新

push 到 `main` → CI 重 build 推 GHCR → CI 的 `deploy` job 调 **Dokploy webhook**(放进 GitHub Secret 的 `DOKPLOY_WEBHOOK_NAV`,在 Dokploy 应用 → **Deployments → Webhook** 取得)触发拉新镜像滚动更新。未配置该 secret 时 CI 只推镜像、跳过自动 redeploy(手动在面板点 Redeploy 即可)。
