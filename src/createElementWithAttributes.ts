
export function createElementWithAttributes<
  TTag extends keyof HTMLElementTagNameMap | string,
  TElement = TTag extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[ TTag ] : HTMLElement
>(
  tagName: TTag,
  attributes: Record<string, string>,
): TElement {
  const el = document.createElement(tagName) ;
  Object.entries(attributes).forEach(
    ([name, value]) => el.setAttribute(name, value)
  )
  return el as TElement;
}