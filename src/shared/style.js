export const DESKTOP_MIN_WIDTH = 960
export const MOBILE_CONTENT_PADDING = 20

export function media(minWidth) {
    return `@media (min-width: ${minWidth}px)`
}