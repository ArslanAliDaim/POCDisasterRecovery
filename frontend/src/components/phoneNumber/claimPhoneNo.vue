<template>
    <div class="container">
        <div v-if="isLoading">
            <h1>Loading...</h1>
        </div>
        <div v-else>
            <h1>Claim Phone Number</h1>
            <div v-if="message">{{ message }}</div>
            <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input type="text" id="phone" v-model="phoneNumber" class="form-control" placeholder="Enter phone number"
                    required>
                <span v-if="!isValidPhoneNumber" class="error-message">Please enter a valid phone number</span>
            </div>
            <button @click="submitForm" :disabled="!isValidPhoneNumber" class="submit-btn">Submit</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ClaimPhoneNo',
    data() {
        return {
            phoneNumber: '',
            isLoading: false,
            message: ''
        };
    },
    computed: {
        isValidPhoneNumber() {
            // Regular expression for validating phone number (accepts numbers with optional hyphens or spaces)
            // const phoneRegex = /^\d{3}[\s]?\d{3}[\s]?\d{4}$/;
            return this.phoneNumber.length > 0 ? true : false;
        }
    },
    methods: {
        ...mapActions(["claimPhoneNumber"]),
        async submitForm() {
            try {
                this.isLoading = true;
                // const InstanceId = localStorage.getItem("InstanceId");
                const InstanceId = "0d76ac91-2340-4a4b-bcc5-6b9914c61236";
                const payload = {
                    InstanceId,
                    PhoneNumber: this.phoneNumber
                }
                const response = await this.claimPhoneNumber(payload);
                if (response?.$metadata?.httpStatusCode === 200 ) {
                    this.message = `${this.phoneNumber} has been successfully claimed!`;
                    this.isLoading = false
                    this.phoneNumber = ''
                }
            } catch (error) {
                this.isLoading = false;
                this.message = error.message;
                console.log("Error:: ", error);
                return error;
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
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
}

.submit-btn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.submit-btn[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
