"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import ContactModal from "./ContactModal";
import {
  rememberLandingPage,
  topicOfLocation,
  trackContactCta,
  type ContactLocation,
  type ContactOptions,
  type ContactTopic,
} from "../../lib/contact";

type ContactModalContextType = {
  /**
   * Opens the contact modal. Pass the entry point so the funnel can be split
   * by `location` in GA4. Omitting it falls back to "unknown", which makes a
   * forgotten call site visible in reports instead of silently merging.
   *
   * The second argument is optional: `topic` overrides the topic guessed from
   * the location, `product` preselects the kit on a kit page.
   */
  openContactModal: (location?: ContactLocation, options?: ContactOptions) => void;
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
  // null means the topic is unknown: the modal opens on the chips.
  const [topic, setTopic] = useState<ContactTopic | null>(null);
  const [product, setProduct] = useState("");

  // The provider wraps the whole app, so this runs on the first page of the visit.
  useEffect(() => {
    rememberLandingPage();
  }, []);

  // Both the GA4 click event and the modal state live here: any new entry point
  // only has to pass its location, and cannot forget to instrument the click.
  const openContactModal = useCallback((next?: ContactLocation, options?: ContactOptions) => {
    const resolved = next ?? "unknown";
    setLocation(resolved);
    setTopic(options?.topic ?? topicOfLocation(resolved));
    setProduct(options?.product ?? "");
    setIsOpen(true);
    trackContactCta(resolved);
  }, []);

  // setIsOpen is stable, so this callback keeps its identity across renders.
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={onClose}
        location={location}
        initialTopic={topic}
        initialProduct={product}
      />
    </ContactModalContext.Provider>
  );
}
