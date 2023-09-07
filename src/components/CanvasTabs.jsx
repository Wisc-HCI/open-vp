import React, { useState, forwardRef } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import { useProgrammingStore } from "./ProgrammingContext";
import { shallow } from "zustand/shallow";
import {
  FiX,
  FiPlus,
  FiFolder,
  FiFile,
  FiTrash,
  FiEyeOff,
} from "react-icons/fi";
import { styled, darken } from "@mui/material/styles";
import {
  ClickAwayListener,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import { DropdownTrigger } from "./Block/Utility";
import { useTheme } from "@emotion/react";

const SlideUpTransition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const PlusButton = styled(IconButton)(
  {
    borderRadius: 5,
    // borderLeft: "1.5px solid #222",
    height: 35,
    width: 35,
    margin: 5,
    backgroundColor: "#333",
  },
  ({ theme }) => ({
    "&:hover": { backgroundColor: darken(theme.palette.primary.main, 0.5) },
    color: theme.palette.primary.main
  })
);

const Bar = styled("div")({
  background: "black",
  width: "100%",
  display: "grid",
  borderBottom: "1px solid #333",
  height: "45px",
  gridTemplateColumns: "auto 46px",
});

// const TabButton = styled("div", {
//   shouldForwardProp: (prop) => prop !== "selected",
// })(
//   {
//     fontFamily: "helvetica",
//     flex: 1,
//     alignContent: "center",
//     // width: "100%",
//     padding: "10px 15px",
//     // position: "relative",
//     cursor: "pointer",
//     height: 24,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     minWidth: 0,
//     borderLeft: "0.5px solid #222",
//     borderRight: "0.5px solid #222",
//     // overflow: "hidden",
//     userSelect: "none",
//     overflowY: "none",
//     //   minWidth: 175,
//     //   borderRadius: 3,
//     //   display: "block"
//   },
//   ({ selected, theme }) => ({
//     //   width: bounded ? "inherit" : "max-content",
//     //   flex: bounded ? 1 : null,
//     "&:hover": {
//       backgroundColor: "#222",
//     },
//     borderBottom: selected
//       ? `1px solid ${theme.palette.primary.main}`
//       : `1px solid ${theme.palette.mid.main}`,
//     // color: selected ? "black" : theme.palette.primary.main,
//     color: selected ? theme.palette.primary.main : theme.palette.mid.main,
//   })
// );

export const CanvasTabs = ({}) => {
  const tabs = useProgrammingStore(
    (state) => state.tabs.filter((t) => t.visible),
    shallow
  );
  const hiddenTabs = useProgrammingStore(
    (state) => state.tabs.filter((t) => !t.visible),
    shallow
  );
  const setTabs = useProgrammingStore((state) => state.setTabs, shallow);
  const activeTab = useProgrammingStore((state) => state.activeTab, shallow);
  const setActiveTab = useProgrammingStore(
    (state) => state.setActiveTab,
    shallow
  );
  const removeTab = useProgrammingStore((state) => state.removeTab, shallow);
  const addTab = useProgrammingStore((state) => state.addTab, shallow);
  const setTabVisibility = useProgrammingStore(
    (state) => state.setTabVisibility,
    shallow
  );
  const [deleteFocus, setDeleteFocus] = useState(null);
  const handleRemoveClick = (tabId) => {
    tabs.some((tab) => {
      if (tab.id === tabId) {
        setDeleteFocus(tab);
        return true;
      }
    });
  };

  return (
    <Bar>
      <Reorder.Group
        as="ul"
        axis="x"
        values={tabs}
        onReorder={setTabs}
        // layoutScroll
        style={{
          listStyle: "none",
          // flexGrow: 1,
          display: "flex",
          //   justifyContent: "flex-start",
          //   alignItems: "flex-end",
          flexWrap: "nowrap",
          padding: 5,
          margin: 0,
          // overflowX: "scroll",
          //   paddingRight: "10px",
        }}
      >
        <AnimatePresence initial={false}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              item={tab}
              onClick={() => {
                setActiveTab(tab);
              }}
              isSelected={activeTab === tab.id}
              onRemove={() => handleRemoveClick(tab.id)}
              removable={tabs.length > 1}
              peerCount={tabs.length - 1}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <DropdownTrigger
        triggerComponent={PlusButton}
        triggerProps={{ color: "vibrant", children: <FiPlus /> }}
      >
        <MenuItem key="newtab" onClick={addTab}>
          <ListItemIcon>
            <FiPlus />
          </ListItemIcon>
          <ListItemText>New Tab</ListItemText>
        </MenuItem>
        {hiddenTabs.length > 0 && (
          <DropdownTrigger
            triggerComponent={MenuItem}
            triggerProps={{
              children: (
                <>
                  <ListItemIcon>
                    <FiFolder />
                  </ListItemIcon>
                  <ListItemText>Open Existing...</ListItemText>
                </>
              ),
            }}
          >
            {hiddenTabs.map((tab) => (
              <MenuItem
                key={tab.id}
                onClick={() => setTabVisibility(tab.id, true)}
              >
                <ListItemIcon>
                  <FiFile />
                </ListItemIcon>
                <ListItemText>{tab.title}</ListItemText>
              </MenuItem>
            ))}
          </DropdownTrigger>
        )}
      </DropdownTrigger>
      <Dialog
        open={deleteFocus !== null}
        onClose={() => setDeleteFocus(null)}
        TransitionComponent={SlideUpTransition}
      >
        <DialogTitle>Delete "{deleteFocus?.title}"?</DialogTitle>
        <DialogContent>
          <DialogContentText noWrap={false}>
            Are you sure you want to delete this tab?{" "}
            {deleteFocus?.blocks?.length > 0
              ? `Deleting this tab will remove  ${deleteFocus.blocks.length}+ blocks.`
              : "This tab has no contents."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            key="confirm-delete"
            onClick={() => {
              removeTab(deleteFocus.id);
              setDeleteFocus(null);
            }}
          >
            Delete
          </Button>
          <Button
            color="vibrant"
            key="confirm-cancel"
            onClick={() => setDeleteFocus(null)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Bar>
  );
};

const Tab = ({ item, onClick, onRemove, isSelected, peerCount = 2 }) => {
  const [editing, setEditing] = useState(false);
  const renameTab = useProgrammingStore((state) => state.renameTab);
  const setTabVisibility = useProgrammingStore(
    (state) => state.setTabVisibility,
    shallow
  );

  const theme = useTheme();

  const darkerPrimary = darken(theme.palette.primary.main,0.5);

  const TABVARIANTS = {
    inactiveFocused: {
      backgroundColor: "#444",
      // border: "1px solid #444",
      boxShadow: "inset 0px 0px 0px 2px #444",
      flex: 1,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    inactive: {
      backgroundColor: "#333",
      // border: "1px solid #333",
      boxShadow: "inset 0px 0px 0px 2px #333",
      flex: 1,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    activeFocused: {
      backgroundColor: "#444",
      // border: "1px solid lightblue",
      boxShadow: `inset 0px 0px 0px 2px ${theme.palette.primary.main}`,
      flex: peerCount,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    active: {
      backgroundColor: "#333",
      // border: "1px solid cyan",
      boxShadow: `inset 0px 0px 0px 2px ${darkerPrimary}`,
      flex: peerCount,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
  };

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <Reorder.Item
        value={item}
        id={item.id}
        dragListener={!editing}
        onClick={onClick}
        onDoubleClick={() => setEditing(true)}
        // initial={{ opacity: 0 }}
        style={{ borderRadius: 5, marginRight: 5 }}
        // animate={{
        //   opacity: 1,
        //   y: 0,
        //   transition: { duration: 0.15 },
        // }}
        animate={
          isSelected && editing
            ? "activeFocused"
            : isSelected && !editing
            ? "active"
            : !isSelected && editing
            ? "inactiveFocused"
            : "inactive"
        }
        variants={TABVARIANTS}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        whileDrag={"activeFocused"}
        className={isSelected ? "selected" : ""}
      >
        {/* <motion.div
          variants={TABVARIANTS}
          onClick={onClick}
          onDoubleClick={() => setEditing(true)}
          style={{ borderRadius: 3 }}
          animate={
            isSelected && editing
              ? "activeFocused"
              : isSelected && !editing
              ? "active"
              : !isSelected && editing
              ? "inactiveFocused"
              : "inactive"
          }
        > */}
        <TextField
          value={item.title}
          disabled={!editing}
          fullWidth
          onChange={(e) => renameTab(item.id, e.target.value)}
          size="small"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: {
              backgroundColor: "transparent",
              paddingLeft: 10,
              paddingTop: 4,
              readOnly: !editing,
            },
            endAdornment: (
              <InputAdornment position="end">
                <DropdownTrigger
                  triggerComponent={IconButton}
                  triggerProps={{
                    children: <FiX />,
                    size: "small",
                    color: isSelected ? "primary" : "mid",
                    sx: {
                      borderRadius: 1,
                      marginRight: 0.5,
                      height: 26,
                      marginBottom: 0.2,
                      color: isSelected && editing ? theme.palette.primary.main : isSelected ? darkerPrimary : "#777",
                      backgroundColor: isSelected ? "#00000050" : "#50505020"
                      // boxShadow: `inset 0px 0px 0px 1px ${
                      //   isSelected ? theme.palette.primary.main : "#555"
                      // }`,
                    },
                  }}
                >
                  <MenuItem
                    key="hide"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setTabVisibility(item.id, false);
                    }}
                  >
                    <ListItemIcon>
                      <FiEyeOff />
                    </ListItemIcon>
                    <ListItemText>Hide</ListItemText>
                  </MenuItem>
                  <MenuItem
                    key="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemove();
                    }}
                  >
                    <ListItemIcon>
                      <FiTrash />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </DropdownTrigger>
              </InputAdornment>
            ),
          }}
        />
        {/* </motion.div> */}
        {/* <TabButton
          selected={isSelected}
          onClick={onClick}
          onDoubleClick={() => setEditing(true)}
        >
          <TextField
            value={item.title}
            disabled={!editing}
            onChange={(e) => renameTab(item.id, e.target.value)}
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                width: 100,
                backgroundColor: editing ? "#444" : null,
                borderRadius: 4,
                paddingLeft: 10,
                paddingTop: 4,
              },
            }}
          />
          <DropdownTrigger
            triggerComponent={IconButton}
            triggerProps={{
              children: <FiX />,
              size: "small",
              color: isSelected ? "primary" : "mid",
              sx: { marginLeft: 1 },
            }}
          >
            <MenuItem
              key="hide"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setTabVisibility(item.id, false);
              }}
            >
              <ListItemIcon>
                <FiEyeOff />
              </ListItemIcon>
              <ListItemText>Hide</ListItemText>
            </MenuItem>
            <MenuItem
              key="delete"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onRemove();
              }}
            >
              <ListItemIcon>
                <FiTrash />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </DropdownTrigger>
        </TabButton> */}
      </Reorder.Item>
    </ClickAwayListener>
  );
};
