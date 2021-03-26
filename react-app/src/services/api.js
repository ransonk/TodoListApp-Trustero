export const fetchLists = async () => {
    const response = await fetch('/api/lists/all_lists', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {lists} = await response.json();
    return lists
}

export const fetchTasks = async () => {
    const response = await fetch('/api/tasks/all_tasks', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {tasks} = await response.json();
    return tasks
}

export const fetchSingleTask = async (name) => {
    const response = await fetch(`/api/tasks/${name}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {tasks} = await response.json();
    return tasks
}

export const fetchComments = async () => {
    const response = await fetch('/api/comments/all_comments', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {comments} = await response.json();
    return comments
}
