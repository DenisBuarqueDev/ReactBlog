import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useAuthValue } from "../../context/AuthContext";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthValue();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("uid", "==", user.uid)
        );

        const postsSnapshot = await getDocs(postsQuery);
        const postsUser = postsSnapshot.docs.map((postDoc) => ({
          id: postDoc.id,
          ...postDoc.data(),
        }));

        setPosts(postsUser);
      } catch (error) {
        console.error("Erro ao buscar usuários e posts:", error);
      }
    };
    getPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert("Documento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
    }
  };

  if (!posts) {
    return <p>Carregando dados...</p>;
  }

  return (
    <main className="flex w-full">
      <section className="container m-auto my-4">
        <h1 className="text-2xl mb-2">Dashboard</h1>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border shadow">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Título
                </th>
                <th scope="col" className="px-6 py-3 w-10">
                  Editar
                </th>
                <th scope="col" className="px-6 py-3 w-10">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="bg-white border-b border-gray-200">
                  <td scope="row" className="flex-1 px-6 py-3 text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-3 w-10 text-center">
                    <Link to={`/post/edit/${post.id}`} className="flex items-center justify-center">
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="px-6 py-3 w-10 text-center">
                    <button onClick={() => handleDelete(post.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
