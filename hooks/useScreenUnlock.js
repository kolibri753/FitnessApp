import { useEffect } from 'react';
import { OrientationLock, unlockAsync, lockAsync } from 'expo-screen-orientation';

export const useScreenUnlock = () => {
  useEffect(() => {
    async function unlockCurrentScreen() {
      await unlockAsync();
    }
    unlockCurrentScreen();
    return () => {
      lockAsync(OrientationLock.PORTRAIT);
    };
  }, []);
};
