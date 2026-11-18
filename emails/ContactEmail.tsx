import { Html, Head, Body, Container, Text, Heading, Hr, Section, Row, Column, Link } from "@react-email/components";
import { TOPIC_LABEL, type ContactTopicParam } from "../lib/contactTopics";

export type ContactEmailContext = {
  location: string;
  pagePath: string;
  referrer: string;
  landing: string;
};

type ContactEmailProps = {
  email: string;
  message: string;
  context: ContactEmailContext;
  topic?: ContactTopicParam;
  name?: string;
  url?: string;
};

const SITE = "https://www.setproduct.com";

function DetailRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <Row>
      <Column style={{ width: "140px", verticalAlign: "top" }}>
        <Text style={{ fontSize: "13px", color: "#6b6b6b", margin: "4px 0" }}>{label}</Text>
      </Column>
      <Column style={{ verticalAlign: "top" }}>
        <Text style={{ fontSize: "13px", color: "#19181b", margin: "4px 0", wordBreak: "break-all" }}>
          {value && href ? (
            <Link href={href} style={{ color: "#7c4dff" }}>
              {value}
            </Link>
          ) : (
            value || "not available"
          )}
        </Text>
      </Column>
    </Row>
  );
}

export default function ContactEmail({ email, message, context, topic = "none", name = "", url = "" }: ContactEmailProps) {
  const toUrl = (path: string) => (path ? `${SITE}${path}` : "");
  const topicLabel = topic === "none" ? "Not selected" : TOPIC_LABEL[topic];

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <Heading style={{ color: "#19181b", fontSize: "22px" }}>New message from the contact form</Heading>
          <Text style={{ fontSize: "14px", color: "#6b6b6b" }}>
            Reply to this email to answer {email} directly.
          </Text>
          <Hr />
          <Section>
            <DetailRow label="Topic" value={topicLabel} />
            <DetailRow label="From" value={email} />
            {name ? <DetailRow label="Name" value={name} /> : null}
            {url ? <DetailRow label="Website" value={url} href={url} /> : null}
          </Section>
          <Text style={{ fontSize: "16px", marginBottom: "4px" }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap", marginTop: 0 }}>{message}</Text>
          <Hr />
          <Text style={{ fontSize: "14px", marginBottom: "4px" }}>
            <strong>Where it came from</strong>
          </Text>
          <Section>
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
