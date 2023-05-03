import { useEffect } from "react";

export const useKeyDown = (callback: () => void, keys: string[]) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => event.key === key);
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });
};
