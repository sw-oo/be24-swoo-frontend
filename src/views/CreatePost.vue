<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import boardApi from '@/api/board'

const router = useRouter()
const title = ref('')
const contents = ref('')

const createPost = async () => {
  await boardApi.save({
    title: title.value,
    contents: contents.value
  })
  router.push('/')
}
</script>

<template>
  <div>
    <div>
      <input v-model="title" placeholder="title"/>
    </div>
    <div>
      <textarea v-model="contents" placeholder="contents"></textarea>
    </div>
    <div>
      <button @click="createPost">생성</button>
    </div>
  </div>
</template>
