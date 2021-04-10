import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { View } from "react-native";

export const FullCenteredCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-grow: 1;
`;

export const CenteredView = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const HCenteredView = styled(View)`
  flex-direction:row
  justify-content: space-between;
  align-items: center;
`;


