"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import ProfileComponent from "@components/Profile"
import { useEffect, useState } from "react"

const Profile = () => {
  const{data:session} = useSession();
  const router = useRouter();
  const [posts,setPosts] = useState([]);

  const handleEdit = (posts) => {
    router.push(`/update-prompt?id=${posts._id}`)
  }
  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

        const filteredPost = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPost )
      }catch(error){
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if(!session?.user) router.push('/')

      
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data)
      setPosts(data)
    }

    if(session?.user.id)  fetchPost()
  }, []);
  
  return (
    <ProfileComponent 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default Profile