import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import Post from './Post';

export interface Post {
  id: string;
  userId: string;
  username: string;
  description: string;
  title: string;
}

export default function Main() {

  const [postList, setpostList] = useState<Post[] | null>(null)

  const postsRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await getDocs(postsRef)
    setpostList(data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    ) as Post[]
    )

  }

  useEffect(() => {
    getPosts();
  }, [])




  return (
    <div>
     
      {postList && postList.map((post) =>
        <Post post={post}/>
      )}
    </div>
  )
}
