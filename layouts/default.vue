<script lang="ts" setup>
const currentUser = useAuthUser()
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Insurer</v-app-bar-title>
        <v-spacer></v-spacer>
        <NuxtLink v-if="!currentUser" to="/auth/login">
          <v-btn icon>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </NuxtLink>
      </v-app-bar>

      <v-navigation-drawer>Nav Bar</v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>