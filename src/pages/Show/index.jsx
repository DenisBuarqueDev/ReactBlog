import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Documento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar documento:", error);
      }
    };
    getDocument();
  }, [id]);

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="w-full max-w-3xl m-auto flex flex-col p-2">
      <section className="w-full">
        <img src={post.photo} alt={post.title} className="w-full rounded mb-3" />
        <h1 className="text-xl">Post por: {post.createdBy}</h1>
        <h2 className="text-3xl font-semibold mb-2">{post.title}</h2>
        <ul className="flex flex-wrap gap-1 my-3">
            {post.tags.map((tag) => (
                <li key={tag} className="border py-1 px-5 rounded-full">#{tag}</li>
            ))}
        </ul>
        <p>{post.description}</p>
      </section>
    </main>
  );
};

export default Show;
