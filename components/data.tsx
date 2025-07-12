import { GoalType, NewsType, SectionType, SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";

// 🔹 Obtener todas las metas del usuario
export async function getGoals(user: User | null): Promise<GoalType[]> {
    if (!user) return [];

    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("creator_id", user.id)
        .order("is_starred", { ascending: false })
        .order("is_done", { ascending: true })
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

// 🔹 Obtener una meta individual
export async function getGoal(goal_id: string): Promise<GoalType | null> {
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("id", goal_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

// 🔹 Obtener subtareas de una meta
export async function getSubtasks(goal_id: string): Promise<SubtaskType[]> {
    const { data, error } = await supabase
        .from("subtasks")
        .select("*")
        .eq("goal_id", goal_id)
        .order("step", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

// 🔹 Obtener una subtarea individual
export async function getSubtask(subtask_id: string): Promise<SubtaskType | null> {
    const { data, error } = await supabase
        .from("subtasks")
        .select("*")
        .eq("id", subtask_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

// 🔹 Obtener progreso de una meta
export async function getProgress(goal_id: string): Promise<{ total: number, completed: number } | null> {
    const { data, error } = await supabase
        .from('subtasks')
        .select("*")
        .eq('goal_id', goal_id);

    if (error) {
        console.error(error);
        return null;
    }

    const total = data.length;
    const completed = data.filter(subtask => subtask.is_done).length;

    return {
        total: total,
        completed: completed,
    };
}

// 🔹 Obtener noticias por idioma
export async function getNews(locale: string): Promise<NewsType[]> {
    const { data, error } = await supabase
        .from("news")
        .select(`
            id,
            header_image,
            author,
            published,
            created_at,
            news_translation!inner(
                title,
                description
            )
        `)
        .eq("published", true)
        .eq("news_translation.locale", locale)
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        header_image: item.header_image,
        title: item.news_translation?.[0]?.title || "",
        description: item.news_translation?.[0]?.description || "",
        author: item.author,
        updated_at: item.created_at,
        created_at: new Date(item.created_at),
        published: item.published,
    }));
}

// 🔹 Obtener secciones de una noticia
export async function getNewsSections(news_id: string, locale: string): Promise<SectionType[]> {
    const { data, error } = await supabase
        .from("news_sections")
        .select(`
            id,
            news_id,
            order,
            created_at,
            news_sections_translation!inner(
                title,
                content
            )
        `)
        .eq("news_id", news_id)
        .eq("news_sections_translation.locale", locale)
        .order("order", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        news_id: item.news_id,
        order: item.order,
        title: item.news_sections_translation?.[0]?.title || "",
        content: item.news_sections_translation?.[0]?.content || "",
        updated_at: item.created_at,
        created_at: item.created_at,
    }));
}

// 🔹 Obtener una noticia por ID e idioma
export async function getNewsById(news_id: string, locale: string): Promise<NewsType | null> {
    const { data, error } = await supabase
        .from("news")
        .select(`
            id,
            header_image,
            author,
            published,
            created_at,
            news_translation!inner(
                title,
                description
            )
        `)
        .eq("id", news_id)
        .eq("news_translation.locale", locale)
        .single();

    if (error || !data) {
        console.error(error);
        return null;
    }

    return {
        id: data.id,
        header_image: data.header_image,
        title: data.news_translation?.[0]?.title || "",
        description: data.news_translation?.[0]?.description || "",
        author: data.author,
        updated_at: data.created_at,
        created_at: new Date(data.created_at),
        published: data.published,
    };
}