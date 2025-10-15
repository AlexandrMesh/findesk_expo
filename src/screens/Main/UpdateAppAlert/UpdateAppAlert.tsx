/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useTranslation } from 'react-i18next';

type UpdateAppAlertProps = {
  getAppInfo: () => Promise<any>;
};

const UpdateAppAlert = ({ getAppInfo }: UpdateAppAlertProps) => {
  const { t } = useTranslation('common');

  const createUpdateAppAlert = useCallback(
    (updateUrl: string) =>
      Alert.alert(t('common:updateAppVersionTitle'), t('common:updateAppVersionDescription'), [
        {
          text: t('common:cancel')
        },
        { text: t('common:update'), onPress: () => Linking.openURL(updateUrl) }
      ]),
    [t]
  );

  useEffect(() => {
    async function loadData() {
      try {
        const { error, version, updateUrl } = await getAppInfo();
        const currentAppVersion = DeviceInfo.getVersion();
        if (!error && version && version !== currentAppVersion) {
          createUpdateAppAlert(updateUrl);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [getAppInfo, createUpdateAppAlert]);

  return null;
};

export default UpdateAppAlert;
