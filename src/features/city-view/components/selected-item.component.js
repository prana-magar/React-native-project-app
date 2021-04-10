import React, { useEffect } from "react";
import { CenteredCard } from "./location-card-styles";
import { Card, Paragraph, Title, Subheading } from "react-native-paper";
import { View, FlatList } from "react-native";
import { CenteredView, HCenteredView } from "./location-card-styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

export const SelectedItem = ({ item }) => {
  return (
    <>
      <Spacer place="top" space="medium">
        <CenteredCard>
          <Card.Content>
            <CenteredView>
              <Text variant="label">{item}</Text>
            </CenteredView>
          </Card.Content>
        </CenteredCard>
      </Spacer>
    </>
  );
};
