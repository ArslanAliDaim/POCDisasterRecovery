<!-- src/views/Login.vue -->
<template>
    <div>
        <div v-if="!isLoading">
            <h1>List Phone No</h1>
            <ol class="available-phone-list" v-if="phoneNo.length > 0">
                <li v-for="(item, index) in phoneNo" :key="index">{{ item.PhoneNumber }}</li>
            </ol>
            <div v-else>There is no available phone number. </div>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'ListPhoneNo',
    data() {
        return {
            phoneNo: [],
            isLoading: false
        }
    },
    mounted() {
        this.availablePhoneNumber();
    },
    methods: {
        ...mapActions(["availablePhoneNumberAction"]),
        async availablePhoneNumber() {
            try {
                this.isLoading = true;
                const payload = {
                    countryCode: "US",
                    type: "TOLL_FREE",
                    InstanceId: "0d76ac91-2340-4a4b-bcc5-6b9914c61236"
                }
                const data = await this.availablePhoneNumberAction(payload);
                this.isLoading = false;
                this.phoneNo = data.AvailableNumbersList
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
}
</script>

<style scoped>
.available-phone-list {
    text-align: left;
}
</style>