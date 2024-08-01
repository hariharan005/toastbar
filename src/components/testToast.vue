<template>
    <div>
      <button @click="showInfoToast">Show Info Toast</button>
      <button @click="showInfoToastlight">Show Info Toast Light</button>
      <button @click="showSuccessToast">Show Success Toast</button>
      <button @click="showWarningToast">Show Warning Toast</button>
      <button @click="showErrorToast">Show Error Toast</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      showInfoToast() {
        this.toast.info('To install vue3-toastbar, you need to have npm or yarn installed. Then, you can use one of the following commands:', 'dark-theme');
      },
      showInfoToastlight() {
        this.toast.info('This feeds Info!');
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
  