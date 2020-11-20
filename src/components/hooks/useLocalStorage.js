import { useState } from 'react';

// Hook
export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function getLocalStorage(key, initialValue) {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
}

export function setOrGetLocalStorage(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue

    if (item) {
      const localStorageKeys = Object.keys(JSON.parse(item));
      const initialValueKeys = Object.keys(initialValue);

      console.log(localStorageKeys);
      console.log(initialValueKeys);
    }

    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}

export function setLocalStorage(key, value) {
  try {
    // Get from local storage by key
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // If error also return initialValue
    console.error(error);
  }
}
