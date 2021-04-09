import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  getAllCountries,
  getAllProvince,
  getAllCities,
  toggleCitySelection
} from "../../../services/dataRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectorNavigation } from "../components/selector-navigation.component"
import { Button } from 'react-native';
import {OptionLister} from "../components/option-lister.component"


export const CitySelectorScreen = () => {

  const [currentLevel, setCurrentLevel] = useState(1)
  const [displayOptions, setDisplayOptions] = useState(getAllCountries());
  const [currentCountry, setCurrentCountry] = useState(null)
  const [currentProvince, setCurrentProvince] = useState(null)
 
  useEffect(() => {
      setCurrentLevel(1)
     
  }, [])

  const updateCitySelection = (city) => {
        toggleCitySelection(currentCountry, currentProvince, city);
  }

  const handleItemClick = (selectedValue) =>{
      switch(currentLevel){
          case 1:
              setCurrentCountry(selectedValue);
              setCurrentLevel(currentLevel + 1);
              break;
            
          case 2:
              setCurrentProvince(selectedValue);
              setCurrentLevel(currentLevel + 1);
              break;

          default:
              updateCitySelection(selectedValue)
      }
  }
  
  useEffect(() => {
      if(currentLevel === 1) {
            setDisplayOptions(getAllCountries());
      }
      else if(currentLevel === 2){
          setDisplayOptions(getAllProvince(currentCountry));
      }
      else{
        setDisplayOptions(getAllCities(currentCountry,currentProvince))
      }
    
  }, [currentLevel]);

  return (
    <SafeArea>
      <Text variant="label"> City Selector</Text>
      <SelectorNavigation />
      <Text> Choose a country</Text>
      <OptionLister items={displayOptions} onClick={handleItemClick} />
    </SafeArea>
  );
};
