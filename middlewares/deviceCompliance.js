export function deviceCompliance(req, res, next) {
    console.log("Device compliance check reached");

    const { osVersion, firewallEnabled } = req.body;
    console.log("Request Body:", req.body);

    if (!osVersion || firewallEnabled === undefined) {
        console.log("Missing compliance fields");
        return res.status(400).send("Device compliance data missing.");
    }

    // Extract the numeric version part
    const versionMatch = osVersion.match(/\\d+/g);  // Extract digits like ['10'] from 'Windows 10'
    const versionNumber = versionMatch ? parseInt(versionMatch[0], 10) : 0;

    const minSupportedVersion = 10;

    if (versionNumber < minSupportedVersion || firewallEnabled !== true) {
        console.log("Device NOT compliant");
        console.log(`Reason: OS Version=${versionNumber} (min required: ${minSupportedVersion}), Firewall Enabled=${firewallEnabled}`);
        return res.status(403).send("Device not compliant. Update system and enable firewall.");
    }

    console.log("Device is compliant");
    next();
}
