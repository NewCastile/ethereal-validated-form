import React from 'react';

export type Step = 'VALIDATED' | 'NOT VALIDATED';

export interface CompletionState {
  first: Step;
  second: Step;
  third: Step;
}

export interface FirstStepCompletionAction {
  type: 'FIRST_STEP_COMPLETED';
}

export interface SecondStepCompletionAction {
  type: 'SECOND_STEP_COMPLETED';
}

export interface ThirdStepCompletionAction {
  type: 'THIRD_STEP_COMPLETED';
}

export interface InvalidateCodeAction {
  type: 'INVALIDATE_CODE';
}

export interface ResetStateAction {
  type: 'RESET';
}

export type CompletionAction =
  | FirstStepCompletionAction
  | SecondStepCompletionAction
  | ThirdStepCompletionAction
  | InvalidateCodeAction
  | ResetStateAction;

export interface CompletionContextProps {
  completionState: CompletionState;
  completionDispatcher: React.Dispatch<CompletionAction>;
}
