'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'rounded';
  height?: string | number;
  width?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className = '',
  variant = 'text',
  height,
  width,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const animationClasses = animation === 'pulse' ? 'animate-pulse' : 
                          animation === 'wave' ? 'animate-shimmer' : '';
  const variantClasses = variant === 'text' ? 'rounded' :
                        variant === 'rectangular' ? '' : 'rounded-lg';

  const style = {
    height: height,
    width: width
  };

  return (
    <div
      className={`${baseClasses} ${animationClasses} ${variantClasses} ${className}`}
      style={style}
    />
  );
}