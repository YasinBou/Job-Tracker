import React, {createContext, useContext, useEffect, useState} from "react";

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<string | null>;
    register: (username: string, email: string, password: string) => Promise<string | null>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // On mount, try to fetch user info using existing HttpOnly cookie
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser({username: data.username});
                }
            } catch (error) {
                console.error("Failed to auto-login", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (username: string, password: string): Promise<string | null> => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({username, password}),
            });

            if (!res.ok) {
                const error = await res.json();
                return error.message || "Login failed";
            }

            const data = await res.json();
            setUser({username: data.username});
            return null; // no error
        } catch (error: any) {
            return error.message || "Login error";
        }
    };


    const logout = async () => {
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    };

    const register = async (username: string, email: string, password: string): Promise<string | null> => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, email, password}),
            });

            if (!res.ok) {
                const message = await res.text();
                return message || "Registration failed";
            }

            return null; // no error
        } catch (error: any) {
            return error.message || "Registration error";
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                register,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
