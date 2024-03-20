<template>
    <header>
        <nav>
            <div class="header">
                <div class="logo-box">
                    <img class="login-logo" src="../../assets/dextr_logo.png" alt="App Logo" />
                </div>
                <div>
                    <ul>
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/replicat-instance">Replicate Instance</router-link></li>
                        <li><router-link to="/traffic-distribution">Traffic Distribution</router-link></li>
                        <li><router-link to="/available-phone-no">Available Phone No</router-link></li>
                        <li><router-link to="/claim-phone-no">Claim Phone No</router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    methods: {
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