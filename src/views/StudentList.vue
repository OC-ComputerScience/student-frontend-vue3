<script setup>
import StudentDisplay from "../components/StudentDisplay.vue";
import StudentServices from "../services/StudentServices.js";
import { ref, onMounted } from "vue";

const students = ref(null);

onMounted(() => {
  getStudents();
});

function getStudents() {
  StudentServices.getStudents()
    .then((response) => {
      students.value = response.data;
    })
    .catch((error) => {
      console.log("There was an error:", error.response);
    });
}
</script>

<template>
  <div id="body">
    <h1>Student List</h1>
    <br />
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
