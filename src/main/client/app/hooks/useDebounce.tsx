import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

// A naive implementation of debounce which delays the execution of the callback fn
export function useDebounce(callback: () => void, delay = 1000) {
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (shouldSave) {
      setShouldSave(false);
      callback();
    }
  }, [shouldSave, callback]);

  const [returnCallback] = useState(() => debounce(() => setShouldSave(true), delay));

  return returnCallback;
}
