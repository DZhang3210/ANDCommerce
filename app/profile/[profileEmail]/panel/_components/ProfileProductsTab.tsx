import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type ProductType = {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  product: {
    id: string;
    title: string;
  };
};

type ProfileProductsTableProps = {
  products: ProductType[];
};

const ProfileProductsTable = ({ products }: ProfileProductsTableProps) => {
  return (
    <div className="container">
      <Table>
        <TableCaption>A list of all your orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Title</TableHead>
            <TableHead>Desc</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              id={product.id}
              pricePaidInCents={product.pricePaidInCents}
              createdAt={product.createdAt}
              productName={product.product.title || "(no name)"}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

type ProductRowProps = {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  productName: string;
};

export const ProductRow = ({
  id,
  pricePaidInCents,
  createdAt,
  productName,
}: ProductRowProps) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{pricePaidInCents}</TableCell>
      <TableCell>{createdAt.toLocaleDateString("en-US")}</TableCell>
    </TableRow>
  );
};

export default ProfileProductsTable;
