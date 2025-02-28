declare module 'dayjs' {
  import type { Dayjs } from 'dayjs'
  
  const dayjs: (date?: string | number | Date | Dayjs) => Dayjs
  
  export = dayjs
}

declare module 'dayjs/*' {
  import type { PluginFunc } from 'dayjs'
  const plugin: PluginFunc
  export = plugin
}
