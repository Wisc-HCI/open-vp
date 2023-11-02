import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { styled, keyframes, alpha } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const contentShow = keyframes({
  from: { transform: "translate(-50%, -48%) scale(0.96)", opacity: 0 },
  to: { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
});

const DialogOverlay = styled("div")(
  {
    backgroundColor: "rgba(0,0,0,.25)",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    inset: 0,
    backdropFilter: "blur(1px)",
    WebkitBackdropFilter: "blur(1px)",
    alignContent: "center",
    justifyContent: "center",
  },
  ({ theme }) => ({
    animation: `${overlayShow} 500ms ${theme.transitions.easing.easeInOut}`,
  })
);

const DialogContent = motion(
  styled("div")(
    {
      position: "fixed",
      top: "50%",
      // maxHeight: '80vh',
      left: "50%",
      transform: "translate(-50%, -50%)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      boxShadow:
        "0 10px 38px -10px rgba(0,0,0,.25), 0 10px 20px -15px rgba(0,0,0,.25)",
    },
    ({ theme }) => ({
      backgroundColor: alpha(theme.palette.background.paper, 0.5),
      // animation: `${contentShow} 500ms ${theme.transitions.easing.easeInOut}`,
      borderRadius: theme.shape.borderRadius,
    })
  )
);

export interface DialogProps {
  isOpen: boolean;
  onStateChange: (open: boolean) => void;
  children: React.ReactNode;
}

const dialogSpring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const dialogVariants = {
  open: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
  closed: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)" },
  exit: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)" },
  initial: { opacity: 0, transform: "translate(-50%, -55%) scale(0.8)" },
}

export const Dialog = ({
  isOpen = false,
  onStateChange = (open: boolean) => {},
  children,
}: DialogProps) => (
  <RadixDialog.Root open={isOpen} onOpenChange={onStateChange}>
    <RadixDialog.Portal>
      <DialogOverlay onClick={() => onStateChange(false)} />
      <DialogContent
          transition={dialogSpring}
          initial='initial'
          exit="exit"
          variants={dialogVariants}
          animate={isOpen ? 'open' : 'closed'}
        >
          {children}
        </DialogContent>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
