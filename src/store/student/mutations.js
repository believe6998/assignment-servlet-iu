export function fetchStudentsBegin(state) {
  state.students = []
  state.error = null
  state.isLoading = true

}

export function fetchStudentsSuccess(state, {students}) {
  state.students = students
  state.error = null
  state.isLoading = false
}

export function fetchStudentsError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchStudentBegin (state) {
    state.student = {}
    state.isLoading = true
    state.error = null
}

export function fetchStudentSuccess (state, student) {
  state.student = student
  state.error = null
  state.isLoading = false
}

export function fetchStudentError(state, error) {
  state.error = error
  state.isLoading = false
}

export function saveStudentBegin (state) {
  state.error = null
  state.isSaved = false
  state.student = null
  state.isSaving = true
}

export function saveStudentSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveStudentError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteStudentBegin (state) {
  state.error = null
  state.isDeleted = false
  state.student = null
  state.isDeleting = true
}

export function deleteStudentSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteStudentError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}
