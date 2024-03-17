import {
  FirstFormCompletionActionArgs,
  SecondFormCompletionActionArgs,
  ThirdFormCompletionActionArgs,
} from '../types/form';
import { NotificationStatus } from '../types/notification';

import { useCodeContext } from './useCode';
import { useCompletionContext } from './useCompletion';
import { useFormContext } from './useForm';
import { useNotificationContext } from './useNotification';

export const useFormActions = () => {
  const { formDispatcher } = useFormContext();
  const { notificationDispatcher } = useNotificationContext();
  const { completionDispatcher } = useCompletionContext();
  const { codeDispatcher } = useCodeContext();
  const dispatch = {
    notificationAction: notificationDispatcher,
    completionAction: completionDispatcher,
    formAction: formDispatcher,
    codeAction: codeDispatcher,
  };
  const onValidationHandler = (status: NotificationStatus, message: string) => {
    dispatch.notificationAction({ type: status, payload: { message } });
  };
  const onFirstStepCompletionHandler = (args: FirstFormCompletionActionArgs) => {
    dispatch.formAction({
      type: 'LOAD_FIRST_FORM',
      payload: {
        email: args.email,
        username: args.username,
      },
    });
    dispatch.completionAction({
      type: 'FIRST_STEP_COMPLETED',
    });
    dispatch.notificationAction({
      type: 'SUCCESS',
      payload: { message: args.notificationMessage },
    });
  };
  const onSecondStepCompletionHandler = (args: SecondFormCompletionActionArgs) => {
    if (args.inputCode) {
      if (args.inputCode === args.currentCode) {
        dispatch.formAction({
          type: 'LOAD_SECOND_FORM',
          payload: { validation_code: args.inputCode },
        });
        dispatch.completionAction({ type: 'SECOND_STEP_COMPLETED' });
        dispatch.notificationAction({
          type: 'SUCCESS',
          payload: {
            message: 'Now complete the following form to end the process',
          },
        });

        return;
      }
      dispatch.completionAction({ type: 'INVALIDATE_CODE' });
      dispatch.notificationAction({
        type: 'ERROR',
        payload: { message: 'Wrong validation code' },
      });
      dispatch.codeAction({ type: 'RESET' });
    }
  };
  const onThirdStepCompletionHandler = (args: ThirdFormCompletionActionArgs) => {
    try {
      if (!args.termsAccepted) throw new Error('You have to accept our terms');
      dispatch.formAction({
        type: 'LOAD_THIRD_FORM',
        payload: {
          country: args.country,
          city: args.city,
          accepted_terms: 'ACCEPTED',
        },
      });
      dispatch.completionAction({ type: 'THIRD_STEP_COMPLETED' });
      dispatch.notificationAction({ type: 'RESET' });
    } catch (err: any) {
      dispatch.notificationAction({
        type: 'ERROR',
        payload: { message: decodeURI(err.message) },
      });
    }
  };
  const onGoBackSecondFormHandler = () => {
    dispatch.completionAction({ type: 'INVALIDATE_CODE' });
    dispatch.codeAction({ type: 'RESET' });
    dispatch.notificationAction({ type: 'RESET' });
  };
  const onGoBackThirdFormHandler = () => {
    dispatch.completionAction({ type: 'RESET' });
    dispatch.codeAction({ type: 'RESET' });
    dispatch.notificationAction({ type: 'RESET' });
  };

  return {
    onFirstStepCompletionHandler,
    onSecondStepCompletionHandler,
    onThirdStepCompletionHandler,
    onGoBackSecondFormHandler,
    onGoBackThirdFormHandler,
    onValidationHandler,
  };
};
