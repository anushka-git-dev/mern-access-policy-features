import jsonwebtoken from 'jsonwebtoken';

const SESSION_TIMEOUT_MINUTES = 1; // 1 minute
const activeSessions = new Map();  // token → last activity time

export function sessionTimeoutHandler(req, res, next) {
    const tokenString = req.header("Authorization");
    if (!tokenString) return next();

    const token = tokenString.replace("Bearer ", "");

    jsonwebtoken.verify(token, "secretkey123", (err, payload) => {
        if (err) return res.status(403).send("Invalid token.");

        const now = Date.now();
        const lastActivity = activeSessions.get(token) || now;

        const diffMinutes = (now - lastActivity) / 60000;

        if (diffMinutes > SESSION_TIMEOUT_MINUTES) {
            console.log(`[TIMEOUT] Session expired for ${payload.email}`);
            activeSessions.delete(token);
            return res.status(440).send("Session timed out. Please re-authenticate.");
        }

        // Update session timestamp
        activeSessions.set(token, now);

        if (diffMinutes > SESSION_TIMEOUT_MINUTES - 1) {
            res.setHeader("X-Warning", "Your session will timeout in 1 minute.");
        }

        next();
    });
}
