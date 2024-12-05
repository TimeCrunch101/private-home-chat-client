import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: () => import('../views/ContactsView.vue')
    },
    {
      path: '/chat-rooms',
      name: 'Chat Rooms',
      component: () => import('../views/ChatRooms.vue')
    },
    {
      path: '/messages',
      name: 'Messages',
      component: () => import('../views/MessagesView.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/chat/:username',
      name: 'Chat',
      component: () => import('../views/ChatView.vue')
    },
  ]
})

export default router
