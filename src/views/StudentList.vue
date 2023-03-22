<script setup>
import StudentServices from "../services/StudentServices.js";
import StudentDisplay from "../components/StudentDisplay.vue";

import { ref, onMounted } from "vue";

const students = ref(null);
const message = ref("");

onMounted(() => {
  getStudents();
});

function getStudents() {
  StudentServices.getStudents()
    .then((response) => {
      students.value = response.data;
      message.value = "";
    })
    .catch((error) => {
      message.value = "Error: " + error.code + ":" + error.message;
      console.log(error);
    });
}
</script>

<template>
  <div id="body">
    <h1>Student List</h1>
    <br />
    <h2>{{ message }}</h2>
    <div class="grid-container">
      <StudentDisplay
        v-for="student in students"
        :key="student.id"
        :student="student"
        @deletedStudent="getStudents()"
      />
    </div>
  </div>
</template>

<style></style>
