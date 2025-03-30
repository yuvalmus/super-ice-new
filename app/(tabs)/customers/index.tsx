import { ScreenWrapper } from "@/components/ScreenWrapper";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { customers } from "@/mock/customers";
import CustomerCard from "@/components/customersScreen/customerCard/CustomerCard";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { distributionAreas } from "@/mock/distributionAreas";
import SearchBar from "@/components/common/searchBar/SearchBar";
import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CustomersScreen() {
  const [searchedName, setSearchedName] = useState("");

  const sectionedData = useMemo(
    () =>
      distributionAreas
        .map((area) => ({
          title: area.name,
          data: customers.filter(
            (customer) =>
              customer.distributionAreaId === area.id &&
              customer.name.includes(searchedName)
          ),
        }))
        .filter((section) => section.data.length > 0),
    [searchedName, customers, distributionAreas]
  );

  return (
    <ScreenWrapper
      title="רשימת לקוחות"
      topButton={
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => {}}
        >
          <Ionicons name="add" size={28} color="#001B61" />
        </TouchableOpacity>
      }
      disableScroll
    >
      <SearchBar placeholder="הקלד שם לקוח" onChangeText={setSearchedName} />
      <SectionList
        sections={sectionedData}
        keyExtractor={(item) => item.businessNumber.toString()}
        contentContainerStyle={styles.sectionListStyle}
        renderItem={({ item: customer }) => (
          <CustomerCard customerDetails={customer} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.distributionAreaTitleStyle}>{title}</Text>
        )}
        renderSectionFooter={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.noResultsTextStyle}>אין תוצאות מתאימות</Text>
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionListStyle: {
    width: "100%",
    alignItems: "center",
    padding: ScreenWidth * 0.04,
    paddingBottom: ScreenHeight * 0.15,
  },
  distributionAreaTitleStyle: {
    fontSize: ScreenWidth * 0.06,
    fontWeight: "bold",
    color: "#21a7fd",
    marginBottom: ScreenHeight * 0.018,
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  separator: {
    height: 1.5,
    width: ScreenWidth,
    backgroundColor: "#8FCCE3",
    marginBottom: ScreenHeight * 0.02,
  },
  noResultsTextStyle: {
    fontSize: ScreenWidth * 0.06,
    color: "#3AA1D8",
    textAlign: "center",
    marginVertical: ScreenHeight * 0.04,
  },
});
