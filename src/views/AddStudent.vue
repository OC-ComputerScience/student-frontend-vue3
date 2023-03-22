<script setup>
import StudentServices from "../services/StudentServices.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const student = ref({});
const errors = ref({});

function addStudent() {
  StudentServices.addStudent(student.value)
    .then(() => {
      router.push({ name: "list" });
    })
    .catch((error) => {
      if (error.response != null && error.response.status == "406") {
        for (let obj of error.response.data) {
          if (obj.attributeName === undefined) {
            obj.attributeName = "idNumber";
          }
          errors.value[obj.attributeName] = obj.message;
        }
      } else {
        message.value = "Error: " + error.code + ":" + error.message;
        console.log(error);
        console.log(error);
      }
    });
}
function cancel() {
  router.push({ name: "list" });
}
function cityStateLookup() {
  if (student.value.zip != "") {
    StudentServices.getZipInfo(student.value.zip)
      .then((response) => {
        student.value.city = response.data.city;
        student.value.state = response.data.state_code;
      })
      .catch((error) => {
        message.value = "Error: " + error.code + ":" + error.message;
        console.log(error);
      });
  }
}
</script>

<template>
  <div id="body">
    <h1>Student Add</h1>
    <h2>{{ message }}</h2>
    <h4>{{ student.firstName }} {{ student.lastName }}</h4>
    <br />
    <div class="form">
      <div class="form-group">
        <label for="idNumber">
          OC ID Number
          <span id="idNumberErr" class="text-error">{{
            errors.idNumber || "*"
          }}</span>
        </label>
        <input v-model="student.idNumber" type="text" id="idNumber" />
      </div>

      <div class="form-group">
        <label for="fname">
          First Name
          <span id="firstNameErr" class="text-error">{{
            errors.firstName || "*"
          }}</span>
        </label>
        <input v-model="student.firstName" type="text" id="fname" />
      </div>

      <div class="form-group">
        <label for="lname">
          Last Name
          <span id="lastNameErr" class="text-error">{{
            errors.lastName || "*"
          }}</span>
        </label>
        <input v-model="student.lastName" type="text" id="lname" />
      </div>

      <div class="form-group">
        <label for="zip">
          ZIP
          <span id="zipErr" class="text-error">{{ errors.zip || "*" }}</span>
        </label>
        <input
          v-model="student.zip"
          type="text"
          id="zip"
          v-on:blur="cityStateLookup()"
        />
      </div>

      <div class="form-group">
        <label for="city">
          City
          <span id="cityErr" class="text-error">{{ errors.city || "*" }}</span>
        </label>
        <input v-model="student.city" type="text" id="city" />
      </div>

      <div class="form-group">
        <label for="state">
          State
          <span id="stateErr" class="text-error">{{
            errors.state || "*"
          }}</span>
        </label>
        <input v-model="student.state" type="text" id="state" />
      </div>

      <div class="form-group">
        <label for="email">
          Email
          <span id="emailErr" class="text-error">{{
            errors.email || "*"
          }}</span>
        </label>
        <input v-model="student.email" type="text" id="email" />
      </div>

      <div class="form-group">
        <label for="classification">
          Classification
          <span id="classificationErr" class="text-error">{{
            errors.classification || "*"
          }}</span>
        </label>
        <select v-model="student.classification" id="classification">
          <option value="FR">Freshman</option>
          <option value="SO">Sophomore</option>
          <option value="JR">Junior</option>
          <option value="SR">Senior</option>
        </select>
      </div>

      <div class="form-group">
        <label for="gender">
          Gender
          <span id="genderErr" class="text-error">{{
            errors.gender || "*"
          }}</span>
        </label>
        <select v-model="student.gender" id="gender">
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
      </div>
    </div>
    <br />
    <button class="success" name="Save" v-on:click.prevent="addStudent()">
      Add
    </button>
    <button name="Cancel" v-on:click.prevent="cancel()">Cancel</button>
  </div>
</template>
