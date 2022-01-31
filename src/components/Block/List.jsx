import { Block } from ".";
import { DropRegion } from "./DropRegion";

export const List = ({ ids, parentId, fieldInfo, interactionDisabled, highlightColor, context }) => {
  // const setField = useStore((store) => store.setField);
  const minHeight = ids.length === 0 ? 30 : 8;

  return (
    <div
      className="nodrag"
      style={{
        padding: 4,
        backgroundColor: "#00000088",
        borderRadius: 3,
        minHeight: 30,
        minWidth: 190,
        margin: 4
      }}
    >
      <DropRegion
        key="initial"
        id={null}
        parentId={parentId}
        fieldInfo={fieldInfo}
        idx={0}
        minHeight={minHeight}
        disabled={interactionDisabled}
        hideText
        highlightColor={highlightColor}
        context={context}
      />
      {ids.map((id, idx) => (
        <Block
          key={id}
          id={id}
          parentId={parentId}
          fieldInfo={fieldInfo}
          idx={idx}
          bounded
          highlightColor={highlightColor}
          context={context}
          after={
            <DropRegion
              key={`dropzone-${idx}`}
              id={null}
              parentId={parentId}
              fieldInfo={fieldInfo}
              idx={idx + 1}
              minHeight={8}
              hideText
              disabled={interactionDisabled}
              highlightColor={highlightColor}
              context={context}
            />
          }
        />
      ))}
    </div>
  );
};
