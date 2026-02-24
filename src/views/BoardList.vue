<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import boardApi from '@/api/board'

const router = useRouter()
const posts = ref([])
const searchQuery = ref('')
const displayedPosts = ref([])

const updateIdx = ref('')
const updateTitle = ref('')
const updateContents = ref('')
const isEditing = ref(false)

onMounted(async () => {
  try {
    const res = await boardApi.list()
    posts.value = Array.isArray(res) ? res : []
    displayedPosts.value = posts.value.slice(0, 5)
  } catch (error) {
    console.error('게시글 목록 로드 오류:', error)
    posts.value = []
    displayedPosts.value = []
  }
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

const selectPostForEdit = (post) => {
  updateIdx.value = post.idx
  updateTitle.value = post.title
  updateContents.value = post.contents
  isEditing.value = true
}

const cancelEdit = () => {
  updateIdx.value = ''
  updateTitle.value = ''
  updateContents.value = ''
  isEditing.value = false
}

const update = async () => {
  if (!updateIdx.value || !updateTitle.value.trim() || !updateContents.value.trim()) {
    alert('모든 필드를 입력해주세요.')
    return
  }
  
  try {
    await boardApi.update(updateIdx.value, {
      title: updateTitle.value,
      contents: updateContents.value
    })
    
    const res = await boardApi.list()
    posts.value = Array.isArray(res) ? res : []
    displayedPosts.value = posts.value.slice(0, 5)
    
    updateIdx.value = ''
    updateTitle.value = ''
    updateContents.value = ''
    isEditing.value = false
    
    alert('게시글이 수정되었습니다.')
  } catch (error) {
    console.error('수정 오류:', error)
    alert('게시글 수정에 실패했습니다.')
  }
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

    <div v-if="isEditing" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
      <h3>게시글 수정</h3>
      <div>
        <label>ID: {{ updateIdx }}</label>
      </div>
      <div>
        <input v-model="updateTitle" placeholder="제목" style="width: 100%; margin: 5px 0;"/>
      </div>
      <div>
        <textarea v-model="updateContents" placeholder="내용" style="width: 100%; margin: 5px 0; min-height: 100px;"></textarea>
      </div>
      <div>
        <button @click="update">수정 완료</button>
        <button @click="cancelEdit">취소</button>
      </div>
    </div>

    <div>
      <div v-for="post in displayedPosts" :key="post.idx" style="border: 1px solid #ddd; padding: 10px; margin: 5px 0;">
        <div><strong>ID:</strong> {{ post.idx }}</div>
        <div><strong>제목:</strong> {{ post.title }}</div>
        <div><strong>내용:</strong> {{ post.contents }}</div>
        <button @click="selectPostForEdit(post)" style="margin-top: 5px;">수정</button>
        <button @click="selectPostDelete(post)" style="margin-top: 5px; margin-left: 2px;">삭제</button>
      </div>
    </div>
  </div>
</template>
