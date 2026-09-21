export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).json({ error: "GITHUB_CLIENT_ID not configured" });
  }

  const redirectUri = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/auth/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo user",
    state: Math.random().toString(36).substring(7),
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
