export const gap = (gapX, gapY=gapX) => `
  column-gap: ${gapX};
  -webkit-column-gap: ${gapX};
  -o-column-gap: ${gapX};
  -moz-column-gap: ${gapX};
  -ms-column-gap: ${gapX};
  row-gap: ${gapY};
  -webkit-row-gap: ${gapY};
  -o-row-gap: ${gapY};
  -moz-row-gap: ${gapY};
  -ms-row-gap: ${gapY};
`;