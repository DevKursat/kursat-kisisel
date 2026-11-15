import BlogArchiveClient from "@/components/BlogArchiveClient";
import { getBlogPostSummaries } from "@/data/blogPosts";

export default function BlogArchivePage() {
  const posts = getBlogPostSummaries();
  return <BlogArchiveClient posts={posts} />;
}
