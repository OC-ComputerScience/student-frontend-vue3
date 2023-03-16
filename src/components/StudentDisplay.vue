<script setup>
import StudentServices from "../services/StudentServices.js";
import { ref } from "vue";
const props = defineProps(["student"]);
const emit = defineEmits(["deletedStudent"]);

const show = ref(false);
const deleteError = ref(false);

function deletedStudent() {
  emit("deletedStudent");
}

function deleteStudent(id) {
  StudentServices.deleteStudent(id)
    .then((response) => {
      show.value = false;
      deleteError.value = false;
      deletedStudent();
    })
    .catch((error) => {
      console.log(error);
      deleteError.value = true;
    });
}
</script>
<template>
  <div class="grid-item">{{ props.student.idNumber }}</div>
  <div class="grid-item">
    {{ props.student.firstName }} {{ props.student.lastName }}
  </div>
  <div class="grid-item">
    <router-link
      :to="{ name: 'editStudent', params: { id: props.student.id } }"
      custom
      v-slot="{ navigate }"
    >
      <button @click="navigate" role="link">Edit</button>
    </router-link>
  </div>
  <div class="grid-item">
    <button @click="show = true" role="link">Delete</button>
  </div>

  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click="show = false" class="close">&times;</span>
        <p v-if="!deleteError">
          Are you sure you want to delete <br />
          {{ props.student.firstName }} {{ props.student.lastName }}?
        </p>
        <p v-if="deleteError">
          Error deleting<br />{{ props.student.firstName }}
          {{ props.student.lastName }}.
        </p>
      </div>
      <br />
      <div class="modal-body">
        <button v-if="!deleteError" v-on:click="show = false">
          No, cancel
        </button>
        <button
          v-if="!deleteError"
          class="error"
          v-on:click="deleteStudent(props.student.id)"
        >
          Yes, delete
        </button>
        <button
          v-if="deleteError"
          v-on:click="
            deleteError = false;
            show = false;
          "
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
