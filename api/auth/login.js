export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: "GITHUB_CLIENT_ID not configured. Add it in Vercel Environment Variables." });
  }

  // Use the request host so it works on any domain
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const redirectUri = `${protocol}://${host}/api/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo user",
    state: Math.random().toString(36).substring(7),
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
