import Fingerprint2 from 'fingerprintjs2';

const getFingerprint = () =>
  new Promise(resolve => {
    new Fingerprint2().get(result => resolve(result));
  });

export const getDeviceToken = async procesDeviceToken => {
  const deviceToken = await getFingerprint();
  if (procesDeviceToken) {
    procesDeviceToken(deviceToken);
  }
  return deviceToken;
};
