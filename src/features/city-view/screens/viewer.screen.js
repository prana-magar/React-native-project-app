import React, { useContext, useState, useEffect } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {StyleSheet} from "react-native"
import {
  getAllSelectedLeaf,
  getGeoLocationInfo,
} from "../../../services/dataRepository";
import { useFocusEffect } from "@react-navigation/native";
import {LocationCard} from './../components/location-card.component'
import { SelectionListerCard } from "./../components/selected-lister.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { View } from "react-native";

export const ViewerScreen = () => {
  const [selectedLeaf, setselectedLeaf] = useState([]);
  const [geoInfo, setgeoInfo] = useState({});
  const [isLoading, setisLoading] = useState(false)
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
      setisLoading(true)
      const geoData = await getGeoLocationInfo();
      setgeoInfo(geoData);
      setisLoading(false)
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getLeaf();
      getGeoInfo();

      return () => {};
    }, [])
  );
  return (
    <SafeArea>
      <View style={styles.container}>
        <LocationCard
          city={geoInfo.city}
          countryCode={geoInfo.country_code}
          country={geoInfo.country_name}
          region={geoInfo.region_name}
          zipcode={geoInfo.zip_code}
          latitude={geoInfo.latitude}
          longitude={geoInfo.longitude}
        />
        <Spacer place="top" size="medium">
          <SelectionListerCard items={selectedLeaf} />
        </Spacer>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }});
