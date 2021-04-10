import React, {useEffect} from "react";
import { SelectorButton } from "./selector-navigation-styles";
import { Button } from "react-native-paper";


export const OptionLister = ({items, onClick}) => {
  useEffect(() => {
    console.log("rerendering")
    console.log(JSON.stringify(items))
  },)
  return (
    <>
      {items.map((item) => (
        <Button
          mode={ item.isSelected? 'contained': 'outlined'}
          key={item.name}
          onPress={(event) => {
            onClick(item);
          }}
        >
          {item.name}
        </Button>
      ))}
    </>
  );
};
