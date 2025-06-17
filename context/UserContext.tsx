// context/UserContext.tsx
import { supabase } from '@/utils/supabase'
import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
    session: Session | null
    user: User | null
    loading: boolean
}

const UserContext = createContext<UserContextType>({
    session: null,
    user: null,
    loading: true,
})

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (mounted) {
                setSession(session);
                setLoading(false);
            }
        });

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription?.subscription?.unsubscribe();
        };
    }, []);

    // Espera a que termine la carga inicial antes de renderizar los hijos
    if (loading) return null;

    return (
        <UserContext.Provider value={{ session, user: session?.user ?? null, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)