import { httpClient } from 'src/api/http';
import * as querystring from "querystring";

export async function loadStudents({ commit, dispatch }, { filter }) {
  commit('fetchStudentsBegin');

  try {
    const queryParams = new URLSearchParams({
      ...filter
    }).toString()
    const response = await httpClient.get(`/students?${queryParams}`)
    commit('fetchStudentsSuccess', {
      students: response
    })

    if(response.students && response.students.length > 0) {
      return response.students
    } else {
      return null
    }
  } catch (error) {
    commit('fetchStudentsError', error)
    return null
  }
}

export async function loadStudent({commit, dispatch}, studentId) {
  try {
    commit('fetchStudentBegin')
    const student = await httpClient.get(`/students?id=${studentId}`)

    commit('fetchStudentSuccess', student)

  } catch (error) {
    commit('fetchStudentError', {
      error
    })
  }
}

export async function saveStudent({commit}, student) {
  commit('saveStudentBegin')

  try {
    let data = querystring.stringify(student)
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    if (student.id) {
      await httpClient.post('/update', data, config)
    } else {
      await httpClient.post('/students', data, config)
    }

    commit('saveStudentSuccess')
  } catch (error) {
    commit('saveStudentError', error)
  }
}

export async function deleteStudent({commit}, studentId) {
  commit('deleteStudentBegin')

  try {
    let data = querystring.stringify({
      id: studentId
    })
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }

    await httpClient.post('/delete', data, config)

    commit('deleteStudentSuccess')
  } catch (error) {
    commit('deleteStudentError', error)
  }
}
