import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import User from "./models/user.model";
import Driver from "./models/driver.model";
import DistributionArea from "./models/distributionArea.model";
import Freezer from "./models/freezer.model";
import Customer from "./models/customer.model";
import DistributionLine from "./models/distributionLine.model";
import Order from "./models/order.model";
import Contact from "./models/contact.model";

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    User,
    Driver,
    DistributionArea,
    Freezer,
    Customer,
    DistributionLine,
    Order,
    Contact,
  ],
});

export default database;
