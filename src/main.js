// Import the  `createApp` function from the Vue.js library. This function is used to create a new Vue application instance.
import { createApp } from 'vue';

// Import the global stylesheet for the application. This file contains the CSS that will style your app.
import './style.css';

// Import the root Vue component of the application, typically defined in `App.vue`. This component serves as the main entry point for your Vue app.
import App from './App.vue';

// Import a custom plugin (e.g., `toastPlugin`) from a local JavaScript file. This plugin could be used to add additional functionality, like toast notifications, to your Vue app.
import toastPlugin from './index.js';

// Create a new Vue application instance by passing the root component `App` to `createApp`.
const app = createApp(App);

// Use the custom plugin in the Vue application. The `use` method is typically used to install plugins or register global components.
app.use(toastPlugin);

// Mount the Vue application to a DOM element with the ID `#app`. This tells Vue where to render the application in the HTML file.
app.mount('#app');