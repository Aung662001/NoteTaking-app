import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (data === null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(data);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
