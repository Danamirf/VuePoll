<template>
	<div class="Signup">
		<h2>Create a new account</h2>
		<input type="text" v-model="username" placeholder="Username"> <br>
		<input type="password" v-model="password" placeholder="Password"> <br>
		<button v-on:click="signup">Sign Up</button>
		
		<p> <router-link to="/login">Return to login</router-link> </p>
	</div>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'signup',
		data: function() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			signup: function() {
				firebase.auth().createUserWithEmailAndPassword(this.username, this.password).then(
					function (user) {
						alert('Your account has been created! ')
					},
					function (err) {
						alert('Error' + err.message)
					}
				);
			}
		}
	}
</script>

<style scoped>
</style>