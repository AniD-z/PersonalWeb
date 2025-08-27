import { getAllBlogSlugs } from '@/lib/sheets'

export default async function sitemap() {
  const baseUrl = 'https://anidz.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog pages
  let blogPages: any[] = []
  try {
    const blogSlugs = await getAllBlogSlugs()
    blogPages = blogSlugs.map((slug) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
  }

  return [...staticPages, ...blogPages]
}
