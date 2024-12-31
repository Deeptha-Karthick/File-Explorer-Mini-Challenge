import { useState, useRef } from "react";

const Structure = ({
  info,
  onInputChange,
  onDelete,
  addNewType,
  showAllChildren,
}) => {
  const { id, type, name, parent } = info;
  const folder = "📂";
  const file = "📄";
  const edit = "✏️";
  const deleteIcon = "🗑️";

  const [editMode, setEditMode] = useState(name === undefined);
  const [input, setInput] = useState(name);

  const onEditClick = () => {
    setEditMode(true);
  };

  const updateInput = () => {
    if (name === undefined && input === undefined) {
      onDelete(id, parent);
    }
    setEditMode(false);
    onInputChange(id, input);
  };
  const onClickingEnter = (e) => {
    if (e.code === "Enter") {
      updateInput();
    }
  };

  return (
    <div className="outer-div">
      <div
        className="content"
        onClick={() => type === "folder" && showAllChildren(id)}
      >
        <div>{type === "folder" ? folder : file}</div>
        {editMode ? (
          <div>
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                onClickingEnter(e);
              }}
              onBlur={() => updateInput()}
            />
          </div>
        ) : (
          <div>{name}</div>
        )}
      </div>
      {!editMode && (
        <div className="actions">
          {id !== "1" && <div onClick={onEditClick}>{edit}</div>}
          {type === "folder" && (
            <>
              <div onClick={() => addNewType("file", id)}>{file}</div>
              <div onClick={() => addNewType("folder", id)}>{folder}</div>
            </>
          )}
          {id !== "1" && (
            <div onClick={() => onDelete(id, parent)}>{deleteIcon}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Structure;
