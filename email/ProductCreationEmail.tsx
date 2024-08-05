// ProductCreationEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Tailwind,
} from "@react-email/components";

type Product = {
  name: string;
  description: string;
  price: number;
};

type ProductCreationEmailProps = {
  product: Product;
};

ProductCreationEmail.PreviewProps = {
  product: {
    name: "David",
    description: "Zhang",
    price: 100,
  },
} satisfies ProductCreationEmailProps;

export default function ProductCreationEmail({
  product,
}: ProductCreationEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>New Product Created: {product.name}</Preview>
        <Body className="bg-gray-100 py-10">
          <Container className="bg-white max-w-lg mx-auto rounded-lg shadow-lg p-6">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              🎉 New Product Created!
            </Heading>
            <Text className="text-lg text-gray-700 mb-6">
              We're excited to announce a new addition to our catalog:
            </Text>

            {/* <Img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-lg mb-6"
            /> */}

            <Heading
              as="h2"
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              {product.name}
            </Heading>

            <Text className="text-base text-gray-600 mb-4">
              {product.description}
            </Text>

            <Text className="text-lg font-medium mb-4">
              Price: ${product.price.toFixed(2)}
            </Text>

            <Text className="text-sm text-gray-500 mt-8">
              Thank you for adding your product!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
