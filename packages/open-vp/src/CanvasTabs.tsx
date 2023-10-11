import React, { useState, forwardRef } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { ProgrammingState, Tab, useProgrammingStore } from "@people_and_robots/open-core";
import {
  FiX,
  FiPlus,
  FiFolder,
  FiFile,
  FiTrash,
  FiEyeOff,
  FiMoreHorizontal,
} from "react-icons/fi";
import { styled, darken, useTheme, lighten } from "@mui/material/styles";
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
  Theme,
  Stack
} from "@mui/material";
import { NestedDropdown, TextInput } from "@people_and_robots/open-gui";

// const SlideUpTransition = forwardRef(({children, ...props}, ref) => (
//   <Slide direction="up" ref={ref} {...props}>{children}</Slide>
// ));

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
  width: "100%",
  display: "grid",
  height: "45px",
  gridTemplateColumns: "auto 46px",
  // padding: 5,
}, ({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? lighten(theme.palette.background.default,0.1) : darken(theme.palette.background.default,0.1),
}));

export const CanvasTabs = ({}) => {
  const tabs = useProgrammingStore(
    (state:ProgrammingState) => state.tabs.filter((t) => t.visible)
  );
  const hiddenTabs = useProgrammingStore(
    (state:ProgrammingState) => state.tabs.filter((t) => !t.visible)
  );
  const setTabs = useProgrammingStore((state:ProgrammingState) => state.setTabs);
  const activeTab = useProgrammingStore((state:ProgrammingState) => state.activeTab);
  const setActiveTab = useProgrammingStore(
    (state:ProgrammingState) => state.setActiveTab
  );
  const removeTab = useProgrammingStore((state:ProgrammingState) => state.removeTab);
  const addTab = useProgrammingStore((state:ProgrammingState) => state.addTab);
  const setTabVisibility = useProgrammingStore(
    (state:ProgrammingState) => state.setTabVisibility
  );
  const [deleteFocus, setDeleteFocus] = useState<Tab|null>(null);
  const handleRemoveClick = (tabId: string) => {
    tabs.some((tab: Tab) => {
      if (tab.id === tabId) {
        setDeleteFocus(tab);
        return true;
      }
    });
  };

  // console.log("tabs", tabs)
  // console.log("hidden tabs",hiddenTabs)

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
          {tabs.map((tab: Tab) => (
            <TabItem
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
      <div style={{padding:5}}>
        
      <NestedDropdown 
          data={{}}
          label="Edit Tabs"
          icon={<FiPlus />}
          inner={[
            { type: "HEADER", label: "Tab Actions" },
            { type: "DIVIDER" },
            {
              type: "ENTRY",
              label: "Add Tab",
              /* @ts-ignore */
              left: <FiPlus style={{ fontSize: 14}} />,
              onClick: addTab,
              preventCloseOnClick: true,
            },
            {
              type: "ENTRY",
              label: "Open Existing...",
              right: <FiFolder style={{ fontSize: 14}} />,
              inner: hiddenTabs.length >= 0 ? [
                { type: "HEADER", label: "Open Existing Tab" },
                ...hiddenTabs.map((tab: Tab) => (
                  {
                    type: "ENTRY",
                    onClick: () => setTabVisibility(tab.id, true),
                    label: tab.title,
                    left: <FiFile style={{ fontSize: 14}} />,
                  }
                )) 
              ]:[ {
                type: "ENTRY",
                label: "No Hidden Tabs"
              }],
            },
          ]}
        />

      </div>
      <Dialog
        open={deleteFocus !== null}
        onClose={() => setDeleteFocus(null)}
      >
        <DialogTitle>Delete "{deleteFocus?.title}"?</DialogTitle>
        <DialogContent>
          <DialogContentText noWrap={false}>
            Are you sure you want to delete this tab?{" "}
            {deleteFocus?.blocks?.length
              ? `Deleting this tab will remove  ${deleteFocus.blocks.length}+ blocks.`
              : "This tab has no contents."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            key="confirm-delete"
            onClick={() => {
              if (deleteFocus?.id) {
                removeTab(deleteFocus.id);
                setDeleteFocus(null);
              }
              
            }}
          >
            Delete
          </Button>
          <Button
            // color="vibrant"
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

interface TabItemProps {
  item: Tab;
  onClick: () => void;
  onRemove: () => void;
  removable?: boolean;
  isSelected: boolean;
  peerCount: number;
}
const TabItem = ({ item, onClick, onRemove, isSelected, peerCount = 2, removable }: TabItemProps) => {
  const [editing, setEditing] = useState(false);
  const renameTab = useProgrammingStore((state:ProgrammingState) => state.renameTab);
  const setTabVisibility = useProgrammingStore(
    (state:ProgrammingState) => state.setTabVisibility
  );

  const theme: Theme = useTheme();

  const darkerPrimary = darken(theme.palette.primary.main,0.2);

  const TABVARIANTS = {
    inactiveFocused: {
      // backgroundColor: theme.palette.mode === 'dark' ? lighten(theme.palette.background.paper, 0.3) : darken(theme.palette.background.paper, 0.3),
      // border: "1px solid #444",
      // boxShadow: "inset 0px 0px 0px 2px #444",
      flex: 1,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    inactive: {
      // backgroundColor: "#333",
      // border: "1px solid #333",
      // boxShadow: "inset 0px 0px 0px 2px #333",
      flex: 1,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    activeFocused: {
      // backgroundColor: theme.palette.mode === 'dark' ? lighten(theme.palette.background.paper, 0.3) : darken(theme.palette.background.paper, 0.3),
      // border: "1px solid lightblue",
      // boxShadow: `inset 0px 0px 0px 2px ${theme.palette.primary.main}`,
      flex: peerCount,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    active: {
      // backgroundColor: "transparent",
      // border: "1px solid cyan",
      // boxShadow: `inset 0px 0px 0px 2px ${darkerPrimary}`,
      flex: peerCount,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
  };

  // console.log("tab item", item)

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <Reorder.Item
        value={item}
        id={item.id}
        dragListener={!editing}
        onClick={onClick}
        onDoubleClick={() => setEditing(true)}
        // initial={{ opacity: 0 }}
        style={{ borderRadius: 5, marginRight: 5, backgroundColor:'transparent' }}
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
        exit={{ opacity: 0, y: 0, transition: { duration: 0.3 } }}
        whileDrag={"activeFocused"}
        className={isSelected ? "selected" : ""}
      >
        <TextInput
          value={item.title}
          hideLabelPrefix={true}

          // disabled={!editing}
          onChange={(e) => renameTab(item.id, e.target.value)}
          extra={
            <NestedDropdown 
              data={{}}
              label="Edit Tab"
              size="small"
              icon={<FiX />}
              inner={[
                { type: "HEADER", label: "Tab Actions" },
                {
                  type: "ENTRY",
                  label: "Hide Tab",
                  /* @ts-ignore */
                  left: <FiEyeOff />,
                  onClick:() => {
                    setTabVisibility(item.id, false);
                  }
                },
                {
                  type: "ENTRY",
                  label: "Delete Tab",
                  /* @ts-ignore */
                  left: <FiTrash />,
                  onClick:() => {
                    onRemove();
                  }
                },
                { type: "DIVIDER" },
                {
                  type: "ENTRY",
                  label: "More...",
                  inner: [
                    { type: "HEADER", label: "Inner Menu" },
                    {
                      type: "ENTRY",
                      right: "⇧+⌘+N",
                      /* @ts-ignore */
                      label: (d: DataType) => `Piped Name: ${d.name}`,
                    },
                  ],
                },
              ]}
          />}
          />
      </Reorder.Item>
    </ClickAwayListener>
  );
};
