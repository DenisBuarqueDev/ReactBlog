import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuthValue();

  useEffect(() => {
    const getDocument = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setPhoto(docSnap.data().photo);
          setDescription(docSnap.data().description);
          setTags(docSnap.data().tags.join(", "));
        } else {
          console.log("Documento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar documento:", error);
      }
    };
    getDocument();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const urlRegex =
      /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}(\:[0-9]{1,5})?(\/\S*)?$/i;
    if (!urlRegex.test(photo)) {
      setError("Por favor adicionar uma URL de imagem valida!");
      setLoading(false);
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !photo || !description || !tags) {
      setError("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        title,
        photo,
        description,
        tags: tagsArray,
      });

      alert("Documento atualizado com sucesso!");

      navigate("/dashboard");

    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
    }
  }

  return (
    <section className="container max-w-5xl m-auto flex h-[calc(100vh-150px)] mt-5">
      <div className="container max-w-3xl m-auto">
        {error && (
          <div className="flex items-center justify-center h-12 w-full bg-red-600 text-white rounded shadow mb-2">
            {error}
          </div>
        )}

        <h1 className="text-2xl mb-4">Alterar Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col mb-2">
            <span className="text-xs mb-1">Título:</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite um título para o post."
              className="w-full h-10 p-2 border shadow rounded"
            />
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-xs mb-1">URL Imagem:</span>
            <input
              type="text"
              name="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Cole a URL da imagem aqui."
              className="w-full h-10 p-2 border shadow rounded"
            />
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-xs mb-1">Descrição:</span>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 p-2 border shadow rounded"
              placeholder="Digite uma descrição para o post."
            ></textarea>
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-xs mb-1">Tags:</span>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Digite palavras-chaves"
              className="w-full h-10 p-2 border shadow rounded"
            />
          </label>
          {!loading ? (
            <button className="w-48 bg-blue-500 text-white flex float-end items-center justify-center h-12 shadow rounded">
              Salvar
            </button>
          ) : (
            <button className="w-48 bg-gray-400 text-black flex float-end items-center justify-center h-12 shadow rounded">
              Aguarde...
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default EditPost;
