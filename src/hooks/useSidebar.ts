import { useState, useEffect } from 'react';

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('kp-sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('kp-sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return {
    isCollapsed,
    setIsCollapsed,
    isMobileOpen,
    setIsMobileOpen,
    toggleSidebar,
    toggleMobile,
    closeMobile,
  };
}
