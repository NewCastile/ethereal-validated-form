import { Button, Input, Stack, StackDivider } from '@chakra-ui/react';
import { useState } from 'react';

import { useCodeContext } from '../../../hooks/useCode';
import { useFormActions } from '../../../hooks/useFormActions';
import NotificationBox from '../../Control/Notification';

export default function Second() {
  const {
    codeState: { code: currentCode },
  } = useCodeContext();
  const [inputCode, setInputCode] = useState<string>('');
  const {
    onSecondStepCompletionHandler: onCompletionHandler,
    onGoBackSecondFormHandler: onGoBackHandler,
    onValidationHandler,
  } = useFormActions();

  return (
    <>
      <NotificationBox />
      <Input type={'text'} onChange={(e) => setInputCode(e.target.value)} />
      <Stack
        alignItems={'center'}
        direction={'row'}
        divider={<StackDivider />}
        justifyContent={'center'}
        spacing={'20px'}
      >
        <Button flexBasis={'25%'} onClick={onGoBackHandler}>
          Go back
        </Button>
        <Button
          flexBasis={'25%'}
          type="button"
          onClick={() => {
            if (inputCode) {
              onCompletionHandler({ currentCode, inputCode });
            } else {
              onValidationHandler('ERROR', 'Please enter the code we sent you');
            }
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}
