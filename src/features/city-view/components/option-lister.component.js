import React from "react";
import { SelectorButton } from "./selector-navigation-styles";
import { Button } from "react-native";


export const OptionLister = ({items, onClick}) => {
  return <>
    { items.map( (item) => (
        <Button title={item} key={item} onPress={ (event) => { onClick(item);}}/>
    ))}
  </>;
};
