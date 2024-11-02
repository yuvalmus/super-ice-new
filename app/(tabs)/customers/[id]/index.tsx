import { Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useCustomer } from "../_layout";
import { Customer } from "@/models/Customer";
import { customers } from "@/mock/customers";

export default function CustomerDetails() {
  const { customerDetails, setCustomerDetails } = useCustomer();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const fetchCustomerDetails = (): Customer | null => {
    const customer: Customer | null =
      customers.find((customer) => customer.id === Number(id)) ?? null;

    return customer;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = fetchCustomerDetails(); // Replace with actual fetch function
      setCustomerDetails(data);
    };
    fetchData();
  }, [id]);

  return (
    <ScreenWrapper>
      <Text>Customer ID: {customerDetails?.id}</Text>
      <TouchableOpacity onPress={() => router.push(`/customers/${id}/edit`)}>
        <Text>Edit here</Text>
      </TouchableOpacity>
      {/* Render other customer details here */}
    </ScreenWrapper>
  );
}
