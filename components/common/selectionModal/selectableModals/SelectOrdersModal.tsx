import React, { useMemo } from "react";
import SelectionModal from "@/components/common/selectionModal/SelectionModal";
import { orders } from "@/mock/orders";
import { getOrderStatus } from "@/utils/Order/OrderUtils";
import OrderTicket from "@/components/common/orders/orderTicket/OrderTicket";
import { ScreenWidth } from "@/constants/Dimensions";
import { customers } from "@/mock/customers";
import { getDistributionLineDate } from "@/utils/DistributionLine/distributionLineUtils";
import { Order } from "@/models/Order";

interface SelectOrdersModalProps {
  isVisible: boolean;
  onSelect: (selectedIds: string[]) => void;
  onClose: () => void;
  startButtonText?: string;
  filterRules?: (order: Order) => boolean;
  sort?: ((a: Order, b: Order) => number) | undefined;
}

const SelectOrdersModal = (props: SelectOrdersModalProps) => {
  const shownOrders = useMemo(() => {
    return props.filterRules ? orders.filter(props.filterRules) : orders;
  }, [orders, props.filterRules]);

  const sortedOrders = useMemo(() => {
    return props.sort ? shownOrders.sort(props.sort) : shownOrders;
  }, [shownOrders, props.sort]);

  return (
    <SelectionModal
      isVisible={props.isVisible}
      multiple
      onSelect={props.onSelect}
      onClose={props.onClose}
      itemIdExtractor={(order: Order) => order.id}
      title="בחר הזמנות"
      startButtonText={props.startButtonText ?? "הוספת הזמנות לקו"}
      items={sortedOrders}
      noItemsText="אין הזמנות"
      selectedBorderColor="#001B61"
      renderItem={(order: Order) => (
        <OrderTicket
          order={order}
          width={ScreenWidth * 0.62}
          title={
            customers.find(
              (customer) => customer.id === order.customerId
            )?.name
          }
          regularDetails={[{ title: "כמות:", data: order.amountRequired }]}
          importantDetails={[
            { title: "תאריך הזמנה:", data: order.creationDate },
            {
              title: "קו חלוקה משויך:",
              data: order.attachedDistributionLineId
                ? getDistributionLineDate(order.attachedDistributionLineId)
                : "לא משויך",
            },
          ]}
        />
      )}
    />
  );
};

export default SelectOrdersModal;
