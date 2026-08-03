import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, History, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export function Header({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isSecondaryPage = pathname === '/history' || pathname === '/config';

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-dark-bg/70 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl',
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-2xl px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <img
                src="/assets/logo.png"
                alt="Linqo"
                className="h-5 w-5 object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xl font-bold text-dark-text">
                {t('title')}
              </span>
              <span className="block truncate text-xs text-dark-text-tertiary">
                {t('subtitle')}
              </span>
            </span>
          </Link>

          {isSecondaryPage ? (
            <Link
              to="/"
              aria-label={t('nav.backHome')}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-dark-text-tertiary transition-colors hover:border-white/20 hover:text-dark-text"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('nav.back')}
            </Link>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/history"
                aria-label={t('nav.history')}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-dark-text-tertiary transition-colors hover:border-white/20 hover:text-dark-text"
              >
                <History className="h-5 w-5" />
              </Link>
              <Link
                to="/config"
                aria-label={t('nav.settings')}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-dark-text-tertiary transition-colors hover:border-white/20 hover:text-dark-text"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
