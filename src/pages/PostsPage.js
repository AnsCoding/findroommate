import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { postsRef } from "../firebase-config";
import PostCard from "../components/PostCard";

export default function HomePage({ showLoader }) {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const q = query(postsRef, orderBy("createdAt", "desc")); // order by: lastest post first
    const unsubscribe = onSnapshot(q, (data) => {
      const postsData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setPosts(postsData);
      showLoader(false);
    });
    return () => unsubscribe();
  }, [showLoader]);

  return (
    <section className="page">
      <section>
        <h1 className="b">FindRoommate</h1>

        <p>En roommate er mere end en lejer 😇</p>
        <input
          type="search"
          placeholder="Hvor søger du roommates?"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className="shadow">
          <div>
            <p> Nyeste roommates</p>
          </div>
          <div>
            <button onClick={toggleModal} className="btn-modal">
              <b>Filtrer</b>
            </button>
            {modal && (
              <div className="modal">
                <div className="overlay">
                  <div className="modal-content">
                    <h2>Hello</h2>
                    <p>lorek skd skd kk sdk skd ksd skd ksskd ks dskd ks dks skd sk dks dks dskd ks dks dksd</p>
                  </div>
                  <button className="close-modal" onClick={toggleModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid-container">
        {posts
          .filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
              return post;
            }
          })
          .map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
      </section>
    </section>
  );
}
