<template>
    <div id="test">
        {{_uid}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: "陈江"
            }
        },
        mounted(){
            console.log("this",this)
        }
    }
</script>
<style lang="scss" scoped>

</style>