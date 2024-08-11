<template>
  <!-- The template section defines the structure of the components UI-->
  <div>
    <!-- Buttons to trigger different toast messages -->
    <!-- When each button is clicked, a method is called to show a specific type of toast -->
    <button @click="showInfoToast">Show Info Toast</button>
    <button @click="showInfoToastlight">Show Info Toast Light</button>
    <button @click="showSuccessToast">Show Success Toast</button>
    <button @click="showWarningToast">Show Warning Toast</button>
    <button @click="showErrorToast">Show Error Toast</button>
  </div>
</template>

<script>
export default {
  // Define methods that can be used in the template or other parts of the component
  methods: {
    // Method to show an info toast with a dark theme
    showInfoToast() {
      this.toast.info('To install vue3-toastbar, you need to have npm or yarn installed. Then, you can use one of the following commands:', 'dark-theme');
    },
    // Method to show an info toast with the default light theme 
    showInfoToastlight() {
      this.toast.info('This feeds Info!');
    },
    // Method to show an success toast 
    showSuccessToast() {
      this.toast.success('Operation successful!');
    },
    // Method to show an warning toast
    showWarningToast() {
      this.toast.warning('This is a warning!');
    },
    // Method to show an error toast
    showErrorToast() {
      this.toast.error('An error occurred!');
    }
  }
}
</script>