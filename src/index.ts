declare module 'toastPlugin' {
    import { App } from 'vue';
  
    export interface ToastBarProps {
      message: string;
      type?: 'info' | 'success' | 'warning' | 'error';
      duration?: number;
      theme?: 'light-theme' | 'dark-theme';
    }
  
    export interface ToastService {
      info(message: string, theme?: 'light-theme' | 'dark-theme'): void;
      success(message: string, theme?: 'light-theme' | 'dark-theme'): void;
      warning(message: string, theme?: 'light-theme' | 'dark-theme'): void;
      error(message: string, theme?: 'light-theme' | 'dark-theme'): void;
      show(message: string, type: 'info' | 'success' | 'warning' | 'error', theme?: 'light-theme' | 'dark-theme'): void;
    }
  
    const toastPlugin: {
      install(app: App): void;
    };
  
    export default toastPlugin;
  }
  