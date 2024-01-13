// useLocalStorageSelections.js
import { useState } from 'react';

export const useLocalStorageSelections = (storageKey) => {

  const [localStorageItems, setLocalStorageItems] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );

  const addToSlip = (event) => {
    const clickedElement = event.target;
    const elementId = clickedElement.id;
    const elementClass = clickedElement.className;

    const selection = { id: elementId, className: elementClass };

    const selectionIndex = localStorageItems.findIndex(
      (item) => item.id === elementId && item.className === elementClass
    );

    if (selectionIndex !== -1) {
      localStorageItems.splice(selectionIndex, 1);
    } else {
      localStorageItems.push(selection);
    }

    localStorage.setItem(storageKey, JSON.stringify(localStorageItems));
    setLocalStorageItems([...localStorageItems]);
    console.log(`${storageKey}:`);
    console.log(localStorageItems);
  };

  return { localStorageItems, addToSlip };
};
