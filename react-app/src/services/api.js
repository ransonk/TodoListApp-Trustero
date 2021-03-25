export const fetchLists = async () => {
    const response = await fetch('/api/users/all_lists', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}
