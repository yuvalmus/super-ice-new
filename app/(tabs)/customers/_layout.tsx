import { Customer } from "@/models/Customer";
import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

interface CustomerContextType {
  customerDetails: Customer | null;
  setCustomerDetails: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context)
    throw new Error("useCustomer must be used within a CustomerProvider");
  return context;
};

export default function CustomersLayout() {
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);

  return (
    <CustomerContext.Provider value={{ customerDetails, setCustomerDetails }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]/edit" options={{ headerShown: false }} />
      </Stack>
    </CustomerContext.Provider>
  );
}
