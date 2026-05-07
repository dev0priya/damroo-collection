const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, body: any) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path: string, body: any) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path: string) => request(path, { method: "DELETE" }),
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_URL}/admin/upload`, {
      method: "POST",
      body: formData
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  }
};
