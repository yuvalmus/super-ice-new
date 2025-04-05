import { useState, useEffect } from "react";
import database from "@/db";
import {
  Order as OrderModel,
  DeliveryDoc,
  PaymentMethod,
} from "@/models/Order";
import { Order as OrderDB } from "@/db/models";

export const transformOrderToModel = (orderDB: OrderDB): OrderModel => {
  return {
    id: orderDB.id,
    orderNumber: orderDB.orderNumber,
    customerId: orderDB.customerId,
    amountRequired: orderDB.amountRequired,
    amountSupplied: orderDB.amountSupplied,
    attachedDistributionLineId: orderDB.attachedDistributionLineId,
    position: orderDB.position,
    creationDate: orderDB.creationDate,
    isPaid: orderDB.isPaid,
    totalPrice: orderDB.totalPrice,
    deliveryDocument: orderDB.deliveryDocument as DeliveryDoc | undefined,
    paymentMethod: orderDB.paymentMethod as PaymentMethod | undefined,
    notes: orderDB.notes,
  };
};

export const useOrderModels = () => {
  const orders = useOrders();

  return orders.map(transformOrderToModel);
};

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderDB[]>([]);

  useEffect(() => {
    const query = database.get<OrderDB>("orders").query();

    const subscription = query.observe().subscribe((newOrders: OrderDB[]) => {
      setOrders(newOrders);
    });

    return () => subscription.unsubscribe();
  }, []);

  return orders;
};
