import { Box, Link, Stack, Text } from '@chakra-ui/react';

import { useNotificationContext } from '../../hooks/useNotification';

export default function NotificationBox() {
  const { notificationState } = useNotificationContext();
  const { notification, success } = notificationState;
  const links = notification.split(' ').filter((word) => word.match(/^http/));

  return (
    <>
      {success ? (
        <Box color={'teal'} width={'100%'}>
          <Text fontWeight={'bold'}>{notification.split('http')[0]}</Text>
          {links.length >= 1 ? (
            <Stack>
              {links.map((link, linkIdx) => (
                <Link key={linkIdx} isExternal href={link}>
                  {link}
                </Link>
              ))}
            </Stack>
          ) : null}
        </Box>
      ) : success === false ? (
        <Box color={'tomato'} width={'100%'}>
          <Text fontWeight={'bold'}>{notification.split('http')[0]}</Text>
          {links.length >= 1 ? (
            <Stack>
              {links.map((link, linkIdx) => (
                <Link key={linkIdx} isExternal href={link}>
                  {link}
                </Link>
              ))}
            </Stack>
          ) : null}
        </Box>
      ) : null}
    </>
  );
}
