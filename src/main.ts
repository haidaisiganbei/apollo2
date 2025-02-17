import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import './styles/index.scss' // 自定义主题色

const app = createApp(App)
app.use(router)
app.mount('#app')