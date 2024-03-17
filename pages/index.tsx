import type { NextPage } from 'next';
import { Stack, ChakraProvider } from '@chakra-ui/react';

import { initialState as initialCompletionState, CompletionProvider } from '../hooks/useCompletion';
import {
  initialState as initialNotificationState,
  NotificationProvider,
} from '../hooks/useNotification';
import { initialState as initialFormState, FormProvider } from '../hooks/useForm';
import { initialState as initialCodeState, CodeProvider } from '../hooks/useCode';
import Form from '../components/Form';

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <Stack
        alignItems={'center'}
        direction={'column'}
        height={'100%'}
        justifyContent={'center'}
        width={'100%'}
      >
        <CompletionProvider init={initialCompletionState}>
          <FormProvider init={initialFormState}>
            <CodeProvider init={initialCodeState}>
              <NotificationProvider init={initialNotificationState}>
                <Form />
              </NotificationProvider>
            </CodeProvider>
          </FormProvider>
        </CompletionProvider>
      </Stack>
    </ChakraProvider>
  );
};

export default Home;
