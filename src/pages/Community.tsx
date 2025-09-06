import React, { useState, useEffect } from 'react';
import { createClient } from '@blinkdotnew/sdk';

const blink = createClient({
  projectId: 'onebag-ai-studio-ptcjfa7a',
  authRequired: true
});

interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      // loadPosts will be called by the other effect when `user` becomes available
    });
    return unsubscribe;
  }, []);

  // Reload posts whenever user or page changes
  useEffect(() => {
    if (user) loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, user]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await (blink.db as any).communityPosts.list({
        orderBy: { createdAt: 'desc' },
        limit: postsPerPage,
        offset: (currentPage - 1) * postsPerPage
      });
      
      // Get total count for pagination
      const totalCount = await (blink.db as any).communityPosts.list({});
      setTotalPosts(totalCount.length);
      
      setPosts(allPosts as Post[]);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;
    
    try {
      const newPost = await (blink.db as any).communityPosts.create({
        userId: user.id,
        userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      setPosts([newPost as Post, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
      setTotalPosts(totalPosts + 1);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;
    
    try {
      await (blink.db as any).communityPosts.delete(postId);
      setPosts(posts.filter(p => p.id !== postId));
      setTotalPosts(totalPosts - 1);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const startEditing = (p: Post) => { setEditingPostId(p.id); setEditTitle(p.title); setEditContent(p.content); };
  const cancelEditing = () => { setEditingPostId(null); setEditTitle(''); setEditContent(''); };
  const handleUpdatePost = async (e?: any) => {
    if (e) e.preventDefault();
    if (!user || !editingPostId) return;
    try {
      await (blink.db as any).communityPosts.update(editingPostId, {
        title: editTitle,
        content: editContent,
        updatedAt: new Date().toISOString()
      });
      setPosts(posts.map(p => p.id === editingPostId ? { ...p, title: editTitle, content: editContent } : p));
      cancelEditing();
    } catch (err) { console.error('Error updating post:', err); }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-lg text-gray-600">Please sign in to access the community.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Composer */}
      <div className="bg-white rounded-2xl border p-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {user?.displayName?.[0] || user?.email?.[0] || 'U'}
          </div>
          <div className="text-sm text-neutral-500">Post to Community</div>
        </div>
        <input
          value={newPostTitle}
          onChange={(e)=> setNewPostTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-3 border rounded-lg px-3 py-2 focus:outline-none"
        />
        <textarea
          value={newPostContent}
          onChange={(e)=> setNewPostContent(e.target.value)}
          placeholder="Write something…"
          className="w-full h-28 border rounded-lg px-3 py-2 focus:outline-none"
        />
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={()=> { setNewPostTitle(''); setNewPostContent(''); }}
            className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={handleCreatePost} className="px-4 py-2 rounded-lg bg-black text-white">Post</button>
        </div>
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-600">Loading posts...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {post.userName[0] || 'U'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">{post.userName}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {user && user.id === post.userId && (
                  <div className="flex items-center gap-2">
                    <button onClick={()=>startEditing(post)} className="text-sm text-gray-600 hover:text-black">Edit</button>
                    <button onClick={()=>handleDeletePost(post.id)} className="text-sm text-red-600 hover:text-red-700">Delete</button>
                  </div>
                )}
                {user && user.id === post.userId && (
                  <div className="relative">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.5"/>
                        <circle cx="8" cy="8" r="1.5"/>
                        <circle cx="8" cy="13" r="1.5"/>
                      </svg>
                    </button>
                    <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg py-1 min-w-20 z-10 hidden group-hover:block">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Edit</button>
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap ml-13">
                {post.content}
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No posts yet.</p>
              <p className="text-gray-500">Be the first to share something with the community!</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Community;