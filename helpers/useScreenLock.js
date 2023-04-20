import { useEffect } from 'react';
import { OrientationLock, unlockAsync, lockAsync } from 'expo-screen-orientation';

export const useScreenLock = () => {
  useEffect(() => {
    async function unlockCurrentScreen() {
      await unlockAsync();
      await lockAsync(OrientationLock.PORTRAIT); // Set initial orientation to portrait
    }
    unlockCurrentScreen();
    return () => {
      lockAsync(OrientationLock.PORTRAIT);
    };
  }, []);
};
