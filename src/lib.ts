import type { Plugin } from 'vue'
import type {App} from 'vue'
import RmEditor from './components/Index.vue'

// 导出单个组件
export { RmEditor }

// 导出安装函数，用于 Vue.use()
const plugin: Plugin = {
  install(app: App) {
    app.component('RmEditor', RmEditor)
  }
}

export default plugin