import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative } from "../../util/path"

/**
 * FeaturedCards Component
 * 
 * Displays a grid of featured notes with images and blur effect on hover
 * Notes must have frontmatter: featured: true
 */
const FeaturedCards: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  // Filter only files marked as featured in frontmatter
  const featuredPages = allFiles.filter((file) => file.frontmatter?.featured)

  return (
    <div className="card-grid">
      {featuredPages.map((page) => {
        const { title, description, image } = page.frontmatter!
        
        // Use CSS variable for background image
        const cardStyle = image ? { "--card-bg": `url(${image})` } : {}

        return (
          <a 
            href={resolveRelative(page.slug!, page.slug!)} 
            className={`card-container ${image ? "has-image" : "no-image"}`} 
            style={cardStyle as React.CSSProperties}
          >
            {/* Background layer with blur effect */}
            <div className="card-bg"></div>
            
            {/* Content layer (always visible) */}
            <div className="card-content">
              <h3>{title}</h3>
              <p>{description as string}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default (() => FeaturedCards) satisfies QuartzComponentConstructor
