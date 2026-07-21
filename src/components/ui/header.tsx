import { LanguageSelector } from './language-selector';
import { cn } from '@/lib/utils';

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn('w-full border-b border-dark-bg-tertiary', className)} {...props}>
      <div className="mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo.png" 
            alt="Linqo Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-dark-text font-semibold">Linqo</span>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
} 