<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu" size="small"></el-button>

            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path"
                    :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
            if (command === 'cancel') {
                // 清除cookie中的token信息
                Cookie.remove('token')
                // 清楚cookie中的menu信息
                Cookie.remove('menu')
                // 跳转到登录页
                this.$router.push('/login')
            }
        }
    },

    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    mounted(){
        console.log(this.$route);
    }

}
</script>

<style lang="less" scoped>
.header-container {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .text {
        color: #fff;
        margin-left: 10px;
        font-size: 14px;
    }

    .l-content {
        display: flex;
        align-items: center;

        /* /deep/ 样式穿透 */
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                /* &并且 */
                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }

        }
    }
}

.el-dropdown-link {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}</style>