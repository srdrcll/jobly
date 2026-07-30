import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS, AUTH_NAV_ITEMS } from '@/constants/navigation';

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const allNavItems = [...MAIN_NAV_ITEMS, ...SECONDARY_NAV_ITEMS, ...AUTH_NAV_ITEMS];

  const getBreadcrumbLabel = (path: string) => {
    const matched = allNavItems.find((item) => item.href === `/${path}`);
    if (matched) return matched.title;
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded-md"
      >
        <Home className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="sr-only">Ana Sayfa</span>
      </Link>

      {pathnames.length > 0 && (
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
      )}

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = getBreadcrumbLabel(value);

        return (
          <React.Fragment key={to}>
            {isLast ? (
              <span className="font-semibold text-foreground bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-md">
                {label}
              </span>
            ) : (
              <>
                <Link
                  to={to}
                  className="hover:text-foreground transition-colors px-1.5 py-0.5 rounded-md"
                >
                  {label}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
