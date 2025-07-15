import React from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuthValue();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,6}(\:[0-9]{1,5})?(\/\S*)?$/i;
    if(!urlRegex.test(photo)) {
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
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        photo,
        description,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
        createdAt: Timestamp.now(),
      });

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Erro ao inserir post:");
      console.log(error);
      return;
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

        <h1 className="text-2xl mb-4">Cadastrar Post</h1>
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

export default Posts;
