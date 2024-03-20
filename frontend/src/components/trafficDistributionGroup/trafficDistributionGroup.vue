<template>
    <div class="container">
        <div v-if="isLoading">
            <h3>Loading....</h3>
        </div>
        <div v-else>
            <h1>Add Tags</h1>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" class="form-control" required>
            </div>
            <div v-for="(tag, index) in tags" :key="index">
                <div class="form-group">
                    <label :for="'tag_' + index">Tag:</label>
                    <input type="text" :id="'tag_' + index" v-model="tags[index]" class="form-control" required>
                    <span v-if="!isValidTag(index)" class="error-message">Please enter a valid Tag</span>
                </div>
                <button @click="removeTag(index)" v-if="index > 0" class="remove-btn">Remove</button>
            </div>
            <button @click="addTag" class="add-btn">Add More Tag</button>
            <div>
                <button @click="submitForm" :disabled="!isFormValid" class="submit-btn">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'TrafficDistributionGroup',
    data() {
        return {
            name: '',
            tags: [''], // Initial tag field
            isLoading: false,
            createdMessage: ''
        };
    },
    computed: {
        isFormValid() {
            return this.name.trim() !== '' && this.tags.some(tag => tag.trim() !== '');
        }
    },
    methods: {
        ...mapActions(["createTrafficDistributionGroup"]),
        addTag() {
            this.tags.push('');
        },
        removeTag(index) {
            this.tags.splice(index, 1);
        },
        isValidTag(index) {
            return this.tags[index].trim() !== '';
        },
        async submitForm() {
            try {
                if (this.isFormValid) {
                    this.isLoading = true;
                    const tagsObject = {};
                    this.tags.forEach((tag, index) => {
                        console.log("Tagssasss", tag)
                        tagsObject[`tag${index + 1}`] = tag;
                    });
                    const InstanceId = localStorage.getItem("InstanceId");
                    const payload = {
                        InstanceId: InstanceId,
                        Name: this.name,
                        Tags: tagsObject
                    }
                    const response = await this.createTrafficDistributionGroup(payload);
                    console.log("ASSSSS", response);
                    this.isLoading = true;
                    this.createdMessage = 'Traffic Distribution is created successfully!'
                    console.log('Form submitted');
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

h1 {
    text-align: center;
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

.add-btn,
.remove-btn,
.submit-btn {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.add-btn:hover,
.remove-btn:hover,
.submit-btn:hover {
    background-color: #0056b3;
}

.remove-btn {
    margin-left: 10px;
}

.submit-btn {
    margin-top: 20px;
}

.add-btn[disabled],
.remove-btn[disabled],
.submit-btn[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
