import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function ConfirmEmail() {
  return (
    <Html>
      <Preview>Test Button</Preview>
      <Tailwind>
        <Head />
        <Body>
          <Container className="border border-black">
            <Heading>Order Confirmation</Heading>
            <Text>Thank you for buying</Text>
            <Section className="border border-black">
              <Row>
                <Column>
                  <Text>Product</Text>
                  <Text>9.99</Text>
                </Column>
                <Column>
                  <Text>Price</Text>
                  <Text>14.99</Text>
                </Column>
                <Column>
                  <Text>Date</Text>
                  <Text>14.99</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
