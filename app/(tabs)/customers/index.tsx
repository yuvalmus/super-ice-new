import { SafeAreaView } from "@/components/SafeAreaView";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CustomersScreen() {
  const router = useRouter();
  const customers = [
    { id: 1, name: "Customer One" },
    { id: 2, name: "Customer Two" },
    // Add more customers as needed
  ];

  return (
    <SafeAreaView>
      <Text>Noder Customers Screen</Text>
      {customers.map((customer) => (
        <TouchableOpacity
          key={customer.id}
          onPress={() => router.push(`/customers/${customer.id}`)}
        >
          <Text>{customer.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}
