export interface GoalType {
    id: string;
    header_image: string;
    icon: string;
    title: string;
    short_description: string;
    creator_id: string;
    is_done: boolean;
    is_starred: boolean;
    updated_at: string;
    created_at: string;
}

export interface SubtaskType {
    id: string;
    goal_id: string;
    title: string;
    short_description: string;
    step: number;
    creator_id: string;
    is_done: boolean;
    updated_at: string;
    created_at: string;
}