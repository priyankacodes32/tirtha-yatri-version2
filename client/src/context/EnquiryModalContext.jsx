import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EnquiryModalContext = createContext(null);

/**
 * Global open/close state for the single reusable EnquiryModal, so the
 * Navbar CTA, package cards, and package detail pages can all trigger the
 * same modal instance instead of each rendering their own copy.
 */
export function EnquiryModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);

  const openEnquiry = useCallback((prefillData = null) => {
    setPrefill(prefillData);
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
    setPrefill(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, prefill, openEnquiry, closeEnquiry }),
    [isOpen, prefill, openEnquiry, closeEnquiry]
  );

  return <EnquiryModalContext.Provider value={value}>{children}</EnquiryModalContext.Provider>;
}

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  return ctx;
}
