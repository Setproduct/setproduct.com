/**
 * Contact topics: what a person writes to us about.
 *
 * Shared by the modal (chips), the API route (whitelist) and the lead email
 * (subject tag), so this file has no browser-only imports.
 *
 * Kits are being deprecated, so there is deliberately no "question about a
 * kit" topic: buyers of old kits use "Something else".
 */

export const CONTACT_TOPICS = ["publish", "partnership", "work", "other"] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** "none": the person did not pick a topic. Sent to GA4 and the API as is. */
export type ContactTopicParam = ContactTopic | "none";

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (CONTACT_TOPICS as readonly string[]).includes(value);
}

/** Chip labels. Answers to "How can we help?", so they are nouns, not verbs. */
export const TOPIC_LABEL: Record<ContactTopic, string> = {
  publish: "Guest post or ad",
  partnership: "Partnership",
  work: "Design or dev work",
  other: "Something else",
};

/** Tag at the start of the email subject, so the inbox sorts itself. */
export const TOPIC_SUBJECT_TAG: Record<ContactTopicParam, string> = {
  publish: "[Guest post]",
  partnership: "[Partnership]",
  work: "[Design or dev work]",
  other: "[Other]",
  none: "[Contact]",
};
