import { useState, useEffect } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import {
  ProgrammingState,
  Tab,
  useProgrammingStore,
} from "@people_and_robots/open-core";
import {
  styled,
  darken,
  useTheme,
  lighten,
  ClickAwayListener,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Theme,
} from "@mui/material";
import {
  NestedDropdown,
  TextInput,
  Dialog,
  IconTextButton,
} from "@people_and_robots/open-gui";

const Bar = styled("div")(
  {
    width: "100%",
    display: "grid",
    height: "45px",
    alignItems: "center",
    gridTemplateColumns: "auto 46px",
    // padding: 5,
  },
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? lighten(theme.palette.background.default, 0.1)
        : darken(theme.palette.background.default, 0.1),
  }),
);

export const CanvasTabs = ({}) => {
  const tabs = useProgrammingStore((state: ProgrammingState) =>
    state.tabs.filter((t) => t.visible),
  );
  const hiddenTabs = useProgrammingStore((state: ProgrammingState) =>
    state.tabs.filter((t) => !t.visible),
  );
  const setTabs = useProgrammingStore(
    (state: ProgrammingState) => state.setTabs,
  );
  const activeTab = useProgrammingStore(
    (state: ProgrammingState) => state.activeTab,
  );
  const setActiveTab = useProgrammingStore(
    (state: ProgrammingState) => state.setActiveTab,
  );
  const removeTab = useProgrammingStore(
    (state: ProgrammingState) => state.removeTab,
  );
  const addTab = useProgrammingStore((state: ProgrammingState) => state.addTab);
  const setTabVisibility = useProgrammingStore(
    (state: ProgrammingState) => state.setTabVisibility,
  );
  const [deleteFocus, setDeleteFocus] = useState<Tab | null>(null);
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
              onSelect={() => {
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

      <div style={{ width: 34, height: 34, display: "flex" }}>
        <NestedDropdown
          data={{}}
          label="Edit Tabs"
          icon="AddRounded"
          inner={[
            { type: "HEADER", label: "Tab Actions" },
            { type: "DIVIDER" },
            {
              type: "ENTRY",
              label: "Add Tab",
              /* @ts-ignore */
              left: "AddRounded",
              onClick: addTab,
              preventCloseOnClick: true,
            },
            {
              type: "ENTRY",
              label: "Open Existing...",
              right: "FolderOpenRounded",
              inner:
                hiddenTabs.length >= 0
                  ? [
                      { type: "HEADER", label: "Open Existing Tab" },
                      ...hiddenTabs.map((tab: Tab) => ({
                        type: "ENTRY",
                        onClick: () => setTabVisibility(tab.id, true),
                        label: tab.title,
                        left: "InsertDriveFileRounded",
                      })),
                    ]
                  : [
                      {
                        type: "ENTRY",
                        label: "No Hidden Tabs",
                      },
                    ],
            },
          ]}
        />
      </div>

      <Dialog
        isOpen={deleteFocus !== null}
        onStateChange={() => setDeleteFocus(null)}
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
          <IconTextButton
            key="confirm-delete"
            title="Delete"
            color="error"
            onClick={() => {
              if (deleteFocus?.id) {
                removeTab(deleteFocus.id);
                setDeleteFocus(null);
              }
            }}
          >
            Delete
          </IconTextButton>
          <IconTextButton
            title="Cancel"
            key="confirm-cancel"
            onClick={() => setDeleteFocus(null)}
          >
            Cancel
          </IconTextButton>
        </DialogActions>
      </Dialog>
    </Bar>
  );
};

interface TabItemProps {
  item: Tab;
  onSelect: () => void;
  onRemove: () => void;
  removable?: boolean;
  isSelected: boolean;
  peerCount: number;
}
const TabItem = ({
  item,
  onRemove,
  isSelected,
  peerCount = 2,
  onSelect,
}: TabItemProps) => {
  const [editing, setEditing] = useState(false);
  const renameTab = useProgrammingStore(
    (state: ProgrammingState) => state.renameTab,
  );
  const setTabVisibility = useProgrammingStore(
    (state: ProgrammingState) => state.setTabVisibility,
  );

  const theme: Theme = useTheme();

  const TABVARIANTS = {
    inactive: {
      flex: 1,
      boxShadow: "0px 0px 0px 0px transparent",
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    active: {
      boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
      // backgroundColor: theme.palette.mode === "dark" ? lighten(theme.palette.primary.main,0.1) : darken(theme.palette.primary.main,0.1),
      flex: peerCount + 1,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    initial: {
      flex: 1,
      boxShadow: "0px 0px 0px 0px transparent",
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
  };

  useEffect(() => {
    setEditing(isSelected);
  }, [isSelected]);

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <Reorder.Item
        value={item}
        id={item.id}
        dragListener={!editing}
        onClick={onSelect}
        onDoubleClick={() => setEditing(true)}
        // initial={{ opacity: 1 }}
        style={{
          borderRadius: 5,
          marginRight: 5,
          backgroundColor: "transparent",
        }}
        animate={isSelected ? "active" : "inactive"}
        initial="initial"
        variants={TABVARIANTS}
        exit={{ opacity: 0, y: 0, transition: { duration: 0.3 } }}
        whileDrag="active"
        className={isSelected ? "selected" : ""}
      >
        <TextInput
          value={item.title}
          hideLabelPrefix
          // disabled={!editing}

          onFocus={() => {
            onSelect();
            setEditing(true);
          }}
          onBlur={() => setEditing(false)}
          onChange={(e) => renameTab(item.id, e.target.value)}
          extra={
            <NestedDropdown
              data={{}}
              label="Edit Tab"
              size="small"
              icon="CloseRounded"
              inner={[
                { type: "HEADER", label: "Tab Actions" },
                {
                  type: "ENTRY",
                  label: "Hide Tab",
                  /* @ts-ignore */
                  left: "VisibilityOffRounded",
                  onClick: () => {
                    setTabVisibility(item.id, false);
                  },
                },
                {
                  type: "ENTRY",
                  label: "Delete Tab",
                  /* @ts-ignore */
                  left: "DeleteRounded",
                  onClick: () => {
                    onRemove();
                  },
                },
              ]}
            />
          }
        />
      </Reorder.Item>
    </ClickAwayListener>
  );
};
