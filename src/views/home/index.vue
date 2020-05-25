<template>
    <div>
        <span class="text">{{data}}</span>
        <img :src="img" alt="">
        <div class="img"></div>
    </div>
</template>

<script>
import img from '@/assets/images/1.jpeg'
    export default {
        data() {
            return {
                img,
                data: '测试自动增加浏览器前缀'
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
img {
    width: 100px;
    height: 100px;
}
.img {
    background-image: url('../../assets/images/1.jpeg');
    width: 100px;
    height: 100px;
}
</style>