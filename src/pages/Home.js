
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Blogsection from "../components/Blogsection";
import Spriner from '../components/Spriner'
import { db } from "../firbase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import Mostpopuler from "../components/Mostpopuler";
import Tranding from "../components/Tranding";
const Home = ({ setActive, user }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [trendBlogs, setTrendBlogs] = useState([]);

    const getTrendingBlogs = async () => {
        const blogRef = collection(db, "blogs");
        const trendQuery = query(blogRef, where("trending", "==", "yes"));
        const querySnapshot = await getDocs(trendQuery);
        let trendBlogs = [];
        querySnapshot.forEach((doc) => {
            trendBlogs.push({ id: doc.id, ...doc.data() });
        });
        setTrendBlogs(trendBlogs);
    };

    useEffect(() => {
        getTrendingBlogs();
        const unsub = onSnapshot(
            collection(db, "blogs"),
            (snapshot) => {
                let list = [];
                let tags = [];
                snapshot.docs.forEach((doc) => {
                    tags.push(...doc.get("tags"));
                    list.push({ id: doc.id, ...doc.data() });
                });
                const uniqueTags = [...new Set(tags)];
                setTags(uniqueTags);
                setBlogs(list);
                setLoading(false);
                setActive("home");
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
            getTrendingBlogs();
        };
    }, [setActive]);

    if (loading) {
        return <Spriner />;
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure wanted to delete that blog ?")) {
            try {
                setLoading(true);
                await deleteDoc(doc(db, "blogs", id));
                toast.success("Blog deleted successfully");
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <div className="container-fluid pb-4 pt-4 padding">
            <div className="container padding">
                <div className="row mx-0">
                    <Tranding blogs={trendBlogs} />
                    <div className="col-md-8">
                        <Blogsection
                            blogs={blogs}
                            user={user}
                            handleDelete={handleDelete}
                        />
                    </div>
                    <div className="col-md-3">
                        <Tags tags={tags} />
                        <Mostpopuler blogs={blogs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

