<template>
    <div>
        {{data}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: 'homeTwoPageTest'
            }
        },
        created() {
            setTimeout(() => {
                this.data = 'homeTwoPageTest111222'
            }, 1000)
        }
    }
</script>