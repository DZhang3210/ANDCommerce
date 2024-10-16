import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileOrderTable from "./ProfileOrdersTable";
import { Tag } from "@prisma/client";
import Feed from "@/app/_components/Feed";

type OrderType = {
  id: string;
  pricePaidInCents: number;
  createdAt: Date;
  product: {
    id: string;
    title: string;
  };
};

type ResultProp = {
  id: string;
  title: string;
  desc: string;
  pricePaidInCents: number;
  discountInPercent: number;
  productImage: string;
  tags: Tag[];
  owner: {
    name: string | null;
    image: string | null;
    id: string | null;
    email: string;
  } | null;
};

type ExtendedSession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
    isAdmin: boolean;
    favorites: ResultProp[]; // Add favorites to the session type
  };
  expires: string;
} | null;

type ProfileManagementProps = {
  orders: OrderType[];
  session: ExtendedSession | null;
  decodedURI: string;
  products: ResultProp[];
  favoriteProducts: ResultProp[];
};

const ProfileManagement = ({
  orders,
  session,
  decodedURI,
  products,
  favoriteProducts,
}: ProfileManagementProps) => {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="text-2xl">
        <TabsTrigger
          value="products"
          className="text-lg sm:text-2xl md:text-3xl rounded-xl"
        >
          Products
        </TabsTrigger>
        <TabsTrigger
          value="favorites"
          className="text-lg sm:text-2xl md:text-3xl rounded-xl"
        >
          Favorites
        </TabsTrigger>
        {decodedURI === session?.user.email && (
          <TabsTrigger
            value="orders"
            className="text-lg sm:text-2xl md:text-3xl rounded-xl"
          >
            Orders
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="products">
        <Feed results={products} session={session} removeUser={true} />
      </TabsContent>
      <TabsContent value="favorites">
        <Feed results={favoriteProducts} session={session} removeUser={true} />
      </TabsContent>
      {decodedURI === session?.user.email && (
        <TabsContent value="orders">
          <div className="mb-10">
            {session && session.user?.email === decodedURI && (
              <>
                {/* <h1 className="text-4xl ml-5 font-semibold">Orders</h1> */}
                {orders.length !== 0 ? (
                  <ProfileOrderTable orders={orders} />
                ) : (
                  <div className="mt-5">You don&apos;t have any orders....</div>
                )}
              </>
            )}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileManagement;
