import { Html, Head, Body, Container, Text, Heading, Hr, Section, Row, Column, Link } from "@react-email/components";
import { TOPIC_LABEL, type ContactTopic } from "../lib/contact";

export type ContactEmailContext = {
  location: string;
  pagePath: string;
  referrer: string;
  landing: string;
};

/** Optional fields from the topic form. Empty strings mean "not filled". */
export type ContactLeadFields = {
  topic: ContactTopic;
  name: string;
  url: string;
  product: string;
};

type ContactEmailProps = {
  email: string;
  message: string;
  context: ContactEmailContext;
  fields: ContactLeadFields;
};

const SITE = "https://www.setproduct.com";

/** What the topic means in plain words, printed under the heading. */
const TOPIC_NOTE: Record<ContactTopic, string> = {
  publish: "Wants to publish a guest post or an ad. Answer before they order.",
  product: "Question about a design kit, license or a purchase.",
  other: "General question.",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Row>
      <Column style={{ width: "140px", verticalAlign: "top" }}>
        <Text style={{ fontSize: "13px", color: "#6b6b6b", margin: "4px 0" }}>{label}</Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text style={{ fontSize: "13px", color: "#19181b", margin: "4px 0", wordBreak: "break-all" }}>
          {value || "not available"}
        </Text>
      </Column>
    </Row>
  );
}

export default function ContactEmail({ email, message, context, fields }: ContactEmailProps) {
  const toUrl = (path: string) => (path ? `${SITE}${path}` : "");
  // Only filled optional fields get a row: an empty table reads as a bug.
  const hasDetails = Boolean(fields.name || fields.url || fields.product);

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Heading style={{ color: "#19181b", fontSize: "22px" }}>
            {TOPIC_LABEL[fields.topic]} request from the contact form
          </Heading>
          <Text style={{ fontSize: "14px", color: "#6b6b6b" }}>{TOPIC_NOTE[fields.topic]}</Text>
          <Text style={{ fontSize: "14px", color: "#6b6b6b" }}>
            Reply to this email to answer {email} directly.
          </Text>
          <Hr />
          <Text style={{ fontSize: "16px" }}>
            <strong>From:</strong> {email}
          </Text>
          {hasDetails ? (
            <Section>
              {fields.name ? <DetailRow label="Name" value={fields.name} /> : null}
              {fields.product ? <DetailRow label="Kit" value={fields.product} /> : null}
              {fields.url ? (
                <Row>
                  <Column style={{ width: "140px", verticalAlign: "top" }}>
                    <Text style={{ fontSize: "13px", color: "#6b6b6b", margin: "4px 0" }}>Product or site</Text>
                  </Column>
                  <Column style={{ verticalAlign: "top" }}>
                    <Text style={{ fontSize: "13px", margin: "4px 0", wordBreak: "break-all" }}>
                      <Link href={fields.url} style={{ color: "#7c4dff" }}>
                        {fields.url}
                      </Link>
                    </Text>
                  </Column>
                </Row>
              ) : null}
            </Section>
          ) : null}
          <Text style={{ fontSize: "16px", marginBottom: "4px" }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap", marginTop: 0 }}>{message}</Text>
          <Hr />
          <Text style={{ fontSize: "14px", marginBottom: "4px" }}>
            <strong>Where it came from</strong>
          </Text>
          <Section>
            <DetailRow label="Topic" value={TOPIC_LABEL[fields.topic]} />
            <DetailRow label="Entry point" value={context.location} />
            <DetailRow label="Page" value={toUrl(context.pagePath)} />
            <DetailRow label="First page of visit" value={toUrl(context.landing)} />
            <DetailRow label="Referrer" value={context.referrer} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
