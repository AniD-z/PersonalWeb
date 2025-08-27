"use server"

import { updatePostStatus } from "./sheets"
import { revalidatePath } from "next/cache"

export async function publishPost(slug: string) {
  try {
    await updatePostStatus(slug, "published")
    revalidatePath("/secret-admin-panel-xyz123")
    revalidatePath("/blogs")
    revalidatePath(`/blogs/${slug}`)

    // Logging disabled for security
    // if (process.env.NODE_ENV === "development") {
    //   console.log(`✅ Published post: ${slug}`)
    // }
  } catch (error) {
    throw new Error("Failed to publish post")
  }
}

export async function unpublishPost(slug: string) {
  try {
    await updatePostStatus(slug, "draft")
    revalidatePath("/secret-admin-panel-xyz123")
    revalidatePath("/blogs")
    revalidatePath(`/blogs/${slug}`)

    // Logging disabled for security
    // if (process.env.NODE_ENV === "development") {
    //   console.log(`✅ Unpublished post: ${slug}`)
    // }
  } catch (error) {
    throw new Error("Failed to unpublish post")
  }
}
