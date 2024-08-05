import { Order, Product, User } from "@prisma/client";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ConfirmEmailProps = {
  order: Order;
  product: Product;
  user: User;
};
export default function ConfirmEmail({
  order,
  product,
  user,
}: ConfirmEmailProps) {
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
                  <Text>{product.title}</Text>
                </Column>
                <Column>
                  <Text>Price</Text>
                  <Text>{product.pricePaidInCents}</Text>
                </Column>
                <Column>
                  <Text>Date</Text>
                  <Text>
                    {order.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
