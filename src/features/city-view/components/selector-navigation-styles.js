import styled from "styled-components/native";
import {Button} from 'react-native'

export const SelectorButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;