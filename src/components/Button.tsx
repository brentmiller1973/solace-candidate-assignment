import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  children,
  ...props 
}) => {
  const baseClasses = variant === 'link' 
    ? 'font-body font-bold text-center cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
    : 'font-body font-bold text-center cursor-pointer rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-gold-light focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'text-neutral-black bg-accent-gold bg-gradient-primary hover:bg-gradient-primary-hover hover:translate-y-[-4px] shadow-primary hover:shadow-primary-hover',
    secondary: 'text-neutral-black bg-neutral-white border border-neutral-grey hover:bg-neutral-grey hover:text-neutral-black transition-colors duration-300',
    link: 'text-primary bg-transparent !border-0 hover:text-accent-gold hover:underline shadow-none'
  };

  const sizeClasses = variant === 'link' 
    ? {
        sm: 'px-1 py-1 text-sm',
        md: 'px-2 py-1 text-[1rem] leading-[150%]',
        lg: 'px-2 py-1 text-lg'
      }
    : {
        sm: 'px-5 py-2 text-sm',
        md: 'px-[4.5rem] py-4 text-[1.1rem] leading-[150%]',
        lg: 'px-[5.75rem] py-4 text-xl'
      };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};
