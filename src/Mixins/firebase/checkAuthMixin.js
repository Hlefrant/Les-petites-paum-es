import * as firebase from 'firebase/app';

export const checkAuthMixin = {
    mounted: function(){
        if (firebase.auth().currentUser !== null){
            this.$router.push('/')
        }
    }
}