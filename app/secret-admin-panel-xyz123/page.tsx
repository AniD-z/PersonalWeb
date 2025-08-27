import { getAllPosts } from "@/lib/sheets"
import { BlogReviewCard } from "@/components/blog-review-card"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Blog Admin - Review & Publish",
  description: "Review and publish blog posts from Google Sheets",
  robots: "noindex, nofollow", // Hide from search engines
}

export default async function SecretAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Basic security check
  const params = await searchParams
  const providedKey = params.key as string
  
  if (providedKey !== process.env.ADMIN_SECRET_KEY) {
    redirect("/404")
  }

  const posts = await getAllPosts()
  const draftPosts = posts.filter((post) => post.status === "draft")
  const publishedPosts = posts.filter((post) => post.status === "published")

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Administration</h1>
        <p className="text-muted-foreground">Review and publish blog posts from your Google Sheets</p>
        <div className="mt-2 text-sm text-yellow-600">🔒 Secure Admin Panel - Keep this URL private</div>
      </header>

      {/* Draft Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Pending Review ({draftPosts.length})</h2>

        {draftPosts.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No posts pending review</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {draftPosts.map((post) => (
              <BlogReviewCard key={post.slug} post={post} isSecureAdmin={true} />
            ))}
          </div>
        )}
      </section>

      {/* Published Posts Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Published Posts ({publishedPosts.length})</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <BlogReviewCard key={post.slug} post={post} isSecureAdmin={true} />
          ))}
        </div>
      </section>
    </div>
  )
}
