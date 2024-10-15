interface Task {
    id: number,
    title: string,
    description: string,
    is_done: boolean,
    due_date: Date | null,
    closed_at: Date | null,
    project_id: number,
    chapter_id: number,
    creator_id: number
}

export default Task