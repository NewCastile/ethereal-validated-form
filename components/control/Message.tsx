import { Button, Stack, Text } from '@chakra-ui/react';

import { useCodeContext } from '../../hooks/useCode';
import { useCompletionContext } from '../../hooks/useCompletion';
import { useFormContext } from '../../hooks/useForm';
import { useNotificationContext } from '../../hooks/useNotification';

export default function Message() {
  const { completionDispatcher } = useCompletionContext();
  const { codeDispatcher } = useCodeContext();
  const { formDispatcher } = useFormContext();
  const { notificationDispatcher } = useNotificationContext();

  return (
    <Stack alignItems={'center'} direction={'column'} justifyContent={'center'} width={'100%'}>
      <Text>Great! thanks for your time, now your into something else i dont know :p</Text>
      <Button
        onClick={() => {
          formDispatcher({ type: 'RESET' });
          notificationDispatcher({ type: 'RESET' });
          completionDispatcher({ type: 'RESET' });
          codeDispatcher({ type: 'RESET' });
        }}
      >
        Go back
      </Button>
    </Stack>
  );
}
