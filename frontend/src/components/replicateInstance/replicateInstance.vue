<!-- src/views/Login.vue -->
<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h1>Instance Details</h1>
      <div v-if="message">{{ message }}</div>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="instanceId">Instance ID:</label>
          <input type="text" id="instanceId" v-model="instanceId" class="form-control" required>
          <span v-if="!isValidInstanceId" class="error-message">Please enter a valid Instance ID</span>
        </div>
        <div class="form-group">
          <label for="replicaRegion">Replica Region:</label>
          <input type="text" id="replicaRegion" v-model="replicaRegion" class="form-control" required>
          <span v-if="!isValidReplicaRegion" class="error-message">Please enter a valid Replica Region</span>
        </div>
        <div class="form-group">
          <label for="replicaAlias">Replica Alias:</label>
          <input type="text" id="replicaAlias" v-model="replicaAlias" class="form-control" required>
          <span v-if="!isValidReplicaAlias" class="error-message">Please enter a valid Replica Alias</span>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ReplicateInstance',
  data() {
    return {
      instanceId: '',
      replicaRegion: '',
      replicaAlias: '',
      isLoading: false,
      message: ''
    };
  },
  computed: {
    isValidInstanceId() {
      // Add your validation logic for Instance ID here
      return this.instanceId.length > 0;
    },
    isValidReplicaRegion() {
      // Add your validation logic for Replica Region here
      return this.replicaRegion.length > 0;
    },
    isValidReplicaAlias() {
      // Add your validation logic for Replica Alias here
      return this.replicaAlias.length > 0;
    }
  },
  methods: {
    ...mapActions(["replicateInstance"]),
    initState() {
      this.instanceId = '';
      this.replicaRegion = '';
      this.replicaAlias = '';
    },
    async submitForm() {
      try {
        if (this.isValidInstanceId && this.isValidReplicaRegion && this.isValidReplicaAlias) {
          this.isLoading = true;
          const payload = {
            InstanceId: this.instanceId,
            ReplicaRegion: this.replicaRegion,
            ReplicaAlias: this.replicaAlias
          }
          const response = await this.replicateInstance(payload);
          if (response.$metadata?.httpStatusCode === 200) {
            this.message = "Instance replicate!"
            this.isLoading = false;
            this.initState();
            localStorage.setItem("InstanceId", response.Id)
          }
        } else {
          console.log('Form validation failed');
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error)
        return error;
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}

.form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
