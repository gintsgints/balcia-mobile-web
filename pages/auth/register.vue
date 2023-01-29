<script setup>
  const { register } = useAuth

  // https://gist.github.com/alexdiliberto/39a4ad0453310d0a69ce
  const getRandomBytes = (
    (typeof self !== 'undefined' && (self.crypto || self.msCrypto))
      ? function() { // Browsers
          var crypto = (self.crypto || self.msCrypto), QUOTA = 65536;
          return function(n) {
            var a = new Uint8Array(n);
            for (var i = 0; i < n; i += QUOTA) {
              crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            return a;
          };
        }
      : function() { // Node
          return require("crypto").randomBytes;
        }
  )();

  // https://stackoverflow.com/questions/55926281/how-do-i-hash-a-string-using-javascript-with-sha512-algorithm
  function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
  }

  const doRegister = () => {
    sha512(getRandomBytes(64).toString('base64').slice(0, 64)).then( async x => {
      console.log(x);
      register(email_field.value, password_field.value, rc_field.value, x)
    })
  }

  const email_field = ref('')
  const rc_field = ref('')
  const password_field = ref('')
  const password2_field = ref('')
  const show1 = ref(false)
  const show2 = ref(false)
</script>

<template>
  <v-form @submit.prevent="doRegister">
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
