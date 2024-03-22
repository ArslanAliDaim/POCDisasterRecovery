<template>
    <div>
        <div class="session-part mt-10">
            <div class="content principal-text">
                <div>DEXTR FLEX is now CONNECTPATH</div>
                <div>
                    The future of CX is here.
                </div>
            </div>
            <div class="login-form-container">
                <div class="login-form">
                    <div class="login-form-label-en">
                        Sign in <br />
                        To Continue
                    </div>
                    <input id="inputAlias" type="text" class="login-input" placeholder="Enter Your Instance Alias" />
                    <button class="login-btn" @click="handleLogin" id="btnSecureLogin" ref="btnSecureLogin">
                        Secure Login
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'HomePage',
    computed: {
        ...mapState(['count'])
    },
    mounted() {
        console.log()
    },
    methods: {
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
    }
}
</script>

<style scoped>
.mt-10 {
    margin-top: 10px;
}

.ml-10 {
    margin-left: 10px;
}

.logo-box {
    width: 100%;
    height: 50px;
    text-align: left;
    margin-top: 0px;
}

.logo-box>img {
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
}

.principal-text {
    line-height: 1em;
    margin-bottom: 20px;
}

.login-input {
    margin-top: 38px;
    width: calc(100% - 60px);
    height: 60px;
    border-radius: 10px;
    background: #f9faff;
    border: 1px solid #5364a0;
    text-align: center;
    font-family: "Poppins";
    font-size: 18px;
}

.login-input:focus {
    outline-color: #c6ccf0;
    outline: none;
}

.login-form-container {
    margin: auto 172px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
}

.login-form {
    min-width: 460px;
    height: 400px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
}

.login-form-label-en {
    font-size: 36px;
    color: #0c154a;
    text-align: center;
}

.login-btn {
    font-family: "Poppins";
    margin-top: 12px;
    background: #0b567c;
    border-radius: 10px;
    padding: 10px 30px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    border: none;
}

.login-btn:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.login-btn:active {
    transform: translateY(2px);
}
</style>