//! Created to avoid the use of chakra-ui types in the components since they are costly to import

import { type BoxProps } from "@chakra-ui/react";

export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset";
export type TextAlign = Globals | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";

export type iBoxProps = BoxProps;