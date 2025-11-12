import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function BackButton({ 
  label = 'Back', 
  onClick,
  className = '' 
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 px-6 py-4  text-gray-700 cursor-pointer hover:bg-gray-50 transition ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
}