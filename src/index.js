// Import necessary functions and components from the Vue.js library
import { createApp, h, ref, defineComponent } from "vue";

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
const css = `@keyframes fadeInRight {
  /* Keyframe animation for toast notifications */
  from {
    opacity: 0; /* Start fully transparent */
    transform: translateX(100%); /* Start off-screen to the right */
  }
  to {
    opacity: 1; /* End fully visible */
    transform: translateX(0); /* End in original position */
  }
}

.toast {
  /* General styles for toast notifications */
  position: fixed; /* Fixed position on the screen */
  height: 50px; /* Set the height of the toast */
  width: 320px; /* Set the width of the toast */
  top: 20px; /* Position 20px from the top of the viewport */
  right: 20px; /* Position 20px from the right of the viewport */
  padding: 4px; /* Padding inside the toast */
  cursor: pointer; /* Pointer cursor */
  box-sizing: border-box; /* Include padding and border in the element's width and height */
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.5); /* Subtle shadow for depth */
  border-radius: 5px; /* Rounded corners */
  color: rgb(45, 45, 45); /* Default text color */
  font-size: 16px; /* Base font size for the toast */
  display: flex; /* Flexbox layout for aligning content */
  align-items: center; /* Center content vertically */
  font-family: "Poppins", Helvetica, sans-serif; /* Font stack for the toast */
  animation-duration: 0.5s; /* Duration of the fade-in animation */
  animation-name: fadeInRight; /* Apply the fade-in animation */
  transform: translate3d(0, 0, 9999px); /* Ensure the toast stays on top */
  z-index: 9999; /* Ensure the toast appears above other content */
}

.toast .emoji {
  /* Styles for the emoji/icon within the toast */
  position: absolute; /* Position relative to the toast container */
  left: 10px; /* Position 10px from the left edge of the toast */
}

.toast .message {
  /* Styles for the message text within the toast */
  position: relative; /* Position relative to the nearest positioned ancestor */
  top: 2px; /* Slight offset from the top */
  left: 40px; /* Position 40px from the left to make room for the emoji */
  text-align: justify; /* Justify the text */
  text-justify: auto; /* Automatic text justification */
  max-width: 230px; /* Maximum width of the text container */
  max-height: auto; /* Allow height to adjust automatically */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide any text that overflows */
}

.toast.info,
.toast.success,
.toast.warning,
.toast.error {
  /* Base background color for different toast types */
  background-color: white; /* Default background color */
}

.toast.light-theme {
  /* Light theme styles for the toast */
  background-color: white; /* White background for light theme */
  color: rgba(45, 45, 45); /* Dark text color for light theme */
}

.toast.dark-theme {
  /* Dark theme styles for the toast */
  background-color: #333; /* Dark background for dark theme */
  color: white; /* Light text color for dark theme */
}

.icon {
  /* Styles for the icon inside the toast */
  display: flex; /* Flexbox layout */
  flex-shrink: 0; /* Prevent the icon from shrinking */
  justify-content: center; /* Center icon horizontally */
  align-items: center; /* Center icon vertically */
  width: 25px; /* Set the width of the icon */
  height: 25px; /* Set the height of the icon */
  color: white; /* Default icon color */
  border-radius: 50%; /* Make the icon circular */
  font-size: 24px; /* Set the font size for the icon */
  font-weight: bold; /* Bold font weight for the icon */
  font-family: Arial, sans-serif; /* Font family for the icon */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s, transform 0.3s; /* Smooth transitions for background color and scale */
}

.info-icon {
  /* Background color for info icon */
  background-color: #3498db; /* Blue for info */
}

.success-icon {
  /* Background color for success icon */
  background-color: #2ecc71; /* Green for success */
}

.warning-icon {
  /* Background color for warning icon */
  background-color: #f39c12; /* Orange for warning */
}

.error-icon {
  /* Background color for error icon */
  background-color: #e74c3c; /* Red for error */
}

.close-button {
  /* Styles for the close button inside the toast */
  position: absolute; /* Position relative to the toast container */
  top: 0; /* Position at the top */
  right: 10px; /* Position 10px from the right */
  border: none; /* Remove default border */
  background: none; /* Remove background color */
  font-size: 16px; /* Set font size */
  cursor: pointer; /* Pointer cursor on hover */
  display: flex; /* Flexbox layout */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  padding: 5px; /* Padding for click area */
}

.close-button.light-theme {
  /* Light theme color for close button */
  color: rgba(45, 45, 45); /* Dark color for light theme */
}

.close-button.dark-theme {
  /* Dark theme color for close button */
  color: #fff; /* Light color for dark theme */
}
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
