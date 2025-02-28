declare module 'vue-qrcode-reader' {
  import { Component } from 'vue'

  export interface QrcodeStreamProps {
    camera?: string
    torch?: boolean
    track?: boolean
    constraints?: MediaTrackConstraints
  }

  export interface QrcodeDropZoneProps {
    worker?: Worker
  }

  export interface QrcodeDropZoneResult {
    content: string
    location: {
      topLeftCorner: { x: number; y: number }
      topRightCorner: { x: number; y: number }
      bottomLeftCorner: { x: number; y: number }
      bottomRightCorner: { x: number; y: number }
    }
  }

  export interface QrcodeStreamResult extends QrcodeDropZoneResult {}

  export const QrcodeStream: Component<QrcodeStreamProps>
  export const QrcodeDropZone: Component<QrcodeDropZoneProps>
  export const QrcodeCapture: Component
}
