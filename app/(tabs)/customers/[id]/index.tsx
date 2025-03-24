import { TouchableOpacity, View, BackHandler } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useCustomer } from "../_layout";
import { Customer } from "@/models/Customer";
import { customers } from "@/mock/customers";
import CustomerDetails from "@/components/customersScreen/customerDetails/CustomerDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomerScreen() {
  const { setCustomerDetails } = useCustomer();
  const { id, fromOrder, orderId } = useLocalSearchParams();
  const router = useRouter();

  const handleBack = () => {
    if (fromOrder === "true" && orderId) {
      // First navigate to the customers tab to reset the navigation state
      router.replace("/(tabs)/customers");
      // Then navigate to the order screen
      router.push({
        pathname: "/(tabs)/orders/[id]",
        params: { id: String(orderId) },
      });
    } else {
      router.push("/(tabs)/customers");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true; // Prevent default back behavior
      }
    );

    return () => backHandler.remove();
  }, [fromOrder, orderId]);

  const fetchCustomerDetails = (): Customer | null => {
    const customer: Customer | null =
      customers.find((customer) => customer.businessNumber === Number(id)) ??
      null;

    return customer;
  };

  useEffect(() => {
    // Clear customer details immediately when component mounts
    setCustomerDetails(null);

    const fetchData = async () => {
      const data = fetchCustomerDetails();
      setCustomerDetails(data);
    };
    fetchData();

    // Cleanup function to clear customer details when component unmounts
    return () => {
      setCustomerDetails(null);
    };
  }, [id]);

  return (
    <ScreenWrapper
      topButton={
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={28}
              color="#001B61"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/customers/${id}/edit`)}
          >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={28}
              color="#001B61"
            />
          </TouchableOpacity>
        </View>
      }
      topSectionStyle={{ backgroundColor: "#8FCCE3" }}
    >
      <CustomerDetails />
    </ScreenWrapper>
  );
}
