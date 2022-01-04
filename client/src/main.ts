import { createApp } from 'vue'

// Method
import "/src/config/api"
import router from './router'

// Components
import App from './App.vue'

// Style
import "./style/index.scss"


createApp(App).use(router).mount('#app')
