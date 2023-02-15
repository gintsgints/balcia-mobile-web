<script setup>
definePageMeta({
  middleware: ['user-only']
})

const { me } = useMe()
const user = useAuthUser()
const person = usePerson()

const getMyData = async () => {
  await me()
}

</script>

<template>
  <v-btn @click="getMyData">Get My Private Data</v-btn><br/>
  Auth token:<br/>
  {{ user }}
  User Obect:<br/>
  {{ person }}
</template>