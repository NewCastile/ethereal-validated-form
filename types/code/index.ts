export interface CodeContextProps {
  codeState: CodeState;
  codeDispatcher: React.Dispatch<CodeAction>;
}

export interface CodeState {
  code: string;
}

export interface SetCodeAction {
  type: 'RESET';
}

export type CodeAction = SetCodeAction;
