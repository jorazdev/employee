import type { TRandomUser } from "~/types/absence"

export default function useTools(){

    const formatDate = (date: Date | string, format: 'display' | 'iso' = 'display') => {
        const d = typeof date === 'string' ? new Date(date) : date
        
        if (format === 'display') {
          const day = String(d.getDate()).padStart(2, '0')
          const month = String(d.getMonth() + 1).padStart(2, '0')
          const year = d.getFullYear()
          return `${day}/${month}/${year}`
        } else {
          const day = String(d.getDate()).padStart(2, '0')
          const month = String(d.getMonth() + 1).padStart(2, '0')
          const year = d.getFullYear()
          return `${year}-${month}-${day}`
        }
    }

      const getUserRandom = async (): Promise<TRandomUser | null> => {
        const data = await $fetch<TRandomUser>('https://randomuser.me/api/?results=1')
          if(data) {
              return data
          }
          return null
      }

      return {
        formatDate,
        getUserRandom
      }
}