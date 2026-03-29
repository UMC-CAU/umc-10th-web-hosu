import { createContext, useContext, type ReactNode, useState } from "react";

interface ThemeContextType {
  isDark: "black" | "white";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<"black" | "white">("white");

  const toggleTheme = () => setIsDark((prev) => 
    prev === "black" ? "white" : "black");
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}