import { Avatar, Card, lighten, Stack } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { motion } from "framer-motion";

export interface BlockContainerProps {
  minified?: boolean;
  selected?: boolean;
  color?: string;
  focused?: boolean;
  bounded?: boolean;
}

export const BlockContainer = motion(
  styled("div", {
    shouldForwardProp: (prop: string) =>
      !["minified", "selected", "color", "focused", "bounded"].includes(prop),
  })<BlockContainerProps>(
    {
      minWidth: 150,
      display: "block",
    },
    ({ minified, selected, color, focused, theme, bounded }) => ({
      padding: minified ? 0 : "4px",
      backgroundColor: alpha(
        focused ? lighten(color || "white", 0.1) : color || "white",
        0.8
      ),
      backdropFilter: "blur(5px)",
      borderRadius: theme.shape.borderRadius,
      WebkitBackdropFilter: "blur(5px)",
      width: bounded ? "inherit" : "max-content",
      flex: bounded ? 1 : undefined,
      "&:hover": {
        backgroundColor: alpha(
          focused ? lighten(color || "white", 0.1) : color || "white",
          0.95
        ),
      },
      boxShadow:
        selected && focused
          ? `0pt 0pt 0pt 3pt ${lighten(theme.palette.primary.main, 0.5)}`
          : selected
          ? `0pt 0pt 0pt 3pt ${theme.palette.primary.main}`
          : focused
          ? `0pt 0pt 0pt 3pt ${lighten(color || "white", 0.5)}}`
          : undefined,
    })
  )
);

export const CommentContainer = motion(styled(Stack, {
    shouldForwardProp: (prop: string) => !["bounded"].includes(prop),
  })<BlockContainerProps>(
    {
      minWidth: 150,
      flex: 1,
      flexDireaction: 'row',
    },
    ({ theme, bounded }) => ({
      // padding: 4,
      // backgroundColor: alpha(theme.palette.background.paper, 0.6),
      borderRadius: theme.shape.borderRadius,
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
      width: bounded ? "inherit" : "max-content",
      "&:hover": {
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
      },
    })
  ));

export const CommentText = styled('span')(
  {
    all: 'unset',
    flex:1,
    padding: 3
  },({theme})=>({
    color: alpha(theme.palette.text.primary, 0.8),
  }));

export const CommentHeader = styled('div')(
  {
    padding: 4
  }, 
  ({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    color: theme.palette.text.disabled
}));

// export const OuterAvatarContainer = styled(Box)({
//   height: "39px",
//   width: "39px",
//   alignItems: "center",
//   display: "flex",
// });

export const BlockAvatarContainer = motion(
  styled(Avatar)({
    boxShadow: `0 0 0 1px #dddddd55`,
    color: "white",
    height: 35,
    width: 35,
    position: "relative",
  })
);

// export const OuterProgressContainer = styled(Box)({
//   height: "30px",
//   width: "30px",
//   position: "relative",
//   top: 0,
//   left: "-34px",
//   zIndex: 1,
// });

export const SettingsContainer = styled(Card)({
  backgroundColor: "#00000055",
  marginBottom: "5px",
  marginLeft: "3px",
  marginRight: "3px",
  paddingLeft: "5px",
  paddingRight: "5px",
});

export const PropertySection = styled(Card)({
  backgroundColor: "#ffffff20",
  margin: "3px",
});

export const FullWidthStack = styled(Stack)({ width: "100%" });
export const FullHeightStack = styled(Stack)({ height: "100%" });