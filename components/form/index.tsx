import { CSSProperties, ReactElement } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { CompletionState, Step } from '../../types/completion';
import { useCompletionContext } from '../../hooks/useCompletion';
import Message from '../Control/Message';
import Steps from '../Control/Steps';

import First from './Options/First';
import Second from './Options/Second';
import Third from './Options/Third';

const createOptions = (components: ReactElement[], options: CompletionState) => {
  const arrayedOptions = Array.from(Object.entries(options));
  const mappedOptions = arrayedOptions.map((entrie, entrieIdx) => {
    return { state: entrie[1] as Step, component: components[entrieIdx] };
  });

  return mappedOptions;
};

export default function Form() {
  const { completionState } = useCompletionContext();
  const options = createOptions(
    [<First key={1} />, <Second key={2} />, <Third key={3} />],
    completionState,
  );
  const SelectedForm = options
    .filter((option) => option.state === 'NOT VALIDATED')
    ?.map((option) => option.component)[0];

  return (
    <Stack spacing={'30px'} style={ContainerStyles}>
      <Text fontSize={'1.5em'} fontWeight={'bold'}>
        Ethereal Validated Form
      </Text>
      <Stack spacing={'20px'} width={'100%'}>
        {SelectedForm ? SelectedForm : <Message />}
      </Stack>
      <Steps />
    </Stack>
  );
}

const ContainerStyles: CSSProperties = {
  boxShadow: '1px 1px 20px rgba(0,0,0,40%)',
  borderRadius: '10px',
  backgroundColor: 'white',
  padding: '2em',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '1em',
  maxWidth: '450px',
};
