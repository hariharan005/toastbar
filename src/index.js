import { createApp, h, ref, defineComponent } from 'vue';

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
    }
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
        case 'info':
          return `<div class="icon info-icon">i</div>`;
        case 'success':
          return `<div class="icon success-icon">✔</div>`;
        case 'warning':
          return `<div class="icon warning-icon">!</div>`;
        case 'error':
          return `<div class="icon error-icon">✖</div>`;
        default:
          return '';
      }
    };

    return { visible, show, close, getEmoji };
  },
  render() {
    return this.visible
      ? h(
          'div',
          {
            class: ['toast', this.type, this.theme],
          },
          [
            h('span', {
              class: 'emoji',
              innerHTML: this.getEmoji(this.type),
            }),
            h('span', {
              class: 'message',
            }, ` ${this.message}`),
            h('button', {
              class: [ 'close-button', this.theme ],
              onClick: this.close,
            }, '✖')
          ]
        )
      : null;
  },
});

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
  height: 50px;
  width: 320px;
  top: 20px;
  right: 20px;
  padding: 4px;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);
  border-radius: 5px;
  color: rgb(45, 45, 45);
  font-size: 16px;
  display: flex;
  align-items: center;
  font-family: "Poppins", Helvetica, sans-serif;
  animation-duration: 0.5s;
  animation-name: fadeInRight;
  transform: translate3d(0, 0, 9999px);
  z-index: 9999;
}

.toast .emoji {
  position: absolute;
  left: 10px;

}
.toast .message{
  position: relative;
  top: 2px;
  left: 40px;
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

.icon {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 50%;
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.info-icon {
  background-color: #3498db;
}

.success-icon {
  background-color: #2ecc71;
}

.warning-icon {
  background-color: #f39c12;
}

.error-icon {
  background-color: #e74c3c;
}

.close-button {
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center; /* center the content vertically */
  justify-content: center; /* center the content horizontally */
  padding: 5px; /* adjust padding as needed */
}

.close-button.light-theme {
  color: rgba(45, 45, 45);
}

.close-button.dark-theme {
  color: #fff;
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
