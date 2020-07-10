import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

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
