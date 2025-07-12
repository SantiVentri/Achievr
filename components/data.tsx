import { GoalType, SubtaskType } from "@/enums/types";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";

export async function getGoals(user: User | null): Promise<GoalType[]> {
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order("is_done", { ascending: true })
        .order("created_at", { ascending: true })
        .eq("creator_id", user?.id)

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

export async function getGoal(goal_id: string): Promise<GoalType | null> {
    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("id", goal_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    } else {
        return data;
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

export async function getSubtask(subtask_id: string): Promise<SubtaskType | null> {
    const { data, error } = await supabase
        .from("subtasks")
        .select("*")
        .eq("id", subtask_id)
        .single();

    if (error) {
        console.error(error);
        return null;
    } else {
        return data;
    }
}

export async function getProgress(goal_id: string): Promise<{ total: number, completed: number } | null> {
    const { data, error } = await supabase.from('subtasks').select().eq('goal_id', goal_id);

    if (error) {
        console.error(error);
        return null;
    } else {
        if (data.length === 0) {
            return null;
        } else {
            return { total: data.length, completed: data.filter((subtask) => subtask.is_done).length };
        }
    }
}