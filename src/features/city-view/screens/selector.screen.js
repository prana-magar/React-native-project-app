import React, { useContext, useEffect, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  toggleLeafSelection,
  getAllNodesOfPath,
} from "../../../services/dataRepository";
import { OptionLister } from "../components/option-lister.component";
import { CenteredView } from "../components/location-card-styles";
import { Button } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";

export const SelectorScreen = () => {
  const [pathToCurrentLevel, setpathToCurrentLevel] = useState([]);
  const [currentNodes, setcurrentNodes] = useState([]);
  const [isRoot, setisRoot] = useState(true);

  useEffect(() => {
    setpathToCurrentLevel([]);
  }, []);

  useEffect(() => {
    updateNodes();
    if (pathToCurrentLevel.length > 0) {
      setisRoot(false);
    }
    else{
      setisRoot(true);
    }
  }, [pathToCurrentLevel]);

  const updateNodes = () => {
    const fetchAllNodes = (pathToCurrentLevel) => {
      try {
        getAllNodesOfPath(pathToCurrentLevel).then((nodes) => {
          setcurrentNodes(nodes);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllNodes(pathToCurrentLevel);
  };

  const handleItemClick = (selectedObj) => {
    if (!selectedObj.isLeaf) {
      setpathToCurrentLevel((prev) => [...prev, selectedObj.name]);
      updateNodes();
    } else {
      toggleLeafSelection([...pathToCurrentLevel, selectedObj.name]);
      let updateNodes = []
      currentNodes.map( (nodeObj) => {
          if(nodeObj.name === selectedObj.name){
            let flippedObject = { ...nodeObj, isSelected: !nodeObj.isSelected };
            updateNodes.push(flippedObject)
          }
          else{
            updateNodes.push(nodeObj)
          }
      })
      setcurrentNodes(updateNodes)
    }
    
  };

  const backOneLevelUp = () => {
    pathToCurrentLevel.pop()
    updateNodes();
  }

  return (
    <SafeArea>
      <CenteredView>
        <Text> Choose a Node</Text>
        {!isRoot && (
          <Spacer place="top" space="medium">
            <Button mode="contained" onPress={() => backOneLevelUp()}>
              Back
            </Button>
          </Spacer>
        )}
        <OptionLister items={currentNodes} onClick={handleItemClick} />
      </CenteredView>
    </SafeArea>
  );
};
