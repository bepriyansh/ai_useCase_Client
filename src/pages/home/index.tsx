import { useEffect } from "react";
import { getFeed } from "../../api/post";

const Home = () => {
    useEffect(()=>{
        const get = async() =>{
            try {
                const d = await getFeed();
                console.log(d);
            } catch (error) {
                console.log(error)
            }
        }
        get();
    }, []);

    return <div>Home</div>
}

export default Home;