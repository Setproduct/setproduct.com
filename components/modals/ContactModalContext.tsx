"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import ContactModal from "./ContactModal";
import { isContactTopic } from "../../lib/contactTopics";
import {
  rememberLandingPage,
  resolveOpenOptions,
  trackContactCta,
  type ContactLocation,
  type ContactOpenOptions,
} from "../../lib/contact";

type ContactModalContextType = {
  /**
   * Opens the contact modal. Pass the entry point so the funnel can be split
   * by `location` in GA4. Omitting it falls back to "unknown", which makes a
   * forgotten call site visible in reports instead of silently merging.
   * The topic is derived from the location; pass options only to override it.
   */
  openContactModal: (location?: ContactLocation, options?: ContactOpenOptions) => void;
};

const ContactModalContext = createContext<ContactModalContextType | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

type OpenRequest = { location: ContactLocation } & Required<ContactOpenOptions>;

/**
 * `?contact=publish` (or partnership, work, other) opens the dialog on that
 * topic; `?contact` with any other value opens it with no topic. Publishing
 * opens on the offer card: a link from an email or an article has not shown
 * the offer yet.
 */
const URL_PARAM = "contact";

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [request, setRequest] = useState<OpenRequest>({ location: "unknown", topic: null, ask: false });

  // The provider wraps the whole app, so this runs on the first page of the visit.
  useEffect(() => {
    rememberLandingPage();
  }, []);

  // Both the GA4 click event and the modal state live here: any new entry point
  // only has to pass its location, and cannot forget to instrument the click.
  const openContactModal = useCallback((next?: ContactLocation, options?: ContactOpenOptions) => {
    const location = next ?? "unknown";
    const resolved = resolveOpenOptions(location, options);
    setRequest({ location, ...resolved });
    setIsOpen(true);
    trackContactCta(location, resolved.topic ?? "none");
  }, []);

  // Open from the address once the router knows the query, then drop the
  // parameter (shallow, no reload) so a refresh or a shared link of the page
  // does not pop the dialog again.
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query[URL_PARAM];
    if (raw === undefined) return;
    const value = Array.isArray(raw) ? raw[0] : raw;
    const topic = isContactTopic(value) ? value : null;

    // Clean the address first, open after: on phones the dialog pushes its
    // own history entry, and a replace landing after it would overwrite it.
    const { [URL_PARAM]: _removed, ...rest } = router.query;
    void router
      .replace({ pathname: router.pathname, query: rest }, undefined, { shallow: true, scroll: false })
      .finally(() => openContactModal("url_param", { topic, ask: false }));
  }, [router, openContactModal]);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal
        initialAsk={request.ask}
        initialTopic={request.topic}
        isOpen={isOpen}
        location={request.location}
        onClose={() => setIsOpen(false)}
      />
    </ContactModalContext.Provider>
  );
}
