import { Text } from "react-native";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useCustomer } from "../_layout";

export default function EditCustomerDetails() {
  const { customerDetails, setCustomerDetails } = useCustomer();

  return (
    <SafeAreaView>
      <Text>Edit window</Text>
      <Text>Customer: {customerDetails?.id}</Text>
      <Text>Name: {customerDetails?.name}</Text>
    </SafeAreaView>
  );
}
