import React from "react";
import { RenderItemParams } from "react-native-draggable-flatlist";
import { Order } from "@/models/Order";
import OrderItem from "@/components/distributionLinesScreen/OrderItem/OrderItem";
import DraggableList from "@/components/common/draggableList/DraggableList";

interface DraggableOrderListProps {
  orders: Order[];
  onDragEnd: ({ data }: { data: Order[] }) => void;
  onUpdateAmount: (orderId: number, amount: number) => Promise<boolean>;
}

const DraggableOrderList = (props: DraggableOrderListProps) => {
  const renderItem = ({ item, drag, isActive }: RenderItemParams<Order>) => {
    return (
      <OrderItem
        order={item}
        drag={drag}
        isActive={isActive}
        onUpdateAmount={(amount) => props.onUpdateAmount(item.id, amount)}
      />
    );
  };

  return (
    <DraggableList
      data={props.orders}
      renderItem={renderItem}
      onDragEnd={props.onDragEnd}
    />
  );
};

export default DraggableOrderList;
