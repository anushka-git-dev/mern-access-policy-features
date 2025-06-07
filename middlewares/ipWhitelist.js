import axios from 'axios';

const allowedRegions = ['LK'];   // Allowed for Sri Lanka
const allowedIPs = ['127.0.0.1', '::1', 'localhost'];       // Allowed for localhost

export async function ipWhitelist(req, res, next) {
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("IP Whitelist check. IP:", userIP);
    console.log("[BLOCKED] IP: ${userIP}, Country: ${country}");

    // Allow localhost immediately (IPv4, IPv6)
    if (allowedIPs.includes(userIP)) {
        console.log("Localhost access allowed");
        return next();
    }

    try {
        const geoRes = await axios.get(`https://ipapi.co/${userIP}/json/`);
        const country = geoRes.data.country;

        if (!allowedRegions.includes(country)) {
            console.log(`[BLOCKED] IP: ${userIP}, Country: ${country}`);
            return res.status(403).send("Access denied due to unauthorized region or IP.");
        }

        console.log("IP allowed by region");
        next();
    } catch (error) {
        console.log("Geo check failed:", error.message);
        return res.status(500).send("IP validation failed.");
    }
}


