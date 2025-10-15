const fs = require('fs');
const path = require('path');

const { withAndroidManifest } = require('@expo/config-plugins');

const networkSecurityConfig = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Allow cleartext traffic for all domains -->
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    
    <!-- Specific domain configurations -->
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">82.146.40.13</domain>
        <domain includeSubdomains="true">omegaprokat.ru</domain>
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
    </domain-config>
</network-security-config>`;

module.exports = function withAndroidNetworkSecurityConfig(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;

    const application = androidManifest.manifest.application[0];
    application.$['android:networkSecurityConfig'] = '@xml/network_security_config';

    const resourcePath = path.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res', 'xml');

    if (!fs.existsSync(resourcePath)) {
      fs.mkdirSync(resourcePath, { recursive: true });
    }

    const filePath = path.join(resourcePath, 'network_security_config.xml');
    fs.writeFileSync(filePath, networkSecurityConfig);

    return config;
  });
};


