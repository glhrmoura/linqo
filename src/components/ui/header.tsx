import { LanguageSelector } from './language-selector';

export function Header() {
  return (
    <header className="w-full border-b border-dark-bg-tertiary">
      <div className="mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="WhatsApp Direct Message Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-dark-text font-semibold">WhatsApp DM</span>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
} 