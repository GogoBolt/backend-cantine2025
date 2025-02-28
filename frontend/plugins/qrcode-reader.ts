import { defineNuxtPlugin } from '#imports'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default defineNuxtPlugin((nuxtApp: { vueApp: { component: (arg0: string, arg1: any) => void } }) => {
  nuxtApp.vueApp.component('QrcodeStream', QrcodeStream)
  nuxtApp.vueApp.component('QrcodeDropZone', QrcodeDropZone)
  nuxtApp.vueApp.component('QrcodeCapture', QrcodeCapture)
})
