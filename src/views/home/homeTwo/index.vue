<template>
    <div>
        <my-header></my-header>
        {{data}}
    </div>
</template>

<script>
import myHeader from '@/views/components/header.vue'
    export default {
        components: {
            myHeader
        },
        data() {
            return {
                data: 'homeTwo'
            }
        }
    }
</script>