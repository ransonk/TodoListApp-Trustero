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
    let {comments} = await response.json();
    return comments
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

export const createComment = async (description, task_id) => {
    const response = await fetch(`/api/comments/add-comment/${task_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        task_id
      }),
    });
    return await response.json();
  }

export const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/delete-comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId
      }),
    });
    const resJSON = await response.json();
    if (resJSON.message === "delete successful") {
      window.location.href = '/';
    }
  }

export const updateComment = async (id, description) => {
    const response = await fetch(`/api/comments/update-comment/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
    });
    if (response.ok) {
        window.location.href = '/';
    }
};
