'use client';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl";
  
  const variantClasses = variant === 'primary' 
    ? "text-white" 
    : "bg-white hover:bg-white";
  
  const gradientStyle = variant === 'primary'
    ? { background: 'linear-gradient(90deg, #8b5cf6, #a855f7)' }
    : { color: '#8b5cf6' };

  return (
    <a 
      href={href} 
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={gradientStyle}
    >
      {children}
    </a>
  );
}
