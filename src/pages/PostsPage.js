import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { postsRef } from "../firebase-config";
import PostCard from "../components/PostCard";

export default function HomePage({ showLoader }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(postsRef, orderBy("createdAt", "desc")); // order by: lastest post first
        const unsubscribe = onSnapshot(q, data => {
            const postsData = data.docs.map(doc => {
                return { ...doc.data(), id: doc.id };
            });
            setPosts(postsData);
            showLoader(false);
        });
        return () => unsubscribe();
    }, [showLoader]);

    return (
        <section className="page">
            <section className="grid-container">
                {posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
            </section>
        </section>
    );
}
