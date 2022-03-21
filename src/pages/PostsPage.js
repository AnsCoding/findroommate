import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { postsRef } from "../firebase-config";
import PostCard from "../components/PostCard";

export default function HomePage({ showLoader }) {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
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
        <b>FindRoommate</b>
        <p>En roommate er mere end en lejer 😇</p>
        <input type="search" placeholder="Hvor søger du roommates?" onkeyup="search(this.value)" />
        <div className="shadow">
          <div className="p">
            <p> Nyeste roommates</p>
          </div>
          <div>
            <button onClick={toggleModal} className="btn-modal">
              open
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
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </section>
  );
}
