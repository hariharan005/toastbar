import { createApp, h, ref, defineComponent } from "vue";
import "./style.css";

const ToastBar = defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info",
    },
    duration: {
      type: Number,
      default: 5000,
    },
    theme: {
      type: String,
      default: "light-theme",
    },
  },
  setup(props) {
    const visible = ref(true); // Start as true to show initially

    const show = () => {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.duration);
    };

    const close = () => {
      visible.value = false;
    };

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

    return { visible, show, close, getEmoji };
  },
  render() {
    return this.visible
      ? h(
          "div",
          {
            class: ["toast", this.type, this.theme],
          },
          [
            h("span", {
              class: "emoji",
              innerHTML: this.getEmoji(this.type),
            }),
            h(
              "span",
              {
                class: "message",
              },
              ` ${this.message}`
            ),
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

const css = `

`;

const toastPlugin = {
  install(app) {
    // Inject CSS into document head
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);

    // Register ToastBar component globally
    app.component("ToastBar", ToastBar);

    // Register toast service
    app.config.globalProperties.toast = {
      info(message, theme = "light-theme") {
        this.show(message, "info", theme);
      },
      success(message, theme = "light-theme") {
        this.show(message, "success", theme);
      },
      warning(message, theme = "light-theme") {
        this.show(message, "warning", theme);
      },
      error(message, theme = "light-theme") {
        this.show(message, "error", theme);
      },
      show(message, type, theme) {
        const container = document.createElement("div");
        const ToastConstructor = app.component("ToastBar");
        const toastInstance = createApp(ToastConstructor, {
          message,
          type,
          theme,
        });

        toastInstance.mount(container);
        document.body.appendChild(container);

        // Automatically remove toast after a delay
        setTimeout(() => {
          toastInstance.unmount();
          document.body.removeChild(container);
        }, 5000);
      },
    };
  },
};

export default toastPlugin;