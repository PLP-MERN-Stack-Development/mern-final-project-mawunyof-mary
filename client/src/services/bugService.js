const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const bugService = {
  getAllBugs: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

      const url = queryParams.toString() 
        ? `${API_BASE_URL}/bugs?${queryParams.toString()}`
        : `${API_BASE_URL}/bugs`;

      console.log('Fetching from:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error(`Failed to fetch bugs: ${error.message}`);
    }
  },

  getBugById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bugs/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch bug: ${error.message}`);
    }
  },

  createBug: async (bugData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bugs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to create bug: ${error.message}`);
    }
  },

  updateBug: async (id, bugData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bugs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to update bug: ${error.message}`);
    }
  },

  deleteBug: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bugs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to delete bug: ${error.message}`);
    }
  }
};

export default bugService; 