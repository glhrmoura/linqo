import { LanguageSelector } from './language-selector';
import { cn } from '@/lib/utils';

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn('w-full', className)} {...props}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-linqo-green/30 group-hover:bg-linqo-green/10">
            <img
              src="/assets/logo.png"
              alt="Linqo"
              className="h-5 w-5 object-contain"
            />
          </span>
          <span className="text-sm font-semibold tracking-tight text-dark-text">
            Linqo
          </span>
        </a>
        <LanguageSelector />
      </div>
    </header>
  );
}
