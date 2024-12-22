"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick}) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick && handleTagClick(post.tag)}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [searchedPost, setSearchPost] = useState([])

  const filteredPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i')
    return allPosts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    )
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)

  };

  useEffect(() => {
    const searchTime = setTimeout(() => {
      const result = filteredPosts(searchText)
      setSearchPost(result)
    }, 500)

    return () => {
      clearTimeout(searchTime)
    }
  }, [searchText])
  const fetchPost = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    console.log(data)
    setAllPosts(data)
  }

  useEffect(() => {
    fetchPost()
  }, []);

  const handleClickTag = (tag) => {
    setSearchText(tag)
    filteredPosts(tag)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchedPost.length > 0 ? (
        <PromptCardList 
          data ={searchedPost}
          handleTagClick={handleClickTag}
        />
      ): (
        <PromptCardList 
          data ={allPosts}
          handleTagClick={handleClickTag}
        />
      )}
      
    </section>
  )
}

export default Feed