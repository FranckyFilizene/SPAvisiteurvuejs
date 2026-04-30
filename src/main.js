import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router/index'

createApp(App)
.use(router)
.mount('#app')
