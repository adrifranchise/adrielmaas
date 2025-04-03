import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { login, fetchProjects, fetchPosts } from './services/api';

// Login Form Component
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await login(username, password);
      onLogin();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

// Admin Dashboard Component
function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'projects') {
          const projectData = await fetchProjects();
          setProjects(projectData);
        } else if (activeTab === 'posts') {
          const postData = await fetchPosts();
          setPosts(postData);
        }
      } catch (err) {
        setError(`Error loading ${activeTab}: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  // For simplicity, we'll just show a list of items
  // In a real app, you'd implement full CRUD functionality here

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'posts' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
          onClick={() => setActiveTab('posts')}
        >
          Blog Posts
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Loading State */}
      {loading && <p className="text-center">Loading...</p>}
      
      {/* Projects Tab Content */}
      {activeTab === 'projects' && !loading && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">
              Add New
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-t">
                    <td className="py-2 px-4">{project.id}</td>
                    <td className="py-2 px-4">{project.title}</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-600 mr-2 hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Posts Tab Content */}
      {activeTab === 'posts' && !loading && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Blog Posts</h2>
            <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">
              Add New
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-t">
                    <td className="py-2 px-4">{post.id}</td>
                    <td className="py-2 px-4">{post.title}</td>
                    <td className="py-2 px-4">{new Date(post.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <button className="text-blue-600 mr-2 hover:underline">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Main Admin Component
function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if we have a token
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // If user is not admin, redirect to home
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="py-10">
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default Admin;
