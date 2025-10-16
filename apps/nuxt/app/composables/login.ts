
import type { Component } from "vue";
import SigninForm from '~/components/login/SigninForm.vue'
import SignupForm from "~/components/login/SignupForm.vue";
import type { TLogin } from "~/types/login.type";

export default function useLogin(){

    const componentForm = ref<TLogin[]>([
        {title: "Sign in", component: markRaw(SigninForm)} ,
         {title: "Sign up", component: markRaw(SignupForm)}
    ])
    const titleSelected = useState<string>('titleSelected', () => 'Sign in')
    const componentFormSelected = ref<Component>(componentForm.value[0]?.component ??  SigninForm)
        
    const onSelectForm = (title: string) => {
        const match = componentForm.value.find((item: any) => item.title == title)
        if(match){
            componentFormSelected.value = match.component
        }
        titleSelected.value = title
    }

    watch(() => titleSelected.value, title => {
        if(title === 'Sign in'){
            componentFormSelected.value = SigninForm
        }
    })
    return {
        componentForm,
        componentFormSelected,
        titleSelected,
        onSelectForm
    }
}