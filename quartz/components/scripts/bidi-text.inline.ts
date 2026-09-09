const bidiBlockSelector = [
  "article p",
  "article li",
  "article h1",
  "article h2",
  "article h3",
  "article h4",
  "article h5",
  "article h6",
  "article blockquote",
  "article td",
  "article th",
  "article figcaption",
  "article dd",
  "article dt",
].join(",")

const excludedBidiSelector = "pre, code, kbd, samp, .katex, .katex-display, .mermaid"
const arabicCharacter =
  /[\u0600-\u06ff\u0750-\u077f\u0870-\u089f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff\u{10e60}-\u{10e7f}\u{1ee00}-\u{1eeff}]/u
const ltrCharacter = /[A-Za-z\u00c0-\u02af\u0370-\u052f]/u

function firstStrongDirection(text: string): "ltr" | "rtl" | undefined {
  for (const character of text) {
    if (arabicCharacter.test(character)) return "rtl"
    if (ltrCharacter.test(character)) return "ltr"
  }

  return undefined
}

function hasArabicLanguage(element: HTMLElement): boolean {
  const languageRoot = element.closest<HTMLElement>("[lang]")
  return languageRoot?.lang.toLowerCase().split("-")[0] === "ar"
}

function updateBidiBlocks() {
  const blocks = document.querySelectorAll<HTMLElement>(bidiBlockSelector)

  for (const block of blocks) {
    if (block.closest(excludedBidiSelector)) continue

    const automaticDirection = block.dataset.autoDirection
    if (automaticDirection) {
      block.removeAttribute("dir")
      delete block.dataset.autoDirection
    }

    const explicitDirection = block.getAttribute("dir")
    const direction =
      explicitDirection === "rtl" || hasArabicLanguage(block)
        ? "rtl"
        : explicitDirection === "ltr"
          ? "ltr"
          : firstStrongDirection(block.textContent ?? "")

    block.classList.toggle("is-rtl-block", direction === "rtl")

    if (!explicitDirection && direction) {
      block.dir = direction
      block.dataset.autoDirection = direction
    }
  }
}

document.addEventListener("nav", updateBidiBlocks)
document.addEventListener("render", updateBidiBlocks)
updateBidiBlocks()
