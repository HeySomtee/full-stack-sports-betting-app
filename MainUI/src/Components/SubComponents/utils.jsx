import { useState, useEffect } from 'react';

export const useLocalStorageSelections = (storageKey, data) => {
  const [localStorageItems, setLocalStorageItems] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );
  const [betSlip, setBetSlip] = useState([])

  // useEffect(() => {
  //   console.log(data);
  // }, [localStorageItems])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(localStorageItems));
  }, [localStorageItems, storageKey]);

  const addToSlip = (event) => {
    const clickedElement = event.target;
    const elementId = clickedElement.id;
    const elementClass = clickedElement.className;
    const updatedItems = [...localStorageItems];

    const selectionIndex = updatedItems.findIndex(
      (item) => item.id === elementId && item.className === elementClass
    );

    if (selectionIndex !== -1) {
      updatedItems.splice(selectionIndex, 1);
    } else {
      if (getClassNamesById(elementId).length < 2) {
        updatedItems.push({ id: elementId, className: elementClass});
      }
    }

    setLocalStorageItems(updatedItems);
    // console.log(`${storageKey}:`);
    // console.log(updatedItems);
  };

  const getClassNamesById = (id) => {
    const classNames = [];
    for (const item of localStorageItems) {
      if (item.id === id) {
        classNames.push(item.className);
      }
    }
    return classNames;
  };

  return { localStorageItems, addToSlip };
};
