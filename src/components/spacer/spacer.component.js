import styled from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const getVariant = (place, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[place];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

export const Spacer = styled.View`
  ${({ place, size, theme }) => getVariant(place, size, theme)}
`;

Spacer.defaultProps = {
  place: "top",
  size: "small",
};
