// src/vue3-toastbar/index.js
import { createApp, h } from 'vue';

const ToastBar = {
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
    }
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
    getEmoji(type) {
      switch (type) {
        case 'info':
          return `<img src="../src/assets/info.png" alt="info" class="emoji-img"/>`; // Update the image path as needed
        case 'success':
          return `<img src="../src/assets/check.png" alt="success" class="emoji-img"/>`; // Update the image path as needed
        case 'warning':
          return `<img src="../src/assets/warning.png" alt="warning" class="emoji-img"/>`; // Update the image path as needed
        case 'error':
          return `<img src="../src/assets/cross.png" alt="error" class="emoji-img"/>`; // Update the image path as needed
        default:
          return '';
      }
    },
  },
  render() {
    return h(
      'div',
      {
        class: ['toast', this.type, this.theme],
      },
      [
        h('span', {
          class: 'emoji',
          innerHTML: this.getEmoji(this.type),
        }),
        ` ${this.message}`
      ]
    );
  },
};

const css = `
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast {
  position: fixed;
  height: 35px;
  width: 300px;
  top: 20px;
  right: 20px;
  padding: 10px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 5px;
  color: rgb(45, 45, 45);
  font-size: 14px;
  display: flex;
  align-items: center;
  font-family: "Poppins", Helvetica, sans-serif;
  animation-duration: 0.5s;
  animation-name: fadeInRight;
}

.toast .emoji {
  margin-right: 10px;
  border-radius: 50%;
}

.toast .emoji-img {
  width: 20px;
  height: 20px;
}

.toast.info {
  background-color: white;
}

.toast.success {
  background-color: white;
}

.toast.warning {
  background-color: white;
}

.toast.error {
  background-color: white;
}

.toast.light-theme {
  background-color: white;
  color: rgba(45, 45, 45);
}

.toast.dark-theme {
  background-color: #333;
  color: white;
}
`;

const toastPlugin = {
  install(app) {

    // Inject CSS into document head
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);
    
    // Register ToastBar component globally
    app.component('ToastBar', ToastBar);

    // Register toast service
    app.config.globalProperties.toast = {
      info(message, theme = 'light-theme') {
        this.show(message, 'info', theme);
      },
      success(message, theme = 'light-theme') {
        this.show(message, 'success', theme);
      },
      warning(message, theme = 'light-theme') {
        this.show(message, 'warning', theme);
      },
      error(message, theme = 'light-theme') {
        this.show(message, 'error', theme);
      },
      show(message, type, theme) {
        const container = document.createElement('div');
        const ToastConstructor = app.component('ToastBar');
        const toastInstance = createApp(ToastConstructor, { message, type, theme });

        toastInstance.mount(container);
        document.body.appendChild(container);

        // Automatically remove toast after a delay
        setTimeout(() => {
          toastInstance.unmount();
          document.body.removeChild(container);
        }, 5000);
      }
    };
  }
};

export default toastPlugin;
