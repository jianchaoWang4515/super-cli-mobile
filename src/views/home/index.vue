<template>
    <div>
        <span class="text">{{data}}</span>
        <img :src="img" alt="">
    </div>
</template>

<script>
import img from './images/1.jpeg'
    export default {
        data() {
            return {
                data: 'home',
                img
            }
        }
    }
</script>

<style scoped>
div{
    transform: translateX(50px) rotate(-7deg);
}
.text {
    font-size: 24px;
    color: red;
}
</style>