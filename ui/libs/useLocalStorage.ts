import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error setting value to localStorage", error);
    }
  };

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      const data = item ? JSON.parse(item) : defaultValue;
      setStoredValue(data);
    } catch (error) {
      console.error("Error getting value from localStorage", error);
    }
  }, [key, defaultValue]);

  return [storedValue, setValue];
}
