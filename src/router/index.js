import Vue from 'vue'
import Router from 'vue-router'

import PollAdmin from '@/components/PollAdmin'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import MyPolls from '@/components/MyPolls'
import EditPoll from '@/components/EditPoll'
import PollDetail from '@/components/PollDetail'
import firebase from 'firebase'


Vue.use(Router)

var router = new Router({
  routes: [
  	{
      path: '*',
      redirect: '/login'
    }, 
    {
      path: '/polladmin',
      name: 'PollAdmin',
      component: PollAdmin,
      meta: {
      	authNeeded: true
      }
    },
    {
      path: '/editpoll/:id',
      name: 'EditPoll',
      component: EditPoll,
    },
    {
      path: '/mypolls',
      name: 'MyPolls',
      component: MyPolls,
      meta: {
      	authNeeded: true
      }
    },
    {
      path: '/polldetail/:id',
      name: 'PollDetail',
      component: PollDetail
    },
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
    	path: '/signup',
    	name: 'Signup',
    	component: Signup
    }
  ]
})

router.beforeEach((to, from ,next) => {
	var currentUser = firebase.auth().currentUser;
	var authNeeded = to.matched.some(record => record.meta.authNeeded);

	if (authNeeded && !currentUser) next('login') //if user isn't logged in trying to access restricted content
	//else if (!authNeeded && currentUser) next ('polladmin')
	else next()
})

export default router