<template>
  <v-app>
    <v-layout>
      <v-app-bar>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-app-bar-title>Balcia insurance</v-app-bar-title>
        </template>
      </v-app-bar>

      <v-navigation-drawer>Nav Bar</v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </v-app>
</template>