"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSearchParams } from "next/navigation";
import React from "react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return <div>You payed ${convertToSubcurrency(Number(amount))}</div>;
};

export default PaymentSuccess;
