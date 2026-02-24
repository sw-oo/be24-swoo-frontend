import api from '@/plugins/axiosinterceptor'

const signup = async (dto) => {
    const res = await api.post('/user', {
        email: dto.email,
        name: dto.name,
        password: dto.password
    })
    return res.data
}

export default{ signup }