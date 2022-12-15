import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

import { Grid, School as Student } from "@vicons/ionicons5"

import { ChalkboardTeacher, School } from "@vicons/fa"

import { DataTable } from "@vicons/carbon"

export const routes = [
  {
    path: "/",
    name: "Home",
    title: "儀錶板",
    icon: Grid,
    component: Home,
  },
  {
    path: "/teacher",
    name: "Teacher",
    title: "教師管理",
    icon: ChalkboardTeacher,
    component: () => import("@/views/Teacher.vue"),
  },
  {
    path: "/school",
    name: "School",
    title: "學校管理",
    icon: School,
    component: () => import("@/views/School.vue"),
  },
  {
    path: "/student",
    name: "Student",
    title: "學生管理",
    icon: Student,
    component: () => import("@/views/Student.vue"),
  },
  {
    path: "/record",
    name: "Record",
    title: "記錄管理",
    icon: DataTable,
    component: () => import("@/views/Record.vue"),
  },
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
