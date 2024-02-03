import { getMessaging } from 'firebase/messaging';

const messaging = getMessaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  // Customize how to handle the background message
  const notificationTitle = 'Background Message';
  const notificationOptions = {
    body: payload.data.message,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
