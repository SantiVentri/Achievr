import { GoalType, NewsType, SectionType, SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";

export async function getGoals(user: User | null, is_done: boolean): Promise<GoalType[]> {
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("creator_id", user?.id)
        .eq("is_done", is_done);

    if (error) {
        console.error(error);
        return [];
    } else {
        if (data.length === 0) {
            return [];
        } else {
            return data;
        }
    }
}

export async function getSubtasks(goal_id: string): Promise<SubtaskType[]> {
    const { data, error } = await supabase
        .from("subtasks")
        .select("*")
        .eq("goal_id", goal_id)
        .order("step", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    } else {
        if (data.length === 0) {
            return [];
        } else {
            return data;
        }
    }
}

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
    } else {
        if (data.length === 0) {
            return [];
        } else {
            // Transformar los datos para que coincidan con el tipo NewsType
            return data.map(item => ({
                id: item.id,
                header_image: item.header_image,
                title: item.news_translation[0]?.title || "",
                description: item.news_translation[0]?.description || "",
                author: item.author,
                updated_at: item.created_at, // Asumiendo que no hay updated_at en la tabla news
                created_at: new Date(item.created_at),
                published: item.published
            }));
        }
    }
}

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
    } else {
        if (data.length === 0) {
            return [];
        } else {
            // Transformar los datos para que coincidan con el tipo SectionType
            return data.map(item => ({
                id: item.id,
                news_id: item.news_id,
                order: item.order,
                title: item.news_sections_translation[0]?.title || "",
                content: item.news_sections_translation[0]?.content || "",
                updated_at: item.created_at, // Asumiendo que no hay updated_at en la tabla news_sections
                created_at: item.created_at
            }));
        }
    }
}

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

    if (error) {
        console.error(error);
        return null;
    } else {
        if (!data) {
            return null;
        } else {
            // Transformar los datos para que coincidan con el tipo NewsType
            return {
                id: data.id,
                header_image: data.header_image,
                title: data.news_translation[0]?.title || "",
                description: data.news_translation[0]?.description || "",
                author: data.author,
                updated_at: data.created_at, // Asumiendo que no hay updated_at en la tabla news
                created_at: new Date(data.created_at),
                published: data.published
            };
        }
    }
}

