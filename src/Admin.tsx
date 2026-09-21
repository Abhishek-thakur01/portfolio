import { useEffect, useState } from "react";

interface SiteData {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
}

const defaultData: SiteData = {
  name: "Abhishek Thakur",
  title: "Graphic & UI Designer",
  about: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals.",
  email: "iabhishekbhardwaj07@gmail.com",
  phone: "+91 98827 00510",
  location: "Mandi, Himachal Pradesh",
};

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<SiteData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check URL for token from OAuth callback
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("gh_token", urlToken);
      setToken(urlToken);
      // Clean URL
      window.history.replaceState({}, "", "/admin");
    } else {
      const saved = localStorage.getItem("gh_token");
      if (saved) setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    // Fetch GitHub user
    fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((u) => {
        if (u.login) setUser(u);
        else {
          localStorage.removeItem("gh_token");
          setToken(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("gh_token");
        setToken(null);
      });
  }, [token]);

  const login = () => {
    window.location.href = "/api/auth/login";
  };

  const logout = () => {
    localStorage.removeItem("gh_token");
    setToken(null);
    setUser(null);
  };

  const saveContent = async () => {
    if (!token) return;
    setSaving(true);
    setMessage("");

    try {
      // Get current file SHA
      const fileRes = await fetch(
        "https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/src/content/site.json",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const fileData = await fileRes.json();
      const sha = fileData.sha;

      // Update file
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

      const updateRes = await fetch(
        "https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/src/content/site.json",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Update site content via CMS",
            content,
            sha,
            branch: "main",
          }),
        }
      );

      if (updateRes.ok) {
        setMessage("✅ Saved successfully! Changes will appear after deploy.");
      } else {
        const err = await updateRes.json();
        setMessage("❌ Error: " + (err.message || "Failed to save"));
      }
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    }

    setSaving(false);
  };

  if (!token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06080f] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1018] p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
          <p className="mt-2 text-white/50">Login with your GitHub account to manage content</p>
          <button
            onClick={login}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-white/90"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Login with GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <header className="border-b border-white/10 bg-[#0c1018]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-lg font-bold">Portfolio CMS</h1>
            <p className="text-sm text-white/50">Logged in as {user.login}</p>
          </div>
          <button onClick={logout} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/5">
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10">
        <div className="rounded-2xl border border-white/10 bg-[#0c1018] p-6">
          <h2 className="text-xl font-semibold">Site Settings</h2>
          <p className="mt-1 text-sm text-white/50">Edit your portfolio content. Changes are saved directly to GitHub.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm text-white/60">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/60">Title</label>
              <input
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/60">About</label>
              <textarea
                value={data.about}
                onChange={(e) => setData({ ...data, about: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-white/60">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-white/60">Phone</label>
                <input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-white/60">Location</label>
              <input
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-white outline-none focus:border-[#8b7cff]"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={saveContent}
              disabled={saving}
              className="rounded-xl bg-[#8b7cff] px-6 py-3 font-semibold text-white transition hover:bg-[#7a6bef] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {message && <p className="text-sm">{message}</p>}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/40">
          <a href="/" className="hover:text-white">← Back to Portfolio</a>
        </p>
      </main>
    </div>
  );
}
