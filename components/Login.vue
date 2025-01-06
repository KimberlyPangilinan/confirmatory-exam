<script setup>
import { useAuth } from "~/store/useAuth";
const credentials = ref({
    email: "",
    password: "",
})

const auth = useAuth();

</script>
<template>
    <form @submit.prevent="auth.login(credentials)">
        <input v-model="credentials.email" type="email" placeholder="Email" />
        <input v-model="credentials.password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>
</template>