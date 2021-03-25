export const fetchLists = async () => {
    const response = await fetch('/api/users/all_lists', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {lists} = await response.json();
    return lists
}

export const fetchTasks = async () => {
    const response = await fetch('/api/users/all_tasks', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let {tasks} = await response.json();
    return tasks
}
