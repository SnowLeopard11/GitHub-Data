# vue-github-data

一个基于Vue框架的可视化Github大数据平台

## Link
- 预览请看：[github-data](https://snowleopard11.github.io/GitHub-Data/)

## Tree
```
├── README.md                 项目介绍
├── vue.config.js             项目配置
├── deploy.sh                 部署文件
├── package.json              npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
├── src                       源码目录  
│  ├── main.js                入口js文件
│  ├── router.js              路由
│  ├── store.js               vuex状态
│  ├── app.vue                根组件
│  ├── components             公共组件目录
│  │  └── index.js            把全部组件遍历出来
│  ├── lang                   语言切换字典
│  │  └── index.js            语言切换字典
│  ├── assets                 资源目录，这里的资源会被wabpack构建
│  │  └── css                 css基础重置
│  │  └── data                可视化界面需要的图片
│  │  └── iconfont            字体图标
│  │    └── bg.png
│  └── views                  页面目录
│    ├── app                  入口文件
│    └── data                 可视化文件
├── static                    纯静态资源，不会被wabpack构建。
```

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
