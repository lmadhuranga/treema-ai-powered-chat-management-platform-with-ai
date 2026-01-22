import { useEffect, useState } from "react";
import { login as loginRequest, logout as logoutRequest, me } from "../services/authService.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshUser() {
    try {
      const data = await me();
      setUser(data);
      setError("");
    } catch (err) {
      setUser(null);
      setError("");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  async function login(email, password) {
    setLoading(true);
    setError("");
    try {
      await loginRequest(email, password);
      await refreshUser();
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    setError("");
    try {
      await logoutRequest();
      setUser(null);
    } catch (err) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return { user, loading, error, login, logout };
}
