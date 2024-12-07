const API_URL = 'http://localhost:9999';

export const updateProfileBlocks = async (updatedBlocks) => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${API_URL}/block/user/updateBlocks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedBlocks),
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile blocks');
        }

        const data = await response.json();
        return data.message || 'Blocks updated successfully';

    } catch (err) {
        console.error('Error in updateProfileBlocks:',err);
        throw err;
    }
};