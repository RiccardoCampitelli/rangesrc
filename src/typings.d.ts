interface CSSModule {
  [className: string]: string
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}

declare module 'typography-theme-lawton' {
  import { TypographyOptions } from 'typography'

  const Theme: TypographyOptions

  export = Theme
}
