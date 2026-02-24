<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import userApi from '@/api/user'

const router = useRouter()
const email = ref('')
const name = ref('')
const password = ref('')

const signup = async () => {
    await userApi.signup({
        email : email.value,
        name : name.value,
        password : password.value
    })
    router.push('/login');
}
</script>


<template>
<div>
    <div>
      <input type="email" v-model="email" placeholder="email"/>
    </div>
    <div>
      <input v-model="name" placeholder="name"/>
    </div>
    <div>
        <input type="password" v-model="password" placeholder="password"/> 
    </div>
    <div>
      <button @click="signup">회원가입</button>
    </div>
</div>
</template>