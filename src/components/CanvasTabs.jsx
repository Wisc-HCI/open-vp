import React, { memo, useState, forwardRef } from "react";
import { Reorder, AnimatePresence, motion, calcLength } from "framer-motion";
import { useProgrammingStore } from "./ProgrammingContext";
import { shallow } from "zustand/shallow";
import {
  FiX,
  FiPlus,
  FiFolder,
  FiFile,
  FiDelete,
  FiTrash,
  FiEyeOff,
} from "react-icons/fi";
import { emphasize, styled, darken } from "@mui/material/styles";
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
} from "@mui/material";
import { DropdownTrigger } from "./Block/Utility";

const SlideUpTransition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const PlusButton = styled(IconButton)(
  {
    borderRadius: 0,
    borderLeft: "1.5px solid #222",
  },
  ({ theme }) => ({
    "&:hover": { backgroundColor: darken(theme.palette.primary.main, 0.8) },
  })
);

const Bar = styled("div")({
  background: "black",
  //   display:'flex',
  width: "100%",
  display: "grid",
  //   padding: "5px 5px 0",
  borderBottom: "1px solid #333",
  height: "45px",
  //   display: "grid",
  gridTemplateColumns: "auto 46px",
  //   maxWidth: "480px",
});

const TabButton = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected",
})(
  {
    fontFamily: "helvetica",
    flex: 1,
    alignContent: "center",
    // width: "100%",
    padding: "10px 15px",
    // position: "relative",
    cursor: "pointer",
    height: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 0,
    borderLeft: "0.5px solid #222",
    borderRight: "0.5px solid #222",
    // overflow: "hidden",
    userSelect: "none",
    overflowY: "none",
    //   minWidth: 175,
    //   borderRadius: 3,
    //   display: "block"
  },
  ({ selected, theme }) => ({
    //   width: bounded ? "inherit" : "max-content",
    //   flex: bounded ? 1 : null,
    "&:hover": {
      backgroundColor: "#222",
    },
    borderBottom: selected
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.mid.main}`,
    // color: selected ? "black" : theme.palette.primary.main,
    color: selected ? theme.palette.primary.main : theme.palette.mid.main,
  })
);

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
        layoutScroll
        style={{
          listStyle: "none",
          //   flexGrow: 1,
          display: "flex",
          //   justifyContent: "flex-start",
          //   alignItems: "flex-end",
          flexWrap: "nowrap",
          padding: 0,
          margin: 0,
          overflowX: "scroll",
          //   paddingRight: "10px",
        }}
      >
        <AnimatePresence initial={false}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              item={tab}
              onClick={() => {setActiveTab(tab)}}
              isSelected={activeTab === tab.id}
              onRemove={() => handleRemoveClick(tab.id)}
              removable={tabs.length > 1}
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

const Tab = ({ item, onClick, onRemove, isSelected, removable }) => {
  const [editing, setEditing] = useState(false);
  const renameTab = useProgrammingStore((state) => state.renameTab);
  const setTabVisibility = useProgrammingStore(
    (state) => state.setTabVisibility,
    shallow
  );

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragListener={!editing}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        //   backgroundColor: isSelected ? "#f3f3f3" : "#fff",
        y: 0,
        transition: { duration: 0.15 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: "#333" }}
      className={isSelected ? "selected" : ""}
    >
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <TabButton
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
        </TabButton>
      </ClickAwayListener>
    </Reorder.Item>
  );
};
