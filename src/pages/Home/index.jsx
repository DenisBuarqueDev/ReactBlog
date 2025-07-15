import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import CardPost from "../../components/CardPost";

function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDocuments = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(docs);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };

    getDocuments();
  }, []);

  const listPosts = posts.filter((doc) =>
    // Filtra por um campo específico. Exemplo: nome
    doc.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="w-full m-auto flex flex-col p-2 md:container">
      <section className="w-full my-2">
        <form className="flex">
          <input
            type="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="O que você procura?"
            className="flex w-full h-10 p-2 border shadow rounded"
          />
        </form>
      </section>

      {loading ? (
        <p>Carregando dados... </p>
      ) : (
        listPosts &&
        listPosts.length === 0 && (
          <section className="container flex flex-col items-center content-center my-4 justify-center">
            <h2>Nenhum resultado encontrado</h2>
            <Link
              to="/posts"
              className="w-40 bg-blue-500 text-white flex items-center justify-center h-12 shadow rounded"
            >
              Criar Post
            </Link>
          </section>
        )
      )}

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listPosts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}

export default Home;
