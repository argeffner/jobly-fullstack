import { useState, useEffect } from "react";

/** custom hook for updataing data to localstorage with state
 * 
 * Start with a key and value input, (if there is none then it returns null)
 * for useEffect it either updates the key and item in useState or it removes the key
 */

function useLocalStorage(key, val=null) {
  const initialVal = localStorage.getItem(key) || val;

  const [item, setItem] = useState(initialVal);

  useEffect(()=> {
    console.debug('useEffect for uselocalStorage hook', 'item=', item);

    if (item === null) { 
      localStorage.removeItem(key) 
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item])

  return [item, setItem];
}

export default useLocalStorage;