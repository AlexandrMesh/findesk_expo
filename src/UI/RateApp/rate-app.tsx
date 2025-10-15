import * as StoreReview from 'expo-store-review';
import { useEffect } from 'react';
import { Platform } from 'react-native';

type RateAppProps = {
  trigger?: boolean;
};

const RateApp = ({ trigger = true }: RateAppProps) => {
  useEffect(() => {
    const maybeAskReview = async () => {
      try {
        if (!trigger) return;
        const available = await StoreReview.isAvailableAsync();
        if (!available) return;
        if (Platform.OS === 'ios') {
          await StoreReview.requestReview();
        } else {
          await StoreReview.requestReview();
        }
      } catch (e) {
        // ignore
      }
    };
    maybeAskReview();
  }, [trigger]);

  return null;
};

export default RateApp;


