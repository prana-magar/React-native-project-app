import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { FlatList, TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";

const Item = ({ item, onClick, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onClick}>
    <Button
      mode={item.isSelected ? "contained" : "outlined"}
      key={item.name}
      onPress={(event) => {
        onClick(item);
      }}
    >
      {item.name}
    </Button>
  </TouchableOpacity>
);

export const OptionLister = ({ items, onClick }) => {
  const [selectedObj, setselectedObj] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Spacer place="top" space="medium">
        <Item
          item={item}
          onClick={() => {
            setselectedObj(item);
            onClick(item);
          }}
        />
      </Spacer>
    );
  };

  return (
    <>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        extraData={selectedObj}
      />
    </>
  );
};
