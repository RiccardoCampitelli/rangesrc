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

declare module 'browser-monads' {
  const window: Window & typeof globalThis
  export { window }
}

declare module 'gatsby-plugin-mailchimp' {
  import * as React from 'react'

  type MailchimpResult = 'success' | 'error'

  export interface MailchimpResponse {
    result: MailchimpResult
    msg: string
  }

  export interface MailchimpFields {
    [key: string]: string
  }

  function addToMailchimp(
    email: string,
    listFields?: MailchimpFields
  ): Promise<MailchimpResponse>
  export default addToMailchimp
}
