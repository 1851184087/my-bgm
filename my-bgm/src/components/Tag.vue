<template>
    <div class="tags">
        <el-tag v-for="(item,index) in tags"
         :key="item.path"
         :closable="item.name !== 'home'"
         :effect="$route.name === item.name ? 'dark' : 'plain'"
         @click='changeMenu(item)'
         @close="handleClose(item,index)"
         size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {

        }
    },
    methods:{
        // 点击tag跳转的功能
        changeMenu(item){
            if(this.$route.name !== item.name){
                this.$router.push({name:item.name})
            }
        },
        // 点击tag删除的功能
        handleClose(item,index){
            this.$store.commit('closeTag',item)
            // 删除之后的逻辑
            const length = this.tags.length
            if(item.name !== this.$route.name){
                return
            }
            if(index === length){
                this.$router.push({
                    name:this.tags[index - 1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
.tags{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        // 光标变小手
       cursor: pointer;
    }
}
</style>