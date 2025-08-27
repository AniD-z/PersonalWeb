import Link from 'next/link'

interface BreadcrumbsProps {
  items: Array<{
    label: string
    href?: string
  }>
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        ...(item.href && { "item": item.href }),
      })),
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />
      
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 lg:mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-emerald-400 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="text-foreground font-medium" itemProp="name">{item.label}</span>
              )}
              <meta itemProp="position" content={(index + 1).toString()} />
              {index < items.length - 1 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
