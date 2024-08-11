// Import necessary functions and components from the Vue.js library
import { createApp, h, ref, defineComponent } from "vue";

// Import the css file to style the application
import "./style.css";

// Define the ToastBar component
const ToastBar = defineComponent({

  // Define the props that can be passed to the ToastBar component
  props: {
    // `message` prop: the text displayed in the toast, required and must be a string
    message: {
      type: String,
      required: true,
    },
    // `type` prop: the type of toast (e.g., info, success, warning, error), default is "info"
    type: {
      type: String,
      default: "info",
    },
    // `duration` prop: how long the toast should be visible (in milliseconds), default is 5000ms (5 seconds)
    duration: {
      type: Number,
      default: 5000,
    },
    // `theme` prop: the visual theme of the toast (e.g., light-theme, dark-theme), default is "light-theme"
    theme: {
      type: String,
      default: "light-theme",
    },
  },
  // The setup function is part of Vue's Composition API and is used to define reactive state and functions
  setup(props) {
    // `visible` is a reactive reference that controls whether the toast is visible or not
    const visible = ref(true); // Start as true to show initially

    // Function to show the toast and hide it after the duration specified
    const show = () => {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    };

    // Function to close the toast immediately when the close button is clicked
    const close = () => {
      visible.value = false;
    };

    // Function to get the appropriate emoji or icon based on the type of toast
    const getEmoji = (type) => {
      switch (type) {
        case "info":
          return `<div class="icon info-icon">i</div>`;
        case "success":
          return `<div class="icon success-icon">✔</div>`;
        case "warning":
          return `<div class="icon warning-icon">!</div>`;
        case "error":
          return `<div class="icon error-icon">✖</div>`;
        default:
          return "";
      }
    };

    // Return the reactive state and functions to be used in the template or render function
    return { visible, show, close, getEmoji };
  },

  // The render function is used to programmatically create the component's template
  render() {
    // Check if the toast is visible; if not, return null (i.e., render nothing)
    return this.visible
      ? h(
          "div", // The root element of the toast, with classes for type and theme
          {
            class: ["toast", this.type, this.theme],
          },
          [
            // Render the emoji/icon for the toast type
            h("span", {
              class: "emoji",
              innerHTML: this.getEmoji(this.type),
            }),
            // Render the message text of the toast
            h(
              "span",
              {
                class: "message",
              },
              ` ${this.message}`
            ),
            // Render the close button with a click event listener to close the toast
            h(
              "button",
              {
                class: ["close-button", this.theme],
                onClick: this.close,
              },
              "✖"
            ),
          ]
        )
      : null;
  },
});

// CSS variable to hold custom styles; this can be modified to include any required styles
const css = `

`;

// Define the `toastPlugin` object that will be used to install the toast service globally in a Vue application
const toastPlugin = {
  install(app) {
    // Inject the CSS styles into the document's head to ensure they are applied
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);

    // Register ToastBar component globally so it can be used anywhere in the app
    app.component("ToastBar", ToastBar);

    // Register toast service globally, providing methods to show different types of toasts
    app.config.globalProperties.toast = {
      // Method to show an info toast
      info(message, theme = "light-theme") {
        this.show(message, "info", theme);
      },
      // Method to show an success toast
      success(message, theme = "light-theme") {
        this.show(message, "success", theme);
      },
      // Method to show an warning toast
      warning(message, theme = "light-theme") {
        this.show(message, "warning", theme);
      },
      // Method to show an error toast
      error(message, theme = "light-theme") {
        this.show(message, "error", theme);
      },
      // General method to show a toast of any type
      show(message, type, theme) {
        // Create a new `div` element to contain the toast
        const container = document.createElement("div");
        // Get the ToastBar component constructor
        const ToastConstructor = app.component("ToastBar");
        // Create a new instance of the ToastBar component with the specified props
        const toastInstance = createApp(ToastConstructor, {
          message,
          type,
          theme,
        });

        // Mount the toast instance to the container  `div`
        toastInstance.mount(container);
        // Append the container to the body of the document
        document.body.appendChild(container);

        // Automatically remove toast after the specified duration (default is 5000ms) 
        setTimeout(() => {
          toastInstance.unmount();
          document.body.removeChild(container);
        }, 5000);
      },
    };
  },
};

// Export the `toastPlugin` as the default export so it can be imported and used in other parts of the application
export default toastPlugin;