
import type { TSignin, TSignup, TUser } from "~/types/user.type";
import useLogin from "./login";
import {jwtDecode} from 'jwt-decode'
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "~/gql/user.ql";

// https://apollo.nuxtjs.org/getting-started/quick-start
// https://www.npmjs.com/package/@vue/apollo-composable

export default function useUser() {
    
    const { titleSelected } = useLogin()
    const tokenCo = useCookie<string>('token')
    const userCo = useCookie<TUser>('user')

    const show = useState<boolean>('showSpinner', () => false)

    const signupForm = useState<TSignup>('signupForm', () => (
        {
            id:0,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            avatarUrl: ""
        }
    ))
    const signinForm = useState<TSignin>('signinForm', () =>(
        {
            email: "",
            password: ""
        }
    ))
    const users = ref<TUser[]>([])

    // liste réactive
    //const users = computed<TUser[]>(() => result.value?.users ?? [])
   /* watch(() => result.value?.users, value => {
        users.value = value || []
    })*/

    const onSignup = async () => {
        show.value = true
        const { mutate } = useMutation(SIGNUP_MUTATION)
        const result = await mutate({
            input: {
                ...signupForm.value
            }
        })
        if(result?.data.register) {
            show.value = false
            //clearForm(signupForm.value)
            signinForm.value.email = result?.data.register.email
            titleSelected.value = 'Sign in'
        }
    }

    const onSignin = async () => {
        if(!signinForm.value.email && !signinForm.value.password) return
        show.value = true
        const { mutate } = useMutation(SIGNIN_MUTATION)
        const result = await mutate({
            input: {
                ...signinForm.value
            }
        })
        if(result?.data.login.access_token) {
            show.value = false
            const userJwt: TUser = jwtDecode(result?.data.login.access_token)
            userCo.value = userJwt
            tokenCo.value = result?.data.login.access_token
            navigateTo('/dashboard')
            window.location.reload()
        }
    }

    return {
        signupForm,
        signinForm,
        users,
        onSignup,
        onSignin
    }
}