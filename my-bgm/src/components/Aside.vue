<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
            <el-menu-item @click="clickMenu(item)" :index="item.name" v-for="item in noChildren" :key="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
                    
            </el-menu-item>

            <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
                    <el-menu-item @click="clickMenu(subItem)" :index="subItem.label">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>

    </div>
</template>

<script>
import Cookie from "js-cookie"
export default {
    data() {
        return {};
    },
    methods: {
        clickMenu(item){
            /*  
                当前路由与跳转的路由不一致时
                当前的如果不等于/home时，或者当前的路由不等于/时
                就跳转的路由
            */
            if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
                this.$router.push(item.path)
            }

            this.$store.commit('selectMenu',item)
            
        }
    },
    computed: {
        // 没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        menuData(){
            // 判断当前数据，如果缓存中没有，那就去store中获取
            Cookie
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu-vertical-demo{
    height: 100vh;
    h3{
        color: #fff;
        text-align: center;
        line-height: 38px;
        font-size: 16px;
        font-weight: 400;
    }
}
.el-menu{
    border-right: none;
 }
</style>
