import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blogs'
import BlogCard from '../ui/BlogCard'

const BlogSection = () => {
  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-2xl">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-extrabold text-on-surface">Curative Insights</h2>
          <Link to="/blog" className="text-primary font-bold">View All Articles →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection