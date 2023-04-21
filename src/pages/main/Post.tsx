import { Post as IPost } from './Main'
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'


interface Props {
    post: IPost
}

interface Like {
    userId: string;
}

export default function Post(props: Props) {
    const [user] = useAuthState(auth)

    const [likes, setlikes] = useState<Like[] | null>(null)


    //destructuring the props object

    const { post } = props

    const likesRef = collection(db, 'likes')

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setlikes(data.docs.map(
            (doc) => ({ userId: doc.data().userId })
        ))
    }


    //we used CreateFormData to give what kind of datatype is the data
    const addLike = async () => {

        try {
            //addDoc returns a promise, first pass reference to the document and then pass the data
            await addDoc(likesRef, { userId: user?.uid, postId: post.id })

            if (user) {
                setlikes((prev) => prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
                )


            }
        } catch (err) {

            console.log(err)
        }
    }
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])


    return (
        <div className='center'>
            <div className="card text-dark bg-info mb-3 text-center post-container">

                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">
                        {post.description}
                    </p>
                    <p className="card-text">
                        <strong>@{post.username}</strong><br />
                        <button onClick={addLike}>{hasUserLiked ? <>  <i className="fa fa-thumbs-up fa-2x" aria-hidden="true"></i> </> : <> <i className="fa fa-thumbs-down fa-2x" aria-hidden="true"></i> </>}</button>
                        <br />
                        {likes && <> <i className="fa-sharp fa-solid fa-heart fa-beat-fade" style={{ color: '#ff0000;' }}></i> {likes.length}</>}


                    </p>
                </div>
            </div>

            {/* <h1>{post.title}</h1>
                <h3>{post.description}</h3>
                <h5>@{post.username}</h5> */}


        </div>
    )
}
