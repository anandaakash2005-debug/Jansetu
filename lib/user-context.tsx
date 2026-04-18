'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type UserProfile = {
  name?: string;                     // ✅ ADD
  age?: number;
  income?: number;
  education?: string;
  occupation?: string;
  state?: string;
  gender?: 'male' | 'female' | 'other';

  residence?: string;               // ✅ ADD
  caste?: string;                  // ✅ ADD
  is_disabled?: boolean;           // ✅ ADD
  disability_percentage?: number;  // ✅ ADD
  is_bpl?: boolean; 
  is_gov_employee?: boolean;     // ✅ ADD

  savedSchemes: string[];
  searchHistory: string[];
}

interface UserContextType {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  saveScheme: (schemeId: string) => void
  unsaveScheme: (schemeId: string) => void
  addToHistory: (query: string) => void
  clearProfile: () => void
}

const defaultProfile: UserProfile = {
  savedSchemes: [],
  searchHistory: [],
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('saarthi-profile')
    if (stored) {
      try {
        setProfile(JSON.parse(stored))
      } catch {
        setProfile(defaultProfile)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('saarthi-profile', JSON.stringify(profile))
    }
  }, [profile, isHydrated])

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }, [])

  const saveScheme = useCallback((schemeId: string) => {
    setProfile(prev => ({
      ...prev,
      savedSchemes: prev.savedSchemes.includes(schemeId) 
        ? prev.savedSchemes 
        : [...prev.savedSchemes, schemeId]
    }))
  }, [])

  const unsaveScheme = useCallback((schemeId: string) => {
    setProfile(prev => ({
      ...prev,
      savedSchemes: prev.savedSchemes.filter(id => id !== schemeId)
    }))
  }, [])

  const addToHistory = useCallback((query: string) => {
    setProfile(prev => ({
      ...prev,
      searchHistory: [query, ...prev.searchHistory.filter(q => q !== query)].slice(0, 10)
    }))
  }, [])

  const clearProfile = useCallback(() => {
    setProfile(defaultProfile)
  }, [])

  return (
    <UserContext.Provider value={{ profile, updateProfile, saveScheme, unsaveScheme, addToHistory, clearProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
