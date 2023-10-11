import {
    Slider as MuiSlider
  } from "@mui/material";

import { styled } from "@mui/material";

export const VerticalSlider = styled((props) => (
    <MuiSlider {...props} orientation="vertical"/>
  ))(
    {
      width: 8,
      marginTop: 7,
      marginBottom: 7,
      '& input[type="range"]': {
        WebkitAppearance: "slider-vertical",
      },
      '& .MuiSlider-track': {
        border: 'none',
        backgroundColor: '#dddddd',
      },
      '& .MuiSlider-rail': {
        backgroundColor: '#222',
      },
      '& .MuiSlider-thumb': {
        height: 14,
        width: 14,
        backgroundColor: '#90909050',
        WebkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        // border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&:before': {
          display: 'none',
        },
        "&:hover, &.Mui-active": {
          height: 20,
          width: 20,
        }
      },
      '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: "#70707050",
        WebkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        transformOrigin: 'center right',
        transform: 'translate(200%, -50%) rotate(45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
          transform: 'translate(200%, -50%) rotate(45deg) scale(1)',
        },
        '& > *': {
          transform: 'rotate(-45deg)',
        },
      },
    }
  );
  