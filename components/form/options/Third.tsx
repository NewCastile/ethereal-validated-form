import { Select, Stack, Button, StackDivider, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';

import { useFormActions } from '../../../hooks/useFormActions';
import NotificationBox from '../../Control/Notification';

export default function Third() {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('Venezuela');
  const [city, setCity] = useState<string>('City A');
  const {
    onThirdStepCompletionHandler: onCompletionHandler,
    onGoBackThirdFormHandler: onGoBackHandler,
    onValidationHandler,
  } = useFormActions();

  return (
    <>
      <NotificationBox />
      <Select value={country} onChange={(e) => setCountry(e.target.value)}>
        {countryOptions.map((country, countryIdx) => (
          <option key={countryIdx} value={country}>
            {country}
          </option>
        ))}
      </Select>
      <Select value={city} onChange={(e) => setCity(e.target.value)}>
        {cityOptions.map((city, cityIdx) => (
          <option key={cityIdx} value={city}>
            {city}
          </option>
        ))}
      </Select>
      <Checkbox
        isChecked={termsAccepted}
        onChange={() => {
          setTermsAccepted((old) => !old);
        }}
      >
        Please accept our terms by clicking the checkbox
      </Checkbox>
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
          onClick={() => {
            if (country || city) {
              onCompletionHandler({ city, country, termsAccepted });
            } else {
              onValidationHandler('ERROR', 'Select a city or country');
            }
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

const countryOptions = ['Venezuela', 'Colombia', 'Argentina', 'México', 'España'];

const cityOptions = ['City A', 'City B', 'City C', 'City D', 'City E'];
