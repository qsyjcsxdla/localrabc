<template>
    <div></div>
</template>

<script>
// import {login} from '@/js/api/auth'
// import {setToken} from '@/js/api/token'

export default {
    data() {
        return {
            code: ''
        }
    },
    mounted() {
        let code = this.$route.query.code
        console.log('code:%s', code);
        if (!code) {
            //检查code
            login();
            return;
        }
        this.code = code;
        //
        let url         = this.$cfg.authUrl+''+this.$cfg.authAccessTokenUri;
        let redirectUrl = this.$cfg.baseUrl+''+this.$cfg.authRedirectUri;
        this.$req.post(url, this.$qs.stringify({
            code        : code,
            redirect_uri: redirectUrl,
            grant_type  : this.$cfg.authGrantType
        }), {
            headers: {
                Authorization: 'Basic '+this.$cfg.authBasicSecret
            }
        }).then(res => {
            console.log(res);
            setToken(res);
            this.$router.push({path: '/'});
        });
    }
}
</script>
