"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface NameContextType {
  name: string;
  setName: (name: string) => void;
}

// Create the context
const NameContext = createContext<NameContextType | undefined>(undefined);

// Create a provider
export const NameProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};
