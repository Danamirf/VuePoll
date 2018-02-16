  <template>
    <div class="polladmin">
      <h2> Current Polls </h2>
      <div class="newpoll">
        <input type="text" v-model="question" placeholder="Question"> <br>
        <ul v-for="option in votingOptions">
          <li> {{option}} </li>
        </ul>

        <input type="text" v-model="pollOption" placeholder="Voting Option"> <br>
        <button v-on:click="addOption" > Add Additional Voting Option </button>
        <button v-on:click="pollCreation" > Create Poll </button>

      <p> <router-link to="mypolls"> My Polls </router-link> </p>
      </div> 
      <button v-on:click="logout">Logout</button>
    </div>
  </template>

  <script>

  import firebase from 'firebase'

  // var database = firebase.database();

  export default {
    name: 'polladmin',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        question: '',
        pollOption: '',
        votingOptions: []
      }
    },
    methods: {
      addOption: function() {
        this.votingOptions.push(this.pollOption)
        this.pollOption = ''
      },
      pollCreation: function() {
        var currentUser = firebase.auth().currentUser
        var newPollRef = firebase.database().ref('polls').push({
          question: this.question,
          owner: currentUser.email
        }); 
        for (var i = 0; i < this.votingOptions.length; i++)
        {
            firebase.database().ref('polls/' + newPollRef.key).child('answers').push({
            answer: this.votingOptions[i],
            score: 0
            });
        }
        this.$router.replace('mypolls')
      },
      logout:  function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  button {
    color: red;
  }
  </style>
