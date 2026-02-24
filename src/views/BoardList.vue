<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import boardApi from '@/api/board'

const router = useRouter()
const posts = ref([])
const searchQuery = ref('')
const displayedPosts = ref([])

onMounted(async () => {
  const res = await boardApi.list()
  posts.value = res.data
  displayedPosts.value = posts.value.slice(0, 5);
})

const search = async () => {
  if (!searchQuery.value.trim()) {
    return
  }
  
  const query = searchQuery.value.trim()
  const isNumber = /^\d+$/.test(query)
  
  try {
    if (isNumber) {
      const res = await boardApi.findById(Number(query))
      displayedPosts.value = Array.isArray(res) ? res : [res]
    } else {
      const res = await boardApi.findByTitle(query)
      displayedPosts.value = Array.isArray(res) ? res : [res]
    }
  } catch (error) {
    console.error('검색 오류:', error)
    displayedPosts.value = []
  }
}

const goToCreatePost = () => {
  router.push('/create')
}
</script>

<template>
  <div>
    <div>
      <input v-model="searchQuery" placeholder="input idx or title"/>
      <button @click="search">검색</button>
      <button @click="goToCreatePost">게시글 추가</button>
    </div>
    <div>
      <div v-for="post in displayedPosts" :key="post.id">
        <div>{{ post.title }}</div>
        <div>{{ post.contents }}</div>
      </div>
    </div>
  </div>
</template>
