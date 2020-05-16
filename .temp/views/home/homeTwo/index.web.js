import Vue from 'vue';

Vue.prototype.a = 'test'
import APP from '../../../../src/views/home/homeTwo/index.vue';
new Vue({
    render: (h) => h(APP)
}).$mount('#app')