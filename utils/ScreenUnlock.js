import { useEffect } from 'react';
import { OrientationLock, unlockAsync, lockAsync } from 'expo-screen-orientation';

const ScreenUnlock = () => {
  useEffect(() => {

    async function unlockCurrentScreen() {
      await unlockAsync();
      // console.log("Unlock!!!!!!!!!!!!!!!!!!!!")
    }

    unlockCurrentScreen();

  //   return () => {
  //     unlockCurrentScreen();
  //   };

  return () => {
    lockAsync(OrientationLock.PORTRAIT);
    // console.log("Lock!!!!!!!!!!!!!!!!!!!!")
  };
  }, []);

  // return null;
};

export default ScreenUnlock;
