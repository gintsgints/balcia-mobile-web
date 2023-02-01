<script setup>
  const {login } = useAuth()

  const doLogin = async () => {
    try {
      await login(email_field.value, password_field.value)
      await navigateTo('/private')
    } catch (error) {
      
    }
  }

  const email_field = ref('')
  const password_field = ref('')
  const show = ref(false)
</script>

<template>
  <v-form @submit.prevent="doLogin">
    <v-container>
      <v-text-field
        v-model="email_field"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password_field"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        label="Password"
        required
      ></v-text-field>
      <v-btn type="submit">Login</v-btn>
      <br/>
      Have no account? <NuxtLink to="/auth/register">Please register</NuxtLink>
    </v-container>
  </v-form>
</template>
