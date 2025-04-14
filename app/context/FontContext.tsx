// context/FontContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontContextType = {
  font: string;
  setFont: (font: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState('var(--font-ibm)');

  // Apply the font on every change
  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  useEffect(() => {
    const savedFont = localStorage.getItem('font');
    if (savedFont) setFont(savedFont);
  }, []);

  useEffect(() => {
    localStorage.setItem('font', font);
    document.body.style.fontFamily = font;
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) throw new Error('useFont must be used within FontProvider');
  return context;
};
