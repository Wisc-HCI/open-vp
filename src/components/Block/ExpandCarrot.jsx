import React from "react";
import { motion } from "framer-motion";
import SvgIcon from '@mui/material/SvgIcon';

export const ExpandCarrot = ({ expanded, onClick }) => {
  
  const variants = {
    open: {d: "M770.578,215.347L399.578,586.347L26.887,213.656"},
    closed: {d: "M214.078,28.156L585.078,399.156L212.387,771.847"}
  }

  return (
    <SvgIcon
    sx={{fontSize:15}}
      onClick={onClick}
    //   width="10px"
    //   height="10px"
      viewBox="0 0 800 800"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
    >
      <motion.path
        animate={expanded ? 'open' : 'closed'}
        variants={variants}
        style={{
          fill: "none",
          stroke: "white",
          strokeOpacity: 1,
          strokeWidth: 60,
        }}
      />
    </SvgIcon>
  );
};