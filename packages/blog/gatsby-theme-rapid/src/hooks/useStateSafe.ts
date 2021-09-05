import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const useStateSafe = <S = undefined>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>();
  useEffect(() => {
    setState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state, setState];
};
