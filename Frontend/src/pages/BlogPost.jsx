import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/blogs'

const BlogPost = () => {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))
  
  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-primary mt-4 inline-block">Back to Blog</Link>
      </div>
    )
  }
  
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/blog" className="text-primary mb-8 inline-block">← Back to Blog</Link>
        
        <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
        
        <div className="mb-4">
          <span className="text-sm text-secondary font-bold">{post.category}</span>
          <span className="mx-2">•</span>
          <span className="text-sm text-on-surface-variant">{post.date}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-8">{post.title}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>{post.content}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  )
}

export default BlogPost