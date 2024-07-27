<template>
    <div>
      <button @click="showSuccessToast">Show Success Toast</button>
      <button @click="showWarningToast">Show Warning Toast</button>
      <button @click="showErrorToast">Show Error Toast</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      showSuccessToast() {
        this.toast.success('Operation successful!');
      },
      showWarningToast() {
        this.toast.warning('This is a warning!');
      },
      showErrorToast() {
        this.toast.error('An error occurred!');
      },
    },
  };
  </script>
  