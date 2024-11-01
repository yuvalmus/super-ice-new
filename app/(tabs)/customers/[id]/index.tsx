import { Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useCustomer } from "../_layout";
import { Customer } from "@/models/Customer";

const customers = [
  { id: 1, name: "Customer One" },
  { id: 2, name: "Customer Two" },
  // Add more customers as needed
];

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
    <SafeAreaView>
      <Text>Customer ID: {customerDetails?.id}</Text>
      <TouchableOpacity onPress={() => router.push(`/customers/${id}/edit`)}>
        <Text>Edit here</Text>
      </TouchableOpacity>
      {/* Render other customer details here */}
    </SafeAreaView>
  );
}
