import { appSchema } from "@nozbe/watermelondb";
import { usersSchema } from "./schemas/users.schema";
import { driversSchema } from "./schemas/drivers.schema";
import { distributionAreasSchema } from "./schemas/distribution_areas.schema";
import { freezersSchema } from "./schemas/freezers.schema";
import { customersSchema } from "./schemas/customers.schema";
import { distributionLinesSchema } from "./schemas/distribution_lines.schema";
import { ordersSchema } from "./schemas/orders.schema";
import { contactsSchema } from "./schemas/contacts.schema";

export default appSchema({
  version: 2,
  tables: [
    usersSchema,
    driversSchema,
    distributionAreasSchema,
    freezersSchema,
    customersSchema,
    distributionLinesSchema,
    ordersSchema,
    contactsSchema,
  ],
});
