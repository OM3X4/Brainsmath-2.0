// context/FontContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useUpdateUserSettings from '../hooks/useUpdateUserSettings';



type FontContextType = {
  font: string;
  setFont: (font: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState('var(--font-ibm)');
  const { mutate: updateSettings} = useUpdateUserSettings();

  useEffect(() => {
    const savedFont = localStorage.getItem('font');
    if (savedFont) setFont(savedFont);
  }, []);

  useEffect(() => {
    if(localStorage.getItem("access_token")) updateSettings({font: font})
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
