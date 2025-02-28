declare module 'vue3-toastify' {
  import { Plugin } from 'vue'

  export interface ToastOptions {
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
    autoClose?: number | false
    hideProgressBar?: boolean
    closeOnClick?: boolean
    pauseOnHover?: boolean
    draggable?: boolean
    theme?: 'light' | 'dark' | 'colored'
    [key: string]: any
  }

  export interface Toast {
    id: string
    content: any
    options: ToastOptions
  }

  export interface ToastContainerProps extends ToastOptions {
    containerId?: string | number
  }

  export function toast(content: any, options?: ToastOptions): string
  export namespace toast {
    export function success(content: any, options?: ToastOptions): string
    export function error(content: any, options?: ToastOptions): string
    export function info(content: any, options?: ToastOptions): string
    export function warning(content: any, options?: ToastOptions): string
    export function loading(content: any, options?: ToastOptions): string
    export function dark(content: any, options?: ToastOptions): string
  }
  export function updateToast(toastId: string, options: ToastOptions): void
  export function dismissToast(toastId: string): void
  export function clearToasts(): void
  
  export const ToastContainer: any
  
  const plugin: Plugin
  export default plugin
}
