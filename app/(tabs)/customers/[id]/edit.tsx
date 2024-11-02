import { Text } from "react-native";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useCustomer } from "../_layout";

export default function EditCustomerDetails() {
  const { customerDetails, setCustomerDetails } = useCustomer();

  return (
    <ScreenWrapper>
      <Text>Edit window</Text>
      <Text>Customer: {customerDetails?.id}</Text>
      <Text>Name: {customerDetails?.name}</Text>
    </ScreenWrapper>
  );
}
