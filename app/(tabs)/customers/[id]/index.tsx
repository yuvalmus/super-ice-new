import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useCustomer } from "../_layout";
import { Customer } from "@/models/Customer";
import { customers } from "@/mock/customers";
import CustomerDetails from "@/components/customersScreen/customerDetails/CustomerDetails";

export default function CustomerScreen() {
  const { setCustomerDetails } = useCustomer();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const fetchCustomerDetails = (): Customer | null => {
    const customer: Customer | null =
      customers.find((customer) => customer.businessNumber === Number(id)) ??
      null;

    return customer;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = fetchCustomerDetails();
      setCustomerDetails(data);
    };
    fetchData();
  }, [id]);

  return (
    <ScreenWrapper>
      <CustomerDetails />
      <TouchableOpacity onPress={() => router.push(`/customers/${id}/edit`)}>
        <Text>Edit here</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
