import { Order } from "@/models/Order";
import { orders as mockOrders } from "@/mock/orders";

// Fetch orders for a distribution line
export const fetchOrders = (
  distributionLineId: number,
  callback: (orders: Order[]) => void
) => {
  // Simulate async fetch
  setTimeout(() => {
    const lineOrders = mockOrders
      .filter(
        (order) => order.attachedDistributionLineId === distributionLineId
      )
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    callback(lineOrders);
  }, 500);
};

// Update orders on backend
export const updateOrdersOnBackend = async (
  updatedOrders: Order[],
  setIsUpdating: (value: boolean) => void
): Promise<boolean> => {
  setIsUpdating(true);
  try {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("Orders updated on backend:", updatedOrders);

    // In a real app, you would make an API call here
    // await api.updateOrderPositions(updatedOrders);

    return true;
  } catch (error) {
    console.error("Failed to update orders:", error);
    return false;
  } finally {
    setIsUpdating(false);
  }
};

// Handle drag end and reordering
export const handleDragEnd = async (
  data: Order[],
  currentOrders: Order[],
  setOrders: (orders: Order[]) => void,
  setIsUpdating: (value: boolean) => void
) => {
  const currentOrderIds = currentOrders.map((order) => order.id);
  const newOrderIds = data.map((order) => order.id);

  // Check if arrays are identical (no change in order)
  const hasPositionsChanged = !currentOrderIds.every(
    (id, index) => id === newOrderIds[index]
  );

  if (!hasPositionsChanged) {
    console.log("Order positions unchanged, skipping update");
    return;
  }

  // Update positions based on new order
  const updatedOrders = data.map((order, index) => ({
    ...order,
    position: index,
  }));

  // Update local state immediately for a responsive UI
  setOrders(updatedOrders);

  // Update backend
  await updateOrdersOnBackend(updatedOrders, setIsUpdating);
};

// Handle updating an order's supplied amount
export const handleUpdateOrderAmount = async (
  orderId: number,
  amount: number,
  orders: Order[],
  setOrders: (orders: Order[]) => void,
  setIsUpdating: (value: boolean) => void
): Promise<boolean> => {
  // Check if amount actually changed
  const currentOrder = orders.find((order) => order.id === orderId);
  if (currentOrder && currentOrder.amountSupplied === amount) {
    console.log(`Amount unchanged for order #${orderId}, skipping update`);
    return true;
  }

  setIsUpdating(true);
  try {
    // Update order in local state
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, amountSupplied: amount } : order
    );

    setOrders(updatedOrders);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Updated order #${orderId} amount to ${amount} on backend`);

    return true;
  } catch (error) {
    console.error("Failed to update order amount:", error);
    return false;
  } finally {
    setIsUpdating(false);
  }
};
