# registry-web

registry 的前端。

## 说明

- 此 App 用于展示 `library` 镜像，即公共镜像，可以用在 `lain.yaml` 里的 `build.base` 和 `release.dest_base`
- 目前服务的后端是 `registry.yxapp.xyz`，更换的话需要改 2 个地方：
    - `lain.yaml` 里的 `web.mountpoint`
    - `webpack.common.js` 里的 `REGISTRY_HOST`

## 部署

```
lain build
lain tag ${LAIN-cluster}
lain push ${LAIN-cluster}
lain deploy ${LAIN-cluster}
```
