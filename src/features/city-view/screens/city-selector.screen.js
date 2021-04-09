import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  getAllCountries,
  getAllProvince,
  getAllCities,
  toggleLeafSelection,
  getAllChildToPath,
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

  const [pathToCurrentLevel, setpathToCurrentLevel] = useState([])
  const [currentNodes, setcurrentNodes] = useState([])
 
  useEffect(() => {
      setpathToCurrentLevel([])
     
  }, [])

  const updateLeafSelection = () => {
        toggleLeafSelection(pathToCurrentLevel);
  }

  const handleItemClick = (selectedValue) =>{
      
      setpathToCurrentLevel((prev) => {
          if (prev[prev.length - 1] == selectedValue){
              return prev
          }
          else{
              return [...prev, selectedValue];
          } 
        });
  }
  
  useEffect(() => {
      let nodes = getAllChildToPath(pathToCurrentLevel);
      console.log(nodes)
      setcurrentNodes( prevNodes => {
          console.log("Prev nodes" + JSON.stringify(prevNodes));
            console.log("New nodes" + JSON.stringify(nodes));

          if (JSON.stringify(prevNodes) == JSON.stringify(nodes)) {
            console.log("inside");
            // we got back same nodes that means we are in lead node. Save the selection
            updateLeafSelection();
          }
          return nodes
      });
  }, [pathToCurrentLevel]);

  return (
    <SafeArea>
      <Text variant="label"> City Selector</Text>
      <SelectorNavigation />
      <Text> Choose a country</Text>
      <Text> {JSON.stringify()}</Text>
      <OptionLister items={currentNodes} onClick={handleItemClick} />
    </SafeArea>
  );
};
