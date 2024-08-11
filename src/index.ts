// Declare a module named 'toastbar'. This allows TypeScript to understand the structure and types when using the 'toastbar' package.
declare module "toastbar" {
  // Import the `App` type from the Vue.js library. The `App` type represents a Vue application instance.
  import { App } from "vue";

  // Define an interface for the properties (`props`) that can be passed to the ToastBar component.
  // This helps ensure that when using the ToastBar component, the correct types and properties are used.
  export interface ToastBarProps {
    // The `message` property is required and must be a string. This is the main text displayed in the toast notification.
    message: string;
    // The `type` property is optional and specifies the type of toast (e.g., info, success, warning, error).
    type?: "info" | "success" | "warning" | "error";
    // The `duration` property is optional and specifies how long the toast should be visible (in milliseconds).
    duration?: number;
    // The `theme` property is optional and specifies the visual theme of the toast (e.g., light-theme, dark-theme).
    theme?: "light-theme" | "dark-theme";
  }

  // Define an interface for the ToastService, which includes methods to display different types of toast notifications.
  // This interface ensures that the correct parameters are passed when calling these methods.
  export interface ToastService {
    // Method to display an info toast with an optional theme.
    info(message: string, theme?: "light-theme" | "dark-theme"): void;

    // Method to display a success toast with an optional theme.
    success(message: string, theme?: "light-theme" | "dark-theme"): void;

    // Method to display a warning toast with an optional theme.
    warning(message: string, theme?: "light-theme" | "dark-theme"): void;

    // Method to display an error toast with an optional theme.
    error(message: string, theme?: "light-theme" | "dark-theme"): void;
    // General method to display a toast of a specified type with an optional theme.
    show(
      message: string,
      type: "info" | "success" | "warning" | "error",
      theme?: "light-theme" | "dark-theme"
    ): void;
  }

  // Define the `toastPlugin` object, which contains an `install` method.
  // The `install` method is a standard way to add plugins to a Vue application.
  const toastPlugin: {
    // The `install` method takes a Vue application instance (`app`) as its argument.
    install(app: App): void;
  };

  // Export the `toastPlugin` as the default export of this module.
  export default toastPlugin;
}
