import { Box, Circle, Stack } from '@chakra-ui/react';

import { useCompletionContext } from '../../hooks/useCompletion';

export default function Steps() {
  const { completionState } = useCompletionContext();

  return (
    <Stack
      alignItems={'center'}
      direction={'row'}
      divider={
        <Box border={'none'} color={'gray.400'} fontWeight={'bold'}>
          {'>'}
        </Box>
      }
      justifyContent={'center'}
      spacing={'1.5em'}
      width={'100%'}
    >
      {Array.from(Object.values(completionState)).map((value, valueIdx) => (
        <Circle key={valueIdx} border={'4px solid'} borderColor={'blue.400'} size={'3em'}>
          <Circle
            key={valueIdx + 1}
            bgColor={value === 'NOT VALIDATED' ? 'white' : 'blue.400'}
            border={'2px solid'}
            borderColor={'blue.400'}
            color={value === 'NOT VALIDATED' ? 'gray.400' : 'white'}
            fontWeight={'bold'}
            size={'2em'}
          >
            {valueIdx + 1}
          </Circle>
        </Circle>
      ))}
    </Stack>
  );
}
