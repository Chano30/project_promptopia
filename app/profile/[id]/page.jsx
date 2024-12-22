"use client"

import { useSession } from "next-auth/react"
import { useSearchParams, useParams } from "next/navigation"
import { useRouter } from "next/router"

import ProfileComponent from "@components/Profile"
import { use, useEffect, useState } from "react"

const UserProfile = () => {
  const searchParams = useSearchParams();
  const params = useParams()
  const profileId = params.id
  const [userPosts,setUserPosts] = useState([]);
  const userName = searchParams.get('name');

  // const handleEdit = (posts) => {
  //   router.push(`/update-prompt?id=${posts._id}`)
  // }
  // const handleDelete = async(post) => {
  //   const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

  //   if(hasConfirmed){
  //     try{
  //       await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });

  //       const filteredPost = posts.filter((p) => p._id !== post._id)
  //       setPosts(filteredPost )
  //     }catch(error){
  //       console.log(error)
  //     }
  //   }
  // }

  useEffect(() => {
    const fetchPost = async () => {
      console.log("FETCHING")
      console.log(profileId)
      try{
        const response = await fetch(`/api/users/${params?.id}/posts`);
        console.log(response)
        const data = await response.json();
        console.log("DATA")
        console.log(data)
        setUserPosts(data)
      }catch(error){
        console.log(error)
      }

    }

    if(profileId) fetchPost()

      console.log(userPosts)
  }, [profileId]);
  
  return (
    <ProfileComponent 
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      // handleEdit={handleEdit}
      // handleDelete={handleDelete}
    />
  )
}

export default UserProfile