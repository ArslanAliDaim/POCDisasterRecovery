<template>
    <header>
        <nav>
            <div class="header">
                <div class="logo-box">
                    <img class="login-logo" src="../../assets/dextr_logo.png" alt="App Logo" />
                </div>
                <div>
                    <ul>
                        <!-- <li><router-link to="/">Home</router-link></li> -->
                        <li><router-link to="/replicat-instance" v-if="isAuthenticated">Replicate Instance</router-link>
                        </li>
                        <li><router-link to="/traffic-distribution" v-if="isAuthenticated">Traffic
                                Distribution</router-link></li>
                        <li><router-link to="/list-traffic-distribution" v-if="isAuthenticated">List Traffic
                                Distribution</router-link></li>
                        <li><router-link to="/available-phone-no" v-if="isAuthenticated">Available Phone
                                No</router-link></li>
                        <li><router-link to="/claim-phone-no" v-if="isAuthenticated">Claim Phone No</router-link></li>
                        <!-- <li><router-link to="/list-phone-no">List Phone No</router-link></li> -->
                        <li v-if="isAuthenticated" @click="handleLogout">Logout</li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "AppHeader",
    computed: {
        ...mapGetters(["isAuthenticated"]),
    },
    methods: {
        ...mapActions(["logout"]),
        handleLogout() {
            this.logout('logout');
        }
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px
}
.header ul li {
    display: inline;
    margin-right: 20px;
}
</style>