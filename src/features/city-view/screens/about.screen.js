import React, { useContext } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {Text} from "../../../components/typography/text.component"
import { Avatar } from "react-native-elements";
import {
  CenteredView,
  HCenteredView,
} from "./../components/location-card-styles";
import { Card, Paragraph, Title, Subheading } from "react-native-paper";
import { View } from "react-native";

export const AboutScreen = () => {

  return (
    <SafeArea>
      <Card>
        <CenteredView>
          <Avatar
            rounded
            title="PR"
            size="xlarge"
            source={{
              uri:
                "https://avatars.githubusercontent.com/u/13360498?s=400&u=626f6e0d80cbb7de0844294096ffec0228771151&v=4",
            }}
          />
          <Text variant="title">Prakash Rana</Text>
          <Text variant="caption">Software Developer</Text>
          <View style={{padding: 15}}>
            <Text variant="label">
              {" "}
              Loves building awesome products with others. Currently Rana is
              working with Lambton College as Research Student to realize
              Innovative products.
            </Text>
          </View>
        </CenteredView>
      </Card>
    </SafeArea>
  );
};
