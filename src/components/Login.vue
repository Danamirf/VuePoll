<template>
	<div class="login">
		<h2>Sign In Here</h2>
		<input type="text" v-model="username" placeholder="Username"> <br>
		<input type="password" v-model="password" placeholder="Password"> <br>
		<button v-on:click="login">Login </button>
		
		<p> <router-link to="/signup">Create a new account</router-link> </p>
	</div>
</template>

<script>
	import firebase from 'firebase'

	export default {
		name: 'login',
		data: function() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				//this.$router.replace('hello')
				firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
					(user) => {
						this.$router.replace('polladmin')
					},
					(err) => {
						alert('error' + err.message)
					}
				);
			}
		}
	}
</script>

<style scoped>
</style>