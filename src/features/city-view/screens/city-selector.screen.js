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
  getAllNodesOfPath,
} from "../../../services/dataRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectorNavigation } from "../components/selector-navigation.component"
import { Button } from "react-native-paper";
import {OptionLister} from "../components/option-lister.component"


export const CitySelectorScreen = () => {
  const [pathToCurrentLevel, setpathToCurrentLevel] = useState([])
  const [currentNodes, setcurrentNodes] = useState([])
 
  useEffect(() => {
      setpathToCurrentLevel([])
  }, [])
  

  const handleItemClick = (selectedObj) =>{
      if(!selectedObj.isLeaf){
        setpathToCurrentLevel( (prev) => [...prev, selectedObj.name])
      }
      else{
          toggleLeafSelection([...pathToCurrentLevel, selectedObj.name]);
      }
      updateNodes();
  }

  const updateNodes = () => {
    //let nodes = getAllChildToPath(pathToCurrentLevel);
    const fetchAllNodes =   (pathToCurrentLevel)  => {
         try{
           getAllNodesOfPath(pathToCurrentLevel).then((nodes) => {
           
             setcurrentNodes((prevNodes) => {
               return nodes;
             });
           });

         }
         catch(e){
           console.log(e)
         }
          
      }
      
    fetchAllNodes(pathToCurrentLevel);
  }
  
  useEffect(() => {
      updateNodes()
  }, [pathToCurrentLevel]);

  return (
    <SafeArea>
      <Text> Choose a Node</Text>
      <OptionLister items={currentNodes} onClick={handleItemClick} />
    </SafeArea>
  );
};
