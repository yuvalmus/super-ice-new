import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { customers } from "@/mock/customers";

export default function CustomersScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <Text>Noder Customers Screen</Text>
      {customers.map((customer) => (
        <TouchableOpacity
          key={customer.id}
          onPress={() => router.push(`/customers/${customer.id}`)}
        >
          <Text>{customer.name}</Text>
        </TouchableOpacity>
      ))}
    </ScreenWrapper>
  );
}
