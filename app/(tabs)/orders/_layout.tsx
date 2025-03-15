import { screenOptions } from "@/constants/ScreenOptions";
import { Order } from "@/models/Order";
import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

interface OrderContextType {
  orderDetails: Order | null;
  setOrderDetails: React.Dispatch<React.SetStateAction<Order | null>>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within a OrderProvider");
  return context;
};

export default function OrdersLayout() {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      <Stack>
        <Stack.Screen name="index" options={screenOptions} />
      </Stack>
    </OrderContext.Provider>
  );
}
