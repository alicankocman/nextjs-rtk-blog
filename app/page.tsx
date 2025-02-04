'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import PostsList from '@/components/PostsList';
import CreatePost from '@/components/CreatePost';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Blog Posts with RTK Query
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <CreatePost />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">All Posts</h2>
            <PostsList />
          </div>
        </div>
      </div>
    </Provider>
  );
}