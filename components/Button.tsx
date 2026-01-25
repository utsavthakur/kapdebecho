import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-maroon-900 text-white hover:bg-maroon-800 focus:ring-maroon-900 shadow-md",
    secondary: "bg-gold-600 text-white hover:bg-gold-500 focus:ring-gold-600 shadow-md",
    outline: "border-2 border-maroon-900 text-maroon-900 hover:bg-maroon-50 focus:ring-maroon-900",
    ghost: "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;