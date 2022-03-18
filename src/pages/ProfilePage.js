import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

export default function ProfilePage({ showLoader }) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const auth = getAuth();

    useEffect(() => {
        showLoader(true);

        async function getUser() {
            if (auth.currentUser) {
                setEmail(auth.currentUser.email);

                const docRef = doc(usersRef, auth.currentUser.uid); // get more info about the user from users collection
                const userData = await (await getDoc(docRef)).data();
                if (userData) {
                    setName(userData.name);
                    setTitle(userData.title);
                    setImage(userData.image);
                }
            }
            showLoader(false);
        }

        getUser();
    }, [auth.currentUser, showLoader]); // dependencies: useEffect is executed when auth.currentUser changes

    async function handleSubmit(event) {
        event.preventDefault();
        showLoader(true);

        const userToUpdate = { name: name, title: title, image: image };
        const docRef = doc(usersRef, auth.currentUser.uid);

        await setDoc(docRef, userToUpdate);
        showLoader(false);
    }

    function handleSignOut() {
        signOut(auth);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage("");
        } else {
            setErrorMessage("The image file is too big!");
        }
    }

    return (
        <section className="page">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="Type name" />
                </label>
                <label>
                    Email
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Type email" disabled />
                </label>
                <label>
                    Title
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="Type your title" />
                </label>
                <label>
                    Image
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img className="image-preview" src={image} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
                </label>
                <p className="text-error">{errorMessage}</p>
                <button>Save User</button>
            </form>
            <button className="btn-outline" onClick={handleSignOut}>
                Sign Out
            </button>
        </section>
    );
}
