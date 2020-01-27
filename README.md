# vue-cli3

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/)

# vue-cli3

<span id="top">目录</span>

- [√ nodemon json-server]
- [√ 配置多环境变量]
- [√ 配置 proxy 跨域]
- [√ 支持 seo]
- [√ 去掉 console.log]
- [√ 添加 IE 兼容]
- [√ 配置多项目模式]
- [√ webpack 启动之后自动打开首页]
- [√ webpack 构建完成之后服务器自动部署]

备注 npm run 参数说明
baseurl 默认值 "http://localhost:8080/" baseurl 根路径,如果不显示设置默认获取当前服务器地址
baseenv 默认值 "mock" 代理环境
baseproject 默认值 "project1" 项目名称 (此处值对应 view/login/文件下文件名称)

示例
npm run dev --baseurl=http://localhost.dev:9000/ --baseenv=api --baseproject=project2
