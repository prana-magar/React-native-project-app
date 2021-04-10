import React, { useEffect } from "react";
import { CenteredCard } from "./location-card-styles";
import { Card, Paragraph, Title, Subheading } from "react-native-paper";
import { View } from "react-native";
import { CenteredView, HCenteredView } from "./location-card-styles";

export const LocationCard = ({
  city = "Toronto",
  country = "Canada",
  region = "Ontario",
  zipcode = "M2A2A5",
  countryCode = "CA",
  latitude = "12312342.5",
  longitude = "12312.23",
}) => {
  return (
    <>
      <CenteredCard>
        <Card.Content>
          <HCenteredView>
            <Paragraph>{zipcode}</Paragraph>
            <Paragraph>{countryCode}</Paragraph>
          </HCenteredView>
          <CenteredView>
            <Title>{city}</Title>
            <Subheading>
              {country},{region}
            </Subheading>
            <Subheading>
              {latitude}, {longitude}
            </Subheading>
          </CenteredView>
        </Card.Content>
      </CenteredCard>
    </>
  );
};
