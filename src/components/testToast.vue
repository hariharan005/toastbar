<template>
    <div>
      <button @click="showInfoToast">Show Info Toast</button>
      <button @click="showSuccessToast">Show Success Toast</button>
      <button @click="showWarningToast">Show Warning Toast</button>
      <button @click="showErrorToast">Show Error Toast</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      showInfoToast() {
        this.toast.info('This feeds Info!', 'dark-theme');
      },
      showSuccessToast() {
        this.toast.success('Operation successful!');
      },
      showWarningToast() {
        this.toast.warning('This is a warning!');
      },
      showErrorToast() {
        this.toast.error('An error occurred!');
      }
    }
  }
  </script>
  