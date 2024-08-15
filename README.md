# Toastbar
![](https://github.com/hariharan005/toastbar/blob/main/src/assets/toastbar.gif)

![](https://github.com/hariharan005/toastbar/blob/main/src/assets/toastbardark.gif)


Toastbar is a plugin for displaying toast notifications. It provides a simple way to show info, success, warning, and error messages in your Web applications.

## Features

* Info, Success, Warning, and Error Toasts: 
  - Easily display different types of messages.
* Easy Integration: 
  - Simple setup with Vue 3.
* Themes: 
  - By default its light theme and can be changed to dark if need.

## Installation

To install toastbar, you need to have npm installed. Then, you can use one of the following commands:

``` npm install toastbar ```


### Usage Setup for Vue3

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
    <button @click="showInfoToast">Show Info Toast</button>
    <button @click="showSuccess">Show Success</button>
    <button @click="showWarning">Show Warning</button>
    <button @click="showError">Show Error</button>
  </div>
</template>

<script>
export default {
  methods: {
    showInfoToast() {
      this.toast.info('This feeds Info!', 'dark-theme'); // This will show in dark theme
    },
    showSuccess() {
      this.toast.success('Operation successful!'); // This is default so white background toast
    },
    showWarning() {
      this.toast.warning('This is a warning!', 'light-theme'); // This will show in light theme
    },
    showError() {
      this.toast.error('An error occurred!'); // This is default so white background toast
    }
  }
};
</script>
```
### Usage Setup for React JS

## Installation

To install toastbar, you need to have npm installed. Then, you can use one of the following commands:

``` npm install toastbar ```

1. Import and use the plugin in your index.js file:

Add the below code in your index.js 

```
import toastPlugin from 'toastbar';
import { createApp } from 'vue';

// Create a Vue app instance and use the toastPlugin
const app = createApp({});
app.use(toastPlugin);

// mount the Vue app to a temperary container
const container = document.createElement('div');
document.body.appendChild(container);
app.mount(container);

// Add the toast function to the global window object for easy access

window.toast = app.config.globalProperties.toast;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); 

```
2. Create your component to use the toast feature

```
import React from 'react';

const ToastComponent = () => {

  const showInfoToast = () => {
    window.toast.info('Info message', 'dark-theme');
  };

  const showSuccessToast = () => {
    window.toast.success('Success message');
  };

  const showWarningToast = () => {
    window.toast.warning('Warning message');
  };

  const showErrorToast = () => {
    window.toast.error('Error message');
  };

  return (
    <div>
      <button onClick={showInfoToast}>Show Info Toast</button>
      <button onClick={showSuccessToast}>Show Success Toast</button>
      <button onClick={showWarningToast}>Show Warning Toast</button>
      <button onClick={showErrorToast}>Show Error Toast</button>
    </div>
  );
};

export default ToastComponent;

```

## API Reference

### Toast Service Methods

  * info(message: string);
    - Displays a info toast with the provided message.
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
  * theme: String
    - The theme of toast (light-theme, dark-theme).

# License

toastbar is licensed under the [MIT License](https://github.com/hariharan005/toastbar/blob/main/LICENSE)