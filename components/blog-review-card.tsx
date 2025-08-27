"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Globe, Trash2 } from "lucide-react"
import type { BlogPost } from "@/types/blog"
import { publishPost, unpublishPost } from "@/lib/actions"
import { useSearchParams } from "next/navigation"

interface BlogReviewCardProps {
  post: BlogPost
  isSecureAdmin?: boolean
}

export function BlogReviewCard({ post, isSecureAdmin = false }: BlogReviewCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(post.status)
  const searchParams = useSearchParams()
  const secretKey = searchParams.get("key")

  const handlePublish = async () => {
    setIsLoading(true)
    try {
      await publishPost(post.slug)
      setCurrentStatus("published")
    } catch (error) {
      // Don't log sensitive information to console
      alert("Failed to publish post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnpublish = async () => {
    setIsLoading(true)
    try {
      await unpublishPost(post.slug)
      setCurrentStatus("draft")
    } catch (error) {
      // Don't log sensitive information to console
      alert("Failed to unpublish post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const previewUrl = isSecureAdmin
    ? `/secret-admin-panel-xyz123/preview/${post.slug}?key=${secretKey}`
    : `/admin/preview/${post.slug}`

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image src={post.hero_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <Badge variant={currentStatus === "published" ? "default" : "secondary"}>{currentStatus}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.h1_title || post.title}</h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.metaDesc}</p>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            Slug: <code className="bg-muted px-1 rounded">{post.slug}</code>
          </p>
          <p>Author: {post.author}</p>
          <p>Category: {post.category}</p>
          {post.tags && <p>Tags: {post.tags}</p>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={previewUrl}>
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Link>
        </Button>

        {currentStatus === "draft" ? (
          <Button size="sm" onClick={handlePublish} disabled={isLoading}>
            <Globe className="w-4 h-4 mr-1" />
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        ) : (
          <Button variant="destructive" size="sm" onClick={handleUnpublish} disabled={isLoading}>
            <Trash2 className="w-4 h-4 mr-1" />
            {isLoading ? "Unpublishing..." : "Unpublish"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
