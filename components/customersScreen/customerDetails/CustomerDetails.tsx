import { StyleSheet } from "react-native";
import React from "react";
import MainInfo from "./mainInfo/MainInfo";
import CustomerAttributes from "./attributes/CustomerAttributes";
import CustomerOrders from "./orders/CustomerOrders";
import TopCustomerSection from "./topSection/TopCustomerSection";

const CustomerDetails = () => {
  return (
    <>
      <TopCustomerSection />
      <MainInfo />
      <CustomerAttributes />
      <CustomerOrders />
    </>
  );
};

export default CustomerDetails;
