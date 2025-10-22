import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { htmlToJsx } from "../../util/jsx"
import FeaturedCards from "../custom/FeaturedCards"

/**
 * Modified Index Page
 * 
 * Displays featured cards at the top, followed by regular content
 */
const IndexPage: QuartzComponent = ({ fileData, tree, ...props }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  
  // Initialize FeaturedCards component
  const FeaturedCardsComponent = FeaturedCards()
  
  return (
    <article class={classString}>
      {/* Featured Cards Section */}
      <h1 className="featured-cards-title">🎁 Notes en vedette</h1>
      <FeaturedCardsComponent {...props} fileData={fileData} tree={tree} />
      
      {/* Regular page content */}
      {content}
    </article>
  )
}

export default (() => IndexPage) satisfies QuartzComponentConstructor
