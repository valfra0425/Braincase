import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios, apiAxiosAuth } from '@/utils/axios'
import type { Test, CreateTest} from '@/utils/types'

export const useTestStore = defineStore('test', () => {
    const token = localStorage.getItem("token")
    const tests = ref<Test[]>([])
    const test = ref<Test>()
    let axiosAuth = apiAxios
    if (token) {
        axiosAuth = apiAxiosAuth(token)
    }

    async function createTest(test: CreateTest) {
        const response = await axiosAuth.post('/Test', {
            name: test.name,
            classNome: test.className,
            createAt: test.createAt,
            LastUse: test.LastUse,
        },
            {
            }).then(function () {
                alert('Criada com sucesso!')
            }).catch(function (error) {
                console.log(error.message);
            });
        return response
    }

    async function getAllTest() {
        tests.value = await axiosAuth.get('/Test', {
        });
        return tests.value
    }

    async function getTestById(id: string) {
        const response = await axiosAuth.get(`/Test/${id}`, {
        }).catch(function (error) {
            if (error.response) {
                if (error.response.message == 409) {
                    alert('Prova não encontrada')
                } else {
                    alert('Erro ao cadastrar' + error.response.data + error.response.headers)
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
        return response
    }

    async function updateTest(id: string) {
        const response = await axiosAuth.put(`/Test/${id}`, {
        }).catch(function (error) {
            if (error.response) {
                // Request made and server responded
                if (error.response.message == 409) {
                    alert('Instituição já cadastrado')
                } else {
                    alert('Erro ao atualizar' + error.response.data + error.response.headers)
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }

        });
        return response
    }

    async function deleteTest(id: string) {
        const response = await axiosAuth.delete(`/Test/${id}`, {
        }).catch(function (error) {
            if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
        return response

    }

    return{
        test,
        tests,
        createTest,
        getAllTest,
        getTestById,
        updateTest,
        deleteTest,
    }
})