import { orders } from "@/mock/orders";
import { customers } from "@/mock/customers";
import { distributionAreas } from "@/mock/distributionAreas";
import { DistributionArea } from "@/models/DistributionArea";

export const getDistributionAreasForLine = (
  distributionLineId: number
): DistributionArea[] => {
  const lineOrders = orders.filter(
    (order) => order.attachedDistributionLineId === distributionLineId
  );

  // Create a map of area IDs to their order counts
  const areaOrderCounts = new Map<number, number>();

  // Count orders per area by mapping through customers
  lineOrders.forEach((order) => {
    const customer = customers.find(
      (c) => c.businessNumber === order.customerId
    );
    if (customer) {
      const areaId = customer.distributionAreaId;
      areaOrderCounts.set(areaId, (areaOrderCounts.get(areaId) || 0) + 1);
    }
  });

  // Get unique distribution areas that have orders
  const areas = distributionAreas.filter((area) =>
    areaOrderCounts.has(area.id)
  );

  // Sort areas by number of orders (descending)
  return areas.sort((areaA, areaB) => {
    const ordersInAreaA = areaOrderCounts.get(areaA.id) || 0;
    const ordersInAreaB = areaOrderCounts.get(areaB.id) || 0;
    return ordersInAreaB - ordersInAreaA;
  });
};
