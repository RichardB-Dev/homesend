import { useState } from "react";
import { limits } from "./branding";
import { readSelection, writeSelection } from "./storage";

export function useShortlist() {
  const [selected, setSelected] = useState(readSelection);
  const [limitNote, setLimitNote] = useState(false);

  function toggle(id: string) {
    setSelected((current) => {
      if (current.includes(id)) {
        const next = current.filter((item) => item !== id);
        writeSelection(next);
        setLimitNote(false);
        return next;
      }
      if (current.length >= limits.properties) {
        setLimitNote(true);
        return current;
      }
      const next = [...current, id];
      writeSelection(next);
      setLimitNote(false);
      return next;
    });
  }

  function clear() {
    writeSelection([]);
    setSelected([]);
    setLimitNote(false);
  }

  return { selected, limitNote, toggle, clear };
}
