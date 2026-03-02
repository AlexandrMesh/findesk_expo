# Changelog

## [3.0.1] - 2025-03-02

### Added

- Yandex Mobile Ads banner at the bottom of the app (ad unit ID: R-M-18836160-1). The banner is placed above the system navigation/gesture area so it does not overlap system buttons.

### Changed

- EAS Build: enabled automatic `versionCode` increment for Android production builds (remote app version source).

### Technical

- Added `yandex-mobile-ads` and `@react-native-community/netinfo` dependencies.
- Applied patch for `yandex-mobile-ads` (7.16.0) for production builds compatibility.
