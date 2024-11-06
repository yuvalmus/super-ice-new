import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import SearchBar from "@/components/common/searchBar/SearchBar";
import { Customer } from "@/models/Customer";
import TextInputField from "@/components/common/inputField/TextInputField";
import DropdownField from "@/components/common/inputField/DropdownField";
import { distributionAreas } from "@/mock/distributionAreas";

const CreateCustomerScreen = () => {
  const [newCustomerDetails, setNewCustomerDetails] = useState<Customer>({
    name: "",
    address: "",
    bagPrice2kg: 0,
    businessNumber: -1,
    distributionAreaId: -1,
    freezerId: -1,
  });
  return (
    <ScreenWrapper
      title="יצירת לקוח חדש"
      style={{ width: "100%" }}
    >
      <ScrollView contentContainerStyle={styles.fieldsContainer}>
        <TextInputField
          title="מספר ברווחית"
          placeholder="מספר ברווחית"
          value={newCustomerDetails.name}
          onChangeText={(newValue: string) =>
            setNewCustomerDetails((prev) => {
              return { ...prev, name: newValue };
            })
          }
        />
        <TextInputField
          title="שם העסק"
          placeholder="שם העסק"
          value={newCustomerDetails.name}
          onChangeText={(newValue: string) =>
            setNewCustomerDetails((prev) => {
              return { ...prev, name: newValue };
            })
          }
        />
        <TextInputField
          title="כתובת"
          placeholder="כתובת"
          value={newCustomerDetails.address}
          onChangeText={(newValue: string) =>
            setNewCustomerDetails((prev) => {
              return { ...prev, address: newValue };
            })
          }
        />
        <DropdownField
          dropdownOptions={distributionAreas.map((area) => ({
            label: area.name as string,
            value: String(area.id),
          }))}
          title="אזור חלוקה"
          placeholder="בחר אזור חלוקה"
          value={newCustomerDetails.address}
          onChange={(item) =>
            setNewCustomerDetails((prev) => {
              return { ...prev, distributionAreaId: Number(item.value) };
            })
          }
        />
        <TextInputField
          title='מחיר 2 ק"ג'
          placeholder="0"
          value={newCustomerDetails.address}
          onChangeText={(newValue: string) =>
            setNewCustomerDetails((prev) => {
              return { ...prev, address: newValue };
            })
          }
          style={{width: ScreenWidth * 0.4}}
          inputStyle={{textAlign: 'left'}}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CreateCustomerScreen;

const styles = StyleSheet.create({
  fieldsContainer: {
    width: "100%",
    justifyContent: "center",
    padding: ScreenWidth * 0.01,
  },
});
