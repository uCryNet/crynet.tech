// Vendors
import { createApp } from 'vue'

// Components
import App from './App.vue'

// Style
import "./style/index.scss"

import "/src/config/api"
import router from './router'
import store from "./store"


createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
