import Vue from 'vue';

Vue.prototype.a = 'test'
import APP from '../../../src/views/home/index.vue';
new Vue({
    render: (h) => h(APP)
}).$mount('#app')