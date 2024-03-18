<template>
    <!-- <div>
        <h1>Welcome to Home Page</h1>
        <div>
            <h1>Count: {{ count }}</h1>
        </div>
        <div>
            <button @click="handleLogin" title="Login">Login</button>
            <button @click="fetchData" class="ml-10">Fetch Data</button>
        </div>
    </div> -->
    <div>
        <div class="logo-box">
            <img class="login-logo" src="../../assets/dextr_logo.png" alt="App Logo" />
        </div>
        <div class="session-part mt-10">
            <div class="content principal-text">
                DEXTR FLEX is now CONNECTPATH
            </div>
            <div class="login-button">
                Right
            </div>
        </div>

        <!-- <div class="login-footer">
            <div class="link-button-container">
                <div v-for="(link, index) in links" :key="`link-${index}`" class="link-button"
                    @click="navigateToLink(link.url)">
                    {{ $t(`landing.links.${link.label}`) }}
                </div>
                <div>
                    <Icon type="ios-globe-outline" class="icon-globe" />
                </div>
                <div class="selectLanguage">
                    <Select :not-found-text="$t('common.noMatchingFound')" v-model="systemLanguage"
                        class="vue-lang-input">
                        <Option v-for="(value, index) in availableLanguages" :value="value.iso" :key="index">{{
        $t(`availableLanguages.${value.name}`) }}</Option>
                    </Select>
                </div>
            </div>
            <div class="company-name">© CloudHesive 2017-{{ new Date().getFullYear() }}</div>
        </div>

        <div class="login-form-container">
            <div class="intro-message">
                <div v-if="!partnerTemplate">
                    <p class="principal-text">{{ $t("landing.dextrFlexIsNowConnectpath") }}</p>
                    <p style="font-size: 0.8em">{{ $t("landing.theFutureOfCxIsHere") }}</p>
                </div>
                <div v-else>
                    {{ $t("landing.theOmniChannelContactCenter") }}
                    <span style="font-size: 0.8em">{{ $t("landing.poweredByAmazonConnect") }}</span>
                </div>
            </div>
            <div class="login-form">
                <div v-if="loading && !showLoginForm">
                    <Spin size="large" fix>
                        <Icon type="ios-loading" color="#0c154a" size="40" class="spin-icon-load"
                            style="margin-bottom: 15px"></Icon>
                        <div class="loading-message">{{ loadingMessage }}</div>
                        <div class="sub-loading-message">{{ progressMessage }}</div>
                    </Spin>
                </div>
                <NewLogin :instance-alias="instanceAlias" :loading="loading" @hideSpinner="hideSpinner"
                    @connectLogin="setProgressMessage" @backtoLoginForm="backtoLoginForm" v-if="!showLoginForm" />
                <template v-else>
                    <div :class="$i18n.locale === 'en' ? 'login-form-label-en' : 'login-form-label-es'">
                        {{ $t("landing.signIn") }} <br />
                        {{ $t("landing.toContinue") }}
                    </div>

                    <div v-if="instanceData">
                        <img v-if="adminLogoUrl" :src="adminLogoUrl" />
                        <div class="user-info">
                            <div class="user-info-label">{{ $t("landing.company") }}:</div>
                            <div class="user-info-value">{{ instanceData.AdminCompany }}</div>
                        </div>
                        <div class="user-info">
                            <div class="user-info-label">{{ $t("landing.instance") }}:</div>
                            <div class="user-info-value">
                                {{ instanceData.InstanceAlias }}
                            </div>
                        </div>
                    </div>
                    <input id="inputAlias" ref="inputAlias" type="text" class="login-input"
                        :placeholder="$t('validationMessages.enterYourInstanceAlias')" v-model="instanceAlias"
                        @keydown.enter="login" v-else />

                    <button class="login-btn" @click="login" :disabled="loginProcessing" id="btnSecureLogin"
                        ref="btnSecureLogin">
                        {{ $t("landing.secureLogin") }}
                    </button>
                    <div class="signup-label">{{ $t("landing.dontHaveAccount") }}</div>
                    <div class="signup-btn" @click="signup">
                        {{ $t("landing.signUp") }}
                    </div>
                </template>
            </div>
        </div> -->
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'HomePage',
    computed: {
        ...mapState(['count'])
    },
    mounted() {
        console.log()
    },
    methods: {
        ...mapActions(['fetchDataAction']),
        handleLogin() {
            const url = 'https://dextr-disaster-recovery-poc.my.connect.aws/connect/ccp-v2#/';
            const title = 'ConnectPath - connectpathdev-dextr-disaster-recovery-poc'
            this.centerPopup(url, title, 400, 573);
        },
        centerPopup(url, title, w, h) {
            let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
            let dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

            let width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth
                    ? document.documentElement.clientWidth
                    : screen.width;
            let height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight
                    ? document.documentElement.clientHeight
                    : screen.height;

            let left = width / 1.2 - w / 1.2 + dualScreenLeft;
            let top = height / 2 - h / 2 + dualScreenTop;
            window.globalWindow = window.open(url, title, `toolbar=no, width=400, height=573, top=${top}, left=${left}`);
        },
        async fetchData() {
            const body = {
                key1: "Key 1",
                key2: "Key 2"
            };
            const params = {
                params1: "Params 1",
                params2: "Params 2"
            }
            await this.fetchDataAction({ body, params });
        }
    }
}
</script>

<style>
.mt-10 {
    margin-top: 10px;
}

.ml-10 {
    margin-left: 10px;
}

button {
    width: 100px;
    height: 30px;
    size: 14px;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    background-color: blue;
    cursor: pointer;
}
.logo-box {
    width: 100%;
    height: 50px;
    text-align: left;
    margin-top: 0px;
}
.logo-box > img {
    width: 200px;
    height: 50px;
}
.session-part {
    display: flex;
    align-items: center;
    height: 80vh;
}
.session-part .content {
    width: 50%;
}
.session-part .login-button {
    width: 50%;
    background-color: aqua;
}
.principal-text {
    line-height: 1em;
    margin-bottom: 20px;
}
</style>