import * as RadixDialog from "@radix-ui/react-dialog";
import { styled, keyframes, alpha, lighten, darken } from "@mui/material";
import { motion } from "framer-motion";
import { useRef } from "react";
import useMeasure from "react-use-measure";

const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const DialogOverlay = styled("div")<{ show: boolean }>(
  {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    inset: 0,
    alignContent: "center",
    justifyContent: "center",
    userSelect: "none",
  },
  ({ theme, show }) => ({
    backgroundColor: show ? "rgba(0,0,0,.25)" : 'transparent',
    backdropFilter: show ? "blur(1px)" : undefined,
    WebkitBackdropFilter: show ? "blur(1px)" : undefined,
    animation: `${overlayShow} 500ms ${theme.transitions.easing.easeInOut}`,
  })
);

const DialogContent = motion(
  styled("div", {shouldForwardProp: (prop:string)=>!['width','height'].includes(prop)})<{width: number, height:number}>(
    {
      touchAction: "none",
      position: "fixed",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      boxShadow:
        "0 10px 38px -10px rgba(0,0,0,.25), 0 10px 20px -15px rgba(0,0,0,.25)",
    },
    ({ theme, width, height }) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(lighten(theme.palette.background.paper, 0.1), 0.5)
          : alpha(darken(theme.palette.background.paper, 0.1), 0.5),
      // animation: `${contentShow} 500ms ${theme.transitions.easing.easeInOut}`,
      borderRadius: theme.shape.borderRadius,
      top: `calc(50% - ${height / 2}px)`,
      left: `calc(50% - ${width / 2}px)`,
    })
  )
);

export interface DialogProps {
  isOpen: boolean;
  onStateChange: (open: boolean) => void;
  children: React.ReactNode;
  showOverlay?: boolean;
  clickableOverlay?: boolean;
  draggable?: boolean;
}

const dialogSpring = {
  type: "spring",
  damping: 50,
  stiffness: 400
};

const dialogDragTransition = {
  min: 0,
  max: 10,
  power: 0.05
}

// const dialogVariants = {
//   open: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
//   closed: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)" },
//   exit: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)" },
//   initial: { opacity: 0, transform: "translate(-50%, -55%) scale(0.8)" },
// };

const dialogVariants = {
  open: { opacity: 1},
  closed: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)"},
  exit: { opacity: 0, transform: "translate(-50%, -50%) scale(0.8)"},
  initial: { opacity: 0},
};

export const Dialog = ({
  isOpen = false,
  onStateChange = (open: boolean) => {},
  showOverlay = true,
  clickableOverlay = true,
  draggable = false,
  children,
}: DialogProps) => {

  const bounds = useRef(null)
  const [dialog, size] = useMeasure()

  return (
  <RadixDialog.Root open={isOpen} onOpenChange={onStateChange}>
    <RadixDialog.Portal>
      <DialogOverlay
        onClick={clickableOverlay ? () => onStateChange(false) : undefined}
        show={showOverlay}
        ref={bounds}
        style={{pointerEvents: clickableOverlay ? 'auto' : 'none'}}
      />
      {isOpen && (
        <DialogContent
        ref={dialog}
        drag={draggable}
        width={size.width}
        height={size.height}
        dragConstraints={bounds}
        transition={dialogSpring}
        dragTransition={dialogDragTransition}
        initial="initial"
        exit="exit"
        whileDrag={{scale: 1.05}}
        variants={dialogVariants}
        animate={isOpen ? "open" : "closed"}
      >
        {children}
      </DialogContent>
      )}
      
    </RadixDialog.Portal>
  </RadixDialog.Root>
)};
