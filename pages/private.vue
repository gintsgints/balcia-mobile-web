<script setup>
definePageMeta({
  middleware: ['user-only']
})

const currentUser = useAuthUser()
</script>

<template>
  Private page<br/>
  User Obect:<br/>
  {{ currentUser }}
</template>