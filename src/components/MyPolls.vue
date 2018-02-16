<template>
	<div class="mypolls">
		<h2>Your Polls</h2>
		
		<table v-if="userPolls.length != 0">
			<thead>
				<tr>
				 <th> Question </th>
				 <th> Edit </th>
				 <th> Delete </th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="poll in userPolls" :key="poll.key">
					<td>
						<router-link :to="`/polldetail/${poll.TopLvlKey}`">
							{{poll.question}}
						</router-link>
					</td>
					<td>
						<router-link :to="`/editpoll/${poll.TopLvlKey}`">
							<button> Edit Poll </button> 
						</router-link>
					</td>
					<td v-on:click='deletePoll(poll)'>
						<button> Delete this poll </button>
					</td>
				</tr>
			</tbody>
		</table>
      		
    </ul>

		<p> <router-link to="/polladmin">Create more polls</router-link> </p>
	</div>
</template>

<script>
	import firebase from 'firebase'
	var _ = require('lodash')
	
	
	export default {
		name: 'mypolls',
		data ()  {
			return {
			userPolls: []
			}
		},
		created() {
			var userId = firebase.auth().currentUser.uid
				firebase.database().ref('polls').once('value').then((allPolls) => {
					for (var key in allPolls.val())
					{
						var answers = []
						// this data belongs to our logged in user so we will display it.
						if (allPolls.val()[key].owner == firebase.auth().currentUser.email)
						{
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
							this.userPolls.push(poll)
							console.log(this.userPolls)
						}
					}
				});
		},
		methods: {
			deletePoll: function (poll) {
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