import "./styles.css";
import { useState } from "react";
import Structure from "./Structure";

export default function App() {
  const [structure, setStructure] = useState([
    {
      id: "1",
      name: "root",
      type: "folder",
      canShow: true,
      children: [
        {
          parent: "1",
          id: "2",
          name: "public",
          type: "folder",
          canShow: false,
          children: [
            {
              parent: "2",
              id: "3",
              name: "public-nested-file",
              type: "file",
              canShow: false,
            },
          ],
        },
        {
          parent: "1",
          id: "4",
          name: "src",
          type: "folder",
          canShow: false,
          children: [
            {
              parent: "4",
              id: "5",
              name: "components",
              type: "folder",
              canShow: false,
              children: [
                {
                  parent: "5",
                  id: "16",
                  name: "index.html",
                  type: "folder",
                  canShow: false,
                },
                {
                  parent: "5",
                  id: "6",
                  name: "index.css",
                  type: "folder",
                  canShow: false,
                },
              ],
            },
            {
              parent: "4",
              id: "7",
              name: "main.jsx",
              type: "file",
              canShow: false,
            },
          ],
        },
        {
          parent: "1",
          id: "21",
          name: "package.json",
          type: "file",
          canShow: false,
        },
        {
          parent: "1",
          id: "22",
          name: "package-lock.json",
          type: "file",
          canShow: false,
        },
      ],
    },
  ]);

  const locateElement = (id, structure) => {
    for (const elem of structure) {
      if (elem.id === id) {
        return elem;
      }
      if (elem.children) {
        const elemFound = locateElement(id, elem.children);
        if (elemFound) {
          return elemFound;
        }
      }
    }
  };

  const onInputChange = (id, changedInput) => {
    const newArray = [...structure];
    const locatedElement = locateElement(id, newArray);
    if (locatedElement) {
      locatedElement.name = changedInput;
    }

    setStructure(newArray);
  };

  const onDelete = (id, parent) => {
    const newArray = [...structure];
    const locatedParent = locateElement(parent, newArray);
    locatedParent.children = locatedParent.children.filter(
      (el) => el.id !== id
    );
    setStructure(newArray);
  };

  const addNewType = (type, parent) => {
    const newArray = [...structure];
    const locatedParent = locateElement(parent, newArray);
    if (locatedParent.children) {
      locatedParent.children.push({
        parent: parent,
        id: Date.now(),
        name: undefined,
        type: type,
        canShow: false,
      });
    } else {
      locatedParent["children"] = [
        {
          parent: parent,
          id: Date.now(),
          name: undefined,
          type: type,
          canShow: false,
        },
      ];
    }
    setStructure(newArray);
  };

  const showAllChildren = (id) => {
    const newArray = [...structure];
    const locatedParent = locateElement(id, newArray);
    locatedParent.children.forEach((child) => (child.canShow = true));

    setStructure(newArray);
  };

  const renderStructure = (structure, level = 0) => {
    return structure.map((el, index) => {
      // If el.show is false, return null to avoid rendering anything for this element
      if (!el.canShow) return null;

      return (
        <div
          key={el.id}
          className="outer-structure"
          style={{ marginLeft: `${level * 10}px` }}
        >
          <Structure
            info={el}
            onInputChange={onInputChange}
            onDelete={onDelete}
            addNewType={addNewType}
            showAllChildren={showAllChildren}
          />

          {/* Recursively render children if el has children */}
          {el.children && renderStructure(el.children, level + 1)}
        </div>
      );
    });
  };
  return (
    <div className="App">
      <h1>File Explorer</h1>
      <div className="file-explorer-container">
        {renderStructure(structure)}
      </div>
    </div>
  );
}
