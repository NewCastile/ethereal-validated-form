import { createContext, ReactElement, useContext, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CodeAction, CodeContextProps, CodeState } from '../types/code';

export const CodeContext = createContext<CodeContextProps>({} as CodeContextProps);

export const initialState = {
  code: uuidv4(),
};

const reducer = (state: CodeState, action: CodeAction) => {
  switch (action.type) {
    case 'RESET':
      return {
        code: uuidv4(),
      };
    default:
      return state;
  }
};

export const CodeProvider = ({ init, children }: { init: CodeState; children: ReactElement }) => {
  const [state, dispatcher] = useReducer(reducer, init);

  const contextValue = useMemo(() => ({ codeState: state, codeDispatcher: dispatcher }), [state]);

  return <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>;
};

export const useCodeContext = () => {
  const context = useContext(CodeContext);

  if (context === undefined) {
    throw new Error('useCodeContext must be used within a CodeProvider');
  }

  return context;
};
