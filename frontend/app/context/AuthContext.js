"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadStoredUser = () => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadStoredUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.data);
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      toast.success("Signed in successfully.");
      router.push("/");
      return { success: true };
    } else {
      toast.error(data.message);
      return { success: false, message: data.message };
    }
  };

  const register = async (username, email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Account created successfully. Please sign in.");
      router.push("/login");
      return { success: true };
    } else {
      toast.error(data.message);
      return { success: false, message: data.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully.");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
