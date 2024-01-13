// useLocalStorageSelections.js
import { useState, useEffect } from 'react';

export const useLocalStorageSelections = (storageKey) => {
  const [localStorageItems, setLocalStorageItems] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(localStorageItems));
  }, [localStorageItems, storageKey]);

  const addToSlip = (event) => {
    const clickedElement = event.target;
    const elementId = clickedElement.id;
    const elementClass = clickedElement.className;

    // Create a new array instead of modifying the existing one
    const updatedItems = [...localStorageItems];

    const selectionIndex = updatedItems.findIndex(
      (item) => item.id === elementId && item.className === elementClass
    );

    if (selectionIndex !== -1) {
      // Remove if already exists
      updatedItems.splice(selectionIndex, 1);
    } else {
      // Add to array
      updatedItems.push({ id: elementId, className: elementClass });
    }

    setLocalStorageItems(updatedItems);
    console.log(`${storageKey}:`);
    console.log(updatedItems);
  };

  return { localStorageItems, addToSlip };
};
