import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-xl mb-8">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 block">
        {post.category} • {post.date}
      </span>
      <h3 className="text-2xl font-bold text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="text-on-surface-variant line-clamp-3 mb-6">{post.excerpt}</p>
      <Link 
        to={`/blog/${post.id}`}
        className="text-primary-container font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
      >
        Read Insight <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </div>
  )
}

export default BlogCard