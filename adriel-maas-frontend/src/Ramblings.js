import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import { fetchPosts } from './services/api';

// Post Card Component
function PostCard({ post }) {
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <span className="text-sm text-gray-500 mb-2 block">{formatDate(post.date)}</span>
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <Link 
        to={`/ramblings/${post.id}`} 
        className="text-blue-600 hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}

// Single Post View Component
function PostView({ post, onBack }) {
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button 
        onClick={onBack}
        className="text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Back to all posts
      </button>
      
      <span className="text-sm text-gray-500 mb-2 block">{formatDate(post.date)}</span>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      <div className="prose max-w-none text-gray-700">
        <p>{post.content}</p>
      </div>
    </div>
  );
}

function Ramblings() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Fallback data if API fails or during development
  const dummyPosts = [
    {
      id: 1,
      title: "who are you?",
      date: "2025-04-01",
      excerpt: "TBD",
      content: "TBD
    },
    {
      id: 2,
      title: "TBD",
      date: "2025-03-15",
      excerpt: "TBD",
      content: "TBD"
    },
    {
      id: 3,
      title: "TBD",
      date: "2025-02-20",
      excerpt: "TBD",
      content: "TBD"
    }
  ];

  // Find a post by ID (for URL params handling in a real app)
  const findPostById = (id) => {
    const availablePosts = posts.length > 0 ? posts : error ? dummyPosts : [];
    return availablePosts.find(post => post.id === parseInt(id));
  };

  // Simulate URL parameter handling
  const handleViewPost = (id) => {
    const post = findPostById(id);
    if (post) {
      setSelectedPost(post);
      window.scrollTo(0, 0);
    }
  };

  // Go back to list view
  const handleBackToList = () => {
    setSelectedPost(null);
  };

  return (
    <Layout>
      <div className="py-10 px-4 max-w-4xl mx-auto">
        {!selectedPost && (
          <h1 className="text-3xl font-bold mb-8 text-center">ramblings</h1>
        )}
        
        {loading && (
          <div className="flex justify-center">
            <p className="text-gray-700">Loading posts...</p>
          </div>
        )}
        
        {error && !loading && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <p className="mt-2">Showing sample posts instead.</p>
          </div>
        )}

        {selectedPost ? (
          <PostView post={selectedPost} onBack={handleBackToList} />
        ) : (
          <div className="space-y-6">
            {/* Use API data if available, fall back to dummy data if not */}
            {(posts.length > 0 ? posts : error ? dummyPosts : []).map(post => (
              <div key={post.id} onClick={() => handleViewPost(post.id)} style={{cursor: 'pointer'}}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Ramblings;
