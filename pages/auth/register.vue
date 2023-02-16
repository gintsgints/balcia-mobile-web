<script setup>

  function _arrayBufferToBase64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
  }

  async function calculateVerificationCode(documentHash) {
    const buffer = await self.crypto.subtle.digest('SHA-256', documentHash)
    const codearray = new Uint8Array(buffer)
    const firstbyte = codearray[30]
    const secondbyte = codearray[31]
    const positiveInteger = ((firstbyte << 8) + secondbyte) & 0xffff
    const code = positiveInteger.toString()
    const paddedCode = "0000" + code
    return paddedCode.substring(code.length)
  }

  const { register } = useAuth()
  const error = useAuthError()

  const emailRules = [
    (value) => !!value || 'Please provide e-mail for username.'
  ]
  const rcRules = [
    (value) => !!value || 'Please provide registration code.'
  ]
  const passwordRules = [
    (value) => !!value || 'Please provide password.',
    (value) => (value && value.length >= 6) || 'minimum 6 characters',
  ]
  const confirmPasswordRules = [
    (value) => !!value || 'Type confirm password.',
    (value) =>
          value === passwordField.value || 'The password confirmation does not match.',
  ]

  const doRegister = async () => {
    const { valid } = await form.value.validate()

    if (valid) {
      const array = new Int8Array(64)
      self.crypto.getRandomValues(array);
      const hashBuffer = await self.crypto.subtle.digest('SHA-512', array);
      const hashArray = new Int8Array(hashBuffer)
      const hashEncoded = _arrayBufferToBase64(hashArray)
      code.value = await calculateVerificationCode(hashArray)
      await register(emailField.value, passwordField.value, rcField.value, hashEncoded)
      if (error.value) return
      await navigateTo('/auth/login')
    }
  }

  const form = ref(null)
  const emailField = ref('')
  const rcField = ref('')
  const passwordField = ref('')
  const confirmPasswordField = ref('')
  const show1 = ref(false)
  const show2 = ref(false)
  const code = ref("")
</script>

<template>
  <v-form ref="form" validate-on="submit" @submit.prevent="doRegister">
    {{ code }}<br/>
    <v-banner
      lines="one"
      icon="mdi-lock"
      color="error"
      v-if="error"
    >
      <v-banner-text>
        {{ error }}
      </v-banner-text>
    </v-banner>
    <v-container>
      <v-text-field
        label="E-mail"
        type="email"
        required
        v-model="emailField"
        :rules="emailRules"
      ></v-text-field>
      <v-text-field
        label="Personal code:"
        required
        v-model="rcField"
        :rules="rcRules"
      ></v-text-field>
      <v-text-field
        label="Password"
        required
        v-model="passwordField"
        :rules="passwordRules"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        v-model="confirmPasswordField"
        label="Password repeat"
        required
        :rules="confirmPasswordRules"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
      ></v-text-field>
      <v-btn type="submit">Register</v-btn>
    </v-container>
  </v-form>
</template>
