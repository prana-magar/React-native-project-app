import React, { useContext } from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {Text} from "../../../components/typography/text.component"

export const AboutScreen = () => {

  return (
    <SafeArea>
        <Text variant="label"> About</Text>
    </SafeArea>
  );
};
