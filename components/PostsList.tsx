import { useGetPostsQuery, useDeletePostMutation } from '@/services/postsApi';

export default function PostsList() {
  const { data: posts, isLoading, error, refetch } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  if (error) {
    if ('status' in error) {
      switch (error.status) {
        case 401:
          return <div>Lütfen giriş yapın</div>;
        case 403:
          return <div>Bu içeriği görüntüleme yetkiniz yok</div>;
        case 429:
          return <div>Çok fazla istek gönderildi. Lütfen bekleyin.</div>;
        default:
          return (
            <div>
              <p>Bir hata oluştu</p>
              <button onClick={() => refetch()}>Tekrar Dene</button>
            </div>
          );
      }
    }
  }

  if (isLoading) return <div>Yükleniyor...</div>;

  if (!posts?.length) {
    return <div className="text-gray-500">Henüz hiç post bulunmuyor.</div>;
  }

  const handleDelete = async (id: number | string) => {
    try {
      await deletePost(id).unwrap();
      alert('Post başarıyla silindi!');
    } catch (error: any) {
      console.error('Delete error:', error);
      alert(error.data?.message || 'Silme işlemi başarısız oldu!');
    }
  };

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="flex justify-between text-black items-center p-4 bg-white shadow rounded">
          <span>{post.title}</span>
          <button
            onClick={() => handleDelete(post.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
}