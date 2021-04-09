import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  getAllSelectedLeaf,
  getGeoLocationInfo,
} from "../../../services/dataRepository";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native";

export const SelectionViewerScreen = () => {
  const [selectedLeaf, setselectedLeaf] = useState([]);
  const [geoInfo, setgeoInfo] = useState(null)
  const getLeaf = async () => {
    try {
      const selectedLeaf = await getAllSelectedLeaf();
      console.log(selectedLeaf);
      setselectedLeaf(selectedLeaf);
    } catch (e) {
      console.log(e);
    }
  };

  const getGeoInfo = async () => {
      try {
         const geoData = await getGeoLocationInfo();
         setgeoInfo(geoData)

      }
      catch(e) {
          console.log(e)
      }
  }

  useFocusEffect(
    React.useCallback(() => {
      getLeaf();
      getGeoInfo();

      return () => {};
    }, [])
  );
  return (
    <SafeArea>
      <Text variant="label"> {JSON.stringify(geoInfo)}</Text>
      <Text variant="label"> Selection View </Text>
      <Text>{JSON.stringify(selectedLeaf)}</Text>
      {selectedLeaf.map((leaf) => {
        <Text variant="label">leaf</Text>;
      })}
    </SafeArea>
  );
};
