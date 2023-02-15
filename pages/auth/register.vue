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

  const doRegister = async () => {
    const array = new Int8Array(64)
    self.crypto.getRandomValues(array);
    const hashBuffer = await self.crypto.subtle.digest('SHA-512', array);
    const hashArray = new Int8Array(hashBuffer)
    const hashEncoded = _arrayBufferToBase64(hashArray)
    code.value = await calculateVerificationCode(hashArray)
    console.log("Verification code to show: ", code)
    try {
      await register(email_field.value, password_field.value, rc_field.value, hashEncoded)
      await navigateTo('/auth/login')
    } catch (callError) {
      error.value = callError
    }
  }

  const email_field = ref('')
  const rc_field = ref('')
  const password_field = ref('')
  const password2_field = ref('')
  const show1 = ref(false)
  const show2 = ref(false)
  const code = ref("")
  const error = ref("")
</script>

<template>
  <v-form @submit.prevent="doRegister">
    {{ code }}<br/>
    {{ error }}<br/>
    <v-container>
      <v-text-field
        v-model="email_field"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="rc_field"
        label="Personal code:"
        required
      ></v-text-field>
      <v-text-field
        v-model="password_field"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="password2_field"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        label="Password repeat"
        required
      ></v-text-field>
      <v-btn type="submit">Register</v-btn>
    </v-container>
  </v-form>
</template>
