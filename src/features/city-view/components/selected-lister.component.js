import React, { useEffect } from "react";
import { CenteredCard } from "./location-card-styles";
import { Card, Paragraph, Title, Subheading } from "react-native-paper";
import { View , FlatList} from "react-native";
import { FullCenteredCard, CenteredView } from "./selected-lister-styles";
import { Text } from "../../../components/typography/text.component";
import {SelectedItem} from "./selected-item.component"

export const SelectionListerCard = ({ items }) => {
    const renderItem = ({ item }) => <Text >{item}</Text>;
  return (
    <>
      <FullCenteredCard>
        <Card.Content>
          <CenteredView>
            <Title>Selected Nodes</Title>
          </CenteredView>
          <CenteredView>
            <FlatList
              data={items}
              renderItem={SelectedItem}
              keyExtractor={(item) => item}
            />
          </CenteredView>
        </Card.Content>
      </FullCenteredCard>
    </>
  );
};
