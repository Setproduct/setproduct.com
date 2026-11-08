"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import ContactModal from "./ContactModal";
import { trackContactCta, type ContactLocation } from "../../lib/contact";

type ContactModalContextType = {
  /**
   * Opens the contact modal. Pass the entry point so the funnel can be split
   * by `location` in GA4. Omitting it falls back to "unknown", which makes a
   * forgotten call site visible in reports instead of silently merging.
   */
  openContactModal: (location?: ContactLocation) => void;
};

const ContactModalContext = createContext<ContactModalContextType | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<ContactLocation>("unknown");

  // Both the GA4 click event and the modal state live here: any new entry point
  // only has to pass its location, and cannot forget to instrument the click.
  const openContactModal = useCallback((next?: ContactLocation) => {
    const resolved = next ?? "unknown";
    setLocation(resolved);
    setIsOpen(true);
    trackContactCta(resolved);
  }, []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} location={location} />
    </ContactModalContext.Provider>
  );
}
