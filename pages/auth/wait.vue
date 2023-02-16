<script setup>
  const { register, setRegisterRequest } = useAuth()
  const error = useAuthError()
  const registerRequest = useRegisterRequest()

  const nuxtApp = useNuxtApp();

  nuxtApp.hook("page:finish", async () => {
    if (registerRequest.value === null) {
      return
    }
    await register()
    if (error.value) {
      await navigateTo('/auth/register')
      return
    } else {
      await navigateTo('/private')
      return
    }
  });

</script>

<template>
  <div v-if="registerRequest">
    Please approve your personal code with SmartID application.
    SmartID code:
    {{ registerRequest.code }}
  </div>
</template>