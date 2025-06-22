// context/UserContext.tsx
import { supabase } from '@/utils/supabase'
import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
    session: Session | null
    user: User | null
    loading: boolean
    avatar: string | null
    updateAvatar: () => void
}

const UserContext = createContext<UserContextType>({
    session: null,
    user: null,
    loading: true,
    avatar: null,
    updateAvatar: () => { },
})

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [avatar, setAvatar] = useState<string | null>(null)

    const getAvatar = async () => {
        if (!session?.user) return;
        const { data, error } = await supabase.from('avatars').select('avatar').eq('user_id', session.user.id).single();
        if (error) {
            console.error(error);
        }
        setAvatar(data?.avatar || null);
    }

    const updateAvatar = () => {
        getAvatar();
    }

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

    useEffect(() => {
        getAvatar();
    }, [session?.user]);

    // Espera a que termine la carga inicial antes de renderizar los hijos
    if (loading) return null;

    return (
        <UserContext.Provider value={{ session, user: session?.user ?? null, loading, avatar, updateAvatar }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)