import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-100 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
        JSONPlaceholder Posts
      </h1>

      <div className="mb-6 text-center">
        <label
          htmlFor="query"
          className="block text-lg font-medium text-gray-300 mb-2"
        >
          Search for Posts by Title:
        </label>
        <input
          id="query"
          value={query}
          onChange={handleQueryChange}
          className="w-1/2 p-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="query-input"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-testid="posts-list"
        >
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition-colors"
              data-testid="post-item"
            >
              <h2 className="text-xl font-semibold text-gray-100 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
