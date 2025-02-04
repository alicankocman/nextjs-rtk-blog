'use client';
import { useState } from 'react';
import { useCreatePostMutation } from '@/services/postsApi';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createPost, { isLoading, error }] = useCreatePostMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!title.trim() || !body.trim()) return;

    try {
      const result = await createPost({ title, body }).unwrap();
      setTitle('');
      setBody('');
      alert(`Post başarıyla oluşturuldu! ID: ${result.id}`);
    } catch (error: any) {
      console.error('Create error:', error);
      setErrorMessage(error.data?.message || 'Post oluşturulurken bir hata oluştu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none 
                   text-black placeholder:text-gray-600"
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post content"
          rows={4}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none 
                   text-black placeholder:text-gray-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        Create Post
      </button>
    </form>
  );
}