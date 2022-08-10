import { Avatar, Box, Card, Stack } from "@mui/material";
import styled from "@emotion/styled";

export const OuterBlockContainer = styled('div',{shouldForwardProp: prop=>prop!=='bounded'})(
  {
    minWidth: 175,
    borderRadius: 3,
    display: "block"
  },
  ({ bounded }) => ({
    width: bounded ? "inherit" : "max-content",
    flex: bounded ? 1 : null,
  })
);

export const InnerBlockContainer = styled(Card,{shouldForwardProp: prop=>!['minified', 'highlightColor', 'selected', 'color'].includes(prop)})(
  {
    minWidth: 175,
    width: "inherit"
  },
  ({ minified, selected, color, theme }) => ({
    padding: minified ? 0 : "4px",
    backgroundColor: color,
    boxShadow: selected ? `0pt 0pt 5pt 5pt ${theme.palette.primary.main}` : null,
    // '&:hover' : {
    //   boxShadow: selected ? `0pt 0pt 7pt 7pt ${theme.palette.primary.main}` : '0pt 0pt 1pt 1pt #ffffff'
    // }
  })
);

export const OuterAvatarContainer = styled(Box)({
  height: "39px",
  width: "39px",
  alignItems: "center",
  display: "flex",
});

export const InnerAvatarContainer = styled(Avatar)({
  backgroundColor: "#22222299",
  boxShadow: `0 0 0 1px #dddddd55`,
  color: "white",
  height: "39px",
  width: "39px",
  position: "relative",
});

export const OuterProgressContainer = styled(Box)({
  height: "30px",
  width: "30px",
  position: "relative",
  top: 0,
  left: "-34px",
  zIndex: 1,
});

export const SettingsContainer = styled(Card)({
  backgroundColor: "#00000055",
  marginBottom: "5px",
  marginLeft:'3px',
  marginRight:'3px',
  paddingLeft:'5px',
  paddingRight:'5px',
})

export const PropertySection = styled(Card)({
  backgroundColor: "#ffffff20",
  margin: "3px",
})

export const FullWidthStack = styled(Stack)({width:'100%'})
export const FullHeightStack = styled(Stack)({height:'100%'})