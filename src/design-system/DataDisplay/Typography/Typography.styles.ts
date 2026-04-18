import type { CSSObject } from "tss-react";

import { createStyles } from "../../utils";

const maxLinesCapped = (maxLines?: number): CSSObject => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
  //* This next few lines cap the text at 'maxLines' lines
  //* Works only for modern browsers, which are the ones we currently support
  display: "-webkit-box",
  lineClamp: maxLines ? `${maxLines}` : undefined, // force string, without it gets interpreted as px
  WebkitLineClamp: maxLines,
  WebkitBoxOrient: "vertical",
  // hack for right aligned text with ellipsis
  marginRight: "-1em",
  paddingRight: "1em",
});

const singleLineOverflow: CSSObject = { overflowWrap: "break-word" };

export default createStyles<never, { maxLines?: number }>({
  THEME1: (_, props) => ({
    maxLinesCapped: maxLinesCapped(props?.maxLines),
    singleLineOverflow,
  }),
  THEME2: (_, props) => ({
    maxLinesCapped: maxLinesCapped(props?.maxLines),
    singleLineOverflow,
  }),
});
