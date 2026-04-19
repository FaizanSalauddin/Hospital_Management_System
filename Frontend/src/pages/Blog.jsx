import { blogPosts } from '../data/blogs'
import BlogCard from '../components/ui/BlogCard'

const Blog = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-on-surface mb-6">Curative Insights</h1>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto">
            Latest news, research, and updates from The Clinical Curative
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog