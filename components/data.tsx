import { GoalType, SubtaskType } from "@/enums/types";
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