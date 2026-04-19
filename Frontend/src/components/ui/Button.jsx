const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'rounded-full font-bold transition-all hover:scale-95'
  
  const variants = {
    primary: 'bg-gradient-to-br from-primary to-primary-container text-white',
    secondary: 'bg-surface-container-highest text-on-primary-fixed-variant',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10'
  }
  
  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button