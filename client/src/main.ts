import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import "/src/config/api"

createApp(App).use(router).mount('#app')
