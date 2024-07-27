# vue3-toastbar

vue3-toastbar is a Vue 3 plugin for displaying toast notifications. It provides a simple way to show success, warning, and error messages in your Vue applications.

## Features

* Success, Warning, and Error Toasts: Easily display different types of messages.
* Customizable: Style your toasts with CSS.
* Easy Integration: Simple setup with Vue 3.

## Installation

To install vue3-toastbar, you need to have npm or yarn installed. Then, you can use one of the following commands:

``` npm install toastbar ```


### Usage Setup

1. Import and use the plugin in your main.js or main.ts file:
``` // main.js
import { createApp } from 'vue';
import App from './App.vue';
import toastPlugin from 'toastbar'; // Import the plugin

const app = createApp(App);
app.use(toastPlugin); // Use the plugin
app.mount('#app');

```
2. Include the ToastBar component in your App.vue file (optional):
```
<!-- App.vue -->
<template>
  <div id="app">
    <ToastBar />
    <router-view />
  </div>
</template>

<script>
import ToastBar from '../src/components/exampleComponent.vue';

export default {
  components: {
    ToastBar
  }
};
</script>

```
3. Use the toast() method to display a toast notification:
    You can now use the toast service in any Vue component. Here’s an example:
```
<!-- src/components/exampleComponent.vue -->
<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showWarning">Show Warning</button>
    <button @click="showError">Show Error</button>
  </div>
</template>

<script>
export default {
  methods: {
    showSuccess() {
      this.toast.success('Operation successful!');
    },
    showWarning() {
      this.toast.warning('This is a warning!');
    },
    showError() {
      this.toast.error('An error occurred!');
    }
  }
};
</script>
```

## API Reference

### Toast Service Methods

  * success(message: string);
    - Displays a success toast with the provided message.
  * warning(message: string);
    - Displays a warning toast with the provided message.
  * error(message: string);
    - Displays an error toast with the provided message.

### Props for ToastBar Component

  * message: String
    - The message to be displayed in the toast.
  * type: String
    - The type of toast (success, warning, error). 
  * Defaults to success.

# License

vue3-toastbar is licensed under the [MIT License](https://github.com/hariharan005/vue3-toastbar/blob/main/LICENSE)