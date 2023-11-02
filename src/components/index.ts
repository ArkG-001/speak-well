import { defineAsyncComponent } from "vue";

/**
 * @description 自动注册全局组件
 * @description 在src/components目录下创建文件，即 src/components/xxx.vue
 * @description 在src/components目录下创建目录及文件，即 src/components/xxx文件夹/xxx.vue
 */
const components = import.meta.glob("./**/**.vue");
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(2, key.lastIndexOf("/"));
    app.component(name, defineAsyncComponent(value));
  }
}
