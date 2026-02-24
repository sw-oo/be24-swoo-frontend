import api from '@/plugins/axiosinterceptor'

const save = async (dto) => {
  const res = await api.post('/board', {
    title: dto.title,
    contents: dto.contents
  })
  return res.data
}

const list = async () => {
  const res = await api.get('/board')
  return res.data
}

const findById = async (idx) => {
  const res = await api.get(`/board/${idx}`)
  return res.data
}

const findByTitle = async (title) => {
  const res = await api.get('/board/search', {
    params: {
      title: title
    }
  })
  return res.data
}

const update = async (idx, dto) => {
  const res = await api.put(`/board/update/${idx}`, {
    title: dto.title,
    contents: dto.contents
  })
  return res.data
}

const deleteById = async (idx) => {
  const res = await api.delete(`/board/delete/${idx}`)
  return res.data
}


export default { save, list, findById, findByTitle, update, deleteById  }
