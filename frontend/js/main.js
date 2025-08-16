// API URL - Change this to match your backend URL
const API_URL = 'https://bus-backend-a8ss.onrender.com/api';

// Authentication functions
const auth = {
  // Get token from local storage
  getToken: () => localStorage.getItem('token'),
  
  // Set token in local storage
  setToken: (token) => localStorage.setItem('token', token),
  
  // Remove token from local storage
  removeToken: () => localStorage.removeItem('token'),
  
  // Check if user is logged in
  isLoggedIn: () => !!localStorage.getItem('token'),
  
  // Get headers for API requests
  getHeaders: () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    const token = auth.getToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
  
  // Login user
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        auth.setToken(data.token);
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  },
  
  // Logout user
  logout: () => {
    auth.removeToken();
    window.location.href = 'index.html';
  },
  
  // Check authentication and redirect if not logged in
  checkAuth: () => {
    if (!auth.isLoggedIn() && !window.location.pathname.includes('index.html')) {
      window.location.href = 'index.html';
    }
  }
};

// API request helper
const api = {
  // Generic fetch function with authentication
  fetch: async (endpoint, method = 'GET', body = null) => {
    try {
      const options = {
        method,
        headers: auth.getHeaders()
      };
      
      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, options);
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data: data.data };
      } else {
        // If unauthorized, redirect to login
        if (response.status === 401) {
          auth.logout();
        }
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(`API error (${endpoint}):`, error);
      return { success: false, message: 'An error occurred while fetching data' };
    }
  },
  
  // GET request
  get: async (endpoint) => {
    return await api.fetch(endpoint);
  },
  
  // POST request
  post: async (endpoint, data) => {
    return await api.fetch(endpoint, 'POST', data);
  },
  
  // PUT request
  put: async (endpoint, data) => {
    return await api.fetch(endpoint, 'PUT', data);
  },
  
  // DELETE request
  delete: async (endpoint) => {
    return await api.fetch(endpoint, 'DELETE');
  }
};

// UI helper functions
const ui = {
  // Show alert message
  showAlert: (message, type = 'danger', container = '.alert-container', timeout = 5000) => {
    const alertContainer = document.querySelector(container);
    if (!alertContainer) return;
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to container
    alertContainer.appendChild(alert);
    
    // Auto dismiss
    setTimeout(() => {
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, timeout);
  },
  
  // Format date
  formatDate: (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  },
  
  // Format time
  formatTime: (timeString) => {
    return timeString;
  },
  
  // Format date and time
  formatDateTime: (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  }
};

// Document ready function
document.addEventListener('DOMContentLoaded', () => {
  // Check authentication on every page except login
  if (!window.location.pathname.includes('index.html')) {
    auth.checkAuth();
  }
  
  // Setup logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      auth.logout();
    });
  }
});
