import { useState } from 'react';
import { Text, Button, Input, Stack, Link } from '@chakra-ui/react';
import axios from 'axios';
import { object as YupObject, string as YupString } from 'yup';

import { useFormContext } from '../../../hooks/useForm';
import { useCodeContext } from '../../../hooks/useCode';
import NotificationBox from '../../Control/Notification';
import { EmailRequestBody, EmailResponseBody } from '../../../types/api';
import { FirstFormCompletionActionFn, OnValidationHandler } from '../../../types/form';
import { useFormActions } from '../../../hooks/useFormActions';

export default function First() {
  const { formState } = useFormContext();
  const {
    codeState: { code },
  } = useCodeContext();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const { onFirstStepCompletionHandler: onCompletionHandler, onValidationHandler } =
    useFormActions();

  return (
    <>
      <Stack
        alignItems={'flex-start'}
        direction={'column'}
        justifyContent={'center'}
        spacing={'20px'}
      >
        <Text>
          1. Please register using{' '}
          <Link
            isExternal
            color={'#5da4ee'}
            href={'https://ethereal.email'}
            textDecoration={'underline'}
          >
            Ethereal
          </Link>
        </Text>
        <Text>2. Now complete the following fields</Text>
      </Stack>
      <Input
        defaultValue={formState.username}
        placeholder={'username'}
        type={'text'}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        defaultValue={formState.email}
        placeholder={'email@example.com'}
        type={'email'}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Stack>
        <Button
          type="button"
          onClick={() => {
            nextButtonHandler(username, email, code, onValidationHandler, onCompletionHandler);
          }}
        >
          Next
        </Button>
        <NotificationBox />
      </Stack>
    </>
  );
}

const nextButtonHandler = async (
  username: string,
  email: string,
  code: string,
  onValidationHandler: OnValidationHandler,
  onCompletionHandler: FirstFormCompletionActionFn,
) => {
  try {
    const yupValidation = await validateForm({ username, email });

    if (!yupValidation.success) throw new Error(yupValidation.message as string);
    onValidationHandler('SUCCESS', yupValidation.message);

    const res = await sendEmail({
      username,
      email,
      code,
    });

    if (!res.success) {
      throw new Error('Something went wrong while sending email');
    }
    onCompletionHandler({ email, username, notificationMessage: res.message });
  } catch (err: any) {
    onValidationHandler('ERROR', decodeURI(err));
  }
};

const formSchema = YupObject({
  username: YupString().required('missing username field'),
  email: YupString()
    .matches(/@ethereal.email$/, {
      message: 'must be an ethereal email account',
    })
    .required('missing email field'),
});

const validateForm = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}): Promise<{ success: boolean; message: string }> => {
  return formSchema
    .validate(
      {
        username: username,
        email: email,
      },
      { abortEarly: false },
    )
    .then(() => ({
      message: `Good job 👍 please wait we are sending you an email`,
      success: true,
    }))
    .catch((err: any) => {
      const errorMessage: string = err.errors.reduce(
        (prev: string, curr: string) => prev + ' and ' + curr,
      );

      return {
        message: decodeURI(errorMessage),
        success: false,
      };
    });
};

const sendEmail = async ({ username, email, code }: EmailRequestBody) => {
  try {
    const res = await axios.post<EmailResponseBody>('api/send-email', {
      username,
      email,
      code,
    });

    return res.data;
  } catch (err: any) {
    if (err.response) {
      return {
        message: JSON.stringify(err.response.data),
        success: false,
      };
    } else {
      return {
        message: JSON.stringify(err.message),
        success: false,
      };
    }
  }
};
