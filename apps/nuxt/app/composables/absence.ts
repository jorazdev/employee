import { EMPLOYES_ABSENCES, UPDATE_ABSENCE_MUTATION } from "~/gql/absence.ql";
import type { TAbsence, TRandomUser } from "~/types/absence";
import { ref, watch, onMounted } from 'vue'

export default function useAbsence() {
  const absenceForm = ref<TAbsence>({
    abscenceId: "",
    firstName: "",
    lastName: "",
    startDate: "",
    endDate: ""
  })

  const absences = useState<TAbsence[]>('absences', () => ([]))

  // useLazyQuery: no automatic fetching
  const { load: loadAbsences, result, loading, error } = useLazyQuery(
    EMPLOYES_ABSENCES,
    { fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first' }
  )

  // client-side fetch only
  onMounted(async () => {
    try {
      await loadAbsences()
    } catch (err) {
      console.warn('Fetch échoué, retry dans 1s...')
    }
  })

  // Update absences as soon as the result is available
  watch(result, (val) => {
    if (!val?.employesAbsences) return
    absences.value = val.employesAbsences
  }, { immediate: true })

  const onUpdateAbsence = async () => {
    const { mutate } = useMutation(UPDATE_ABSENCE_MUTATION)
    const result = await mutate({ updateAbsInput: { ...absenceForm.value } })
    if (result?.data.updateAbsenceEmployee) {
      const updatedAbsence = result.data.updateAbsenceEmployee
      if (!absenceForm.value.abscenceId) {
        absences.value = [...absences.value, { ...updatedAbsence }]
      } else {
        absences.value = absences.value.map(abs =>
          abs.abscenceId === updatedAbsence.abscenceId ? { ...updatedAbsence } : abs
        )
      }
    }
  }

  const getUserRandom = async (): Promise<TRandomUser | null> => {
    const { data } = await useFetch<TRandomUser>('https://randomuser.me/api/?results=1')
    return data.value ?? null
  }

  return {
    absenceForm,
    absences,
    onUpdateAbsence,
    getUserRandom,
    loadAbsences,
    loading,
    error
  }
}
