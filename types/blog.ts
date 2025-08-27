export interface BlogPost {
  title: string
  slug: string
  metaDesc: string
  hero_image: string
  status: "draft" | "published"
  h1_title: string
  h3_intro_title: string
  introduction: string
  table_of_contents: string
  main_modules: string
  conclusion: string
  links_section: string
  faq_section: string
  created_at: string
  author: string
  category: string
  tags: string
}

export interface LightweightBlogPost {
  title: string
  slug: string
  metaDesc: string
  hero_image: string
  status: "draft" | "published"
  h1_title: string
  created_at: string
  author: string
  category: string
  tags: string
}

export interface PaginatedPosts {
  posts: LightweightBlogPost[]
  totalPosts: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
