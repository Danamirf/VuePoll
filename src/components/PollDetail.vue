<template>
	<div class="mypolls">
		<h2>Vote on this poll</h2>
		
		<form>
    	<div v-for="option in userPoll.answers" >
    		<input type="radio" name="answer" value="option.answer"> {{option.answer}} <br> 
    	</div>
    </form>

		<p> <router-link to="/polladmin">Create more polls</router-link> </p>
	</div>
</template>

<script>
	import firebase from 'firebase'
	
	export default {
		name: 'mypolls',
		data ()  {
			return {
			userPoll: {}
			}
		},
		created() {
			
			//var userId = firebase.auth().currentUser.uid
				firebase.database().ref('polls').once('value').then((allPolls) => {
					for (var key in allPolls.val())
					{
						var id = this.$route.params.id;
						console.log(this.$route.params.id == key)
						console.log(id)
						var answers = []
						// this data belongs to our logged in user so we will display it.
						if (key == this.$route.params.id) 
						{
							console.log('match')
							for (var ans in allPolls.val()[key].answers)
							{
								var pulledAnswer = {
									answer: allPolls.val()[key].answers[ans].answer,
									score: allPolls.val()[key].answers[ans].score
								};
								answers.push(pulledAnswer)
							}

							var poll = {
								question: allPolls.val()[key].question,
								answers: answers,
								TopLvlKey: key
							};
							this.userPoll = poll
							console.log(this.userPoll)
						}
					}
				});
		},
		methods: {
			submitPoll: function (poll) {
				var id = this.$route.params.id;
				firebase.database().ref('polls').once('value').then((allPolls) => {
					for (var key in allPolls.val())
						if (key == poll.TopLvlKey){
							console.log(allPolls.val()[key])
							firebase.database().ref('polls').child(key).remove()
							var index = this.userPolls.indexOf(poll);
							this.userPolls.splice(index, 1)
							//allPolls.child([key].remove()
						}
					// need to find the original key of the poll
					//console.log(allPolls.val().key)
						
						// if (allPolls.val().key == pollKey)
						// {
						
						// }
				});
				//firebase.database.ref('polls').child(poll.key)	
			}
		}
	}
</script>

<style scoped>
</style>