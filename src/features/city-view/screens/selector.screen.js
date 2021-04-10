import React, { useContext, useEffect, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  toggleLeafSelection,
  getAllNodesOfPath,
} from "../../../services/dataRepository";
import { OptionLister } from "../components/option-lister.component";

export const SelectorScreen = () => {
  const [pathToCurrentLevel, setpathToCurrentLevel] = useState([]);
  const [currentNodes, setcurrentNodes] = useState([]);

  useEffect(() => {
    setpathToCurrentLevel([]);
  }, []);

  useEffect(() => {
    updateNodes();
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
    } else {
      toggleLeafSelection([...pathToCurrentLevel, selectedObj.name]);
    }
    updateNodes();
  };

  return (
    <SafeArea>
      <Text> Choose a Node</Text>
      <OptionLister items={currentNodes} onClick={handleItemClick} />
    </SafeArea>
  );
};
