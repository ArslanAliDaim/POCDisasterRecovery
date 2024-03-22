<!-- src/views/Login.vue -->
<template>
    <div>
        <div v-if="!isLoading">
            <h1>List Traffic Distribution</h1>
            <ol class="available-phone-list" v-if="list.length > 0">
                <li v-for="(item, index) in list" :key="index"><b>Name: </b>{{ item.Name }} <b>Status: </b>{{
                    item.Status }} <b>IsDefault: </b>{{ item.IsDefault }}</li>
            </ol>
            <div v-else>There is no Traffic Distribution Groups. </div>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'ListTrafficDistribution',
    data() {
        return {
            list: [],
            isLoading: false
        }
    },
    mounted() {
        this.trafficDistributionGroupList();
    },
    methods: {
        ...mapActions(["listTrafficDistributionGroup"]),
        async trafficDistributionGroupList() {
            try {
                this.isLoading = true;
                const payload = {
                    InstanceId: "0d76ac91-2340-4a4b-bcc5-6b9914c61236"
                }
                const response = await this.listTrafficDistributionGroup(payload);
                if (response?.$metadata?.httpStatusCode === 200) {
                    this.isLoading = false;
                    this.list = response.TrafficDistributionGroupSummaryList;
                }
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
    margin-top: 5px;
}
.available-phone-list li {
    margin-top: 10px;
}
</style>