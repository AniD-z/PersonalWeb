import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getBlogPost } from "@/lib/sheets"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BlogContent } from "@/components/blog-content"

interface PreviewPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  return {
    title: `Preview: ${post?.h1_title || post?.title || "Blog Post"}`,
    robots: "noindex, nofollow",
  }
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { slug } = await params
  const urlParams = await searchParams
  const providedKey = urlParams.key as string

  // Security check
  if (providedKey !== process.env.ADMIN_SECRET_KEY) {
    redirect("/404")
  }

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Preview Header */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-yellow-800">Preview Mode</h2>
            <p className="text-sm text-yellow-700">
              This is a preview of your blog post. It's not visible to the public.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/secret-admin-panel-xyz123?key=${providedKey}`}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Admin
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Content Preview */}
      <article>
        <BlogContent post={post} />
      </article>
    </div>
  )
}
