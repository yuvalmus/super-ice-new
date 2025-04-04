import { useState, useEffect } from "react";
import database from "@/db";
import CustomerDB from "@/db/models/customer.model";
import { Customer as CustomerModel } from "@/models/Customer";
import { DeliveryDoc, PaymentMethod } from "@/models/Order";

export const transformCustomerToModel = (
  customerDB: CustomerDB
): CustomerModel => {
  return {
    businessNumber: customerDB.businessNumber,
    name: customerDB.name,
    address: customerDB.address,
    distributionAreaId: customerDB.distributionAreaId,
    bagPrice2kg: customerDB.bagPrice2kg,
    invoiceName: customerDB.invoiceName,
    freezerId: customerDB.freezerId,
    preferredDeliveryDocument: customerDB.preferredDeliveryDocument as
      | DeliveryDoc
      | undefined,
    preferredPaymentMethod: customerDB.preferredPaymentMethod as
      | PaymentMethod
      | undefined,
    notes: customerDB.notes,
  };
};

export const useCustomersModels = () => {
  const customers = useCustomers();

  return customers.map(transformCustomerToModel);
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<CustomerDB[]>([]);

  useEffect(() => {
    const query = database.get<CustomerDB>("customers").query();

    const subscription = query
      .observe()
      .subscribe((newCustomers: CustomerDB[]) => {
        setCustomers(newCustomers);
      });

    return () => subscription.unsubscribe();
  }, []);

  return customers;
};
