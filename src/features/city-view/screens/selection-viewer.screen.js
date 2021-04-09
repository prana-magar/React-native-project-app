import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { getAllSelectedCities } from "../../../services/dataRepository";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native";

export const SelectionViewerScreen = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const getCities = async () => {
    try {
      const selectedCities = await getAllSelectedCities();
      setSelectedCities(selectedCities);
      console.log(selectedCities[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCities();

      return () => {};
    }, [])
  );
  return (
    <SafeArea>
      <Text variant="label"> Selection View </Text>
      <Text>{JSON.stringify(selectedCities)}</Text>
      {selectedCities.map((city) => {
        <Text variant="label">city</Text>;
      })}
    </SafeArea>
  );
};
