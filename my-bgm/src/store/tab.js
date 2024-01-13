import Cookie from "js-cookie"
export default {
    state:{
        isCollapse:false, //控制左侧菜单展开/收起
        tabsList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ], // 面包屑数据
        menu:[]
    },
    mutations:{
        // 修改菜单展开/收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state,val){
            // 判断添加的数据是否为首页
            if(val.name !== 'home'){
                // findIndex方法，如果存在就返回当前数据，如果不存在就返回-1
                // 一个判断方法，判断state里面的tabsList的name和添加的name是否一致
                const index = state.tabsList.findIndex(item => item.name === val.name)
                // 如果不存在
                if(index === -1){
                    state.tabsList.push(val)
                }
            }
        },

        // 删除指定的tag数据
        closeTag(state,item){
            const index = state.tabsList.findIndex(val => val.name === item.name)
            // 调用splice方法，第一个参数是从哪里开始删除，第二个参数是删除的个数
            state.tabsList.splice(index,1)
        },

        // 设置menu的数据
        setMenu(state,menu){
            state.menu = menu
            Cookie.set('menu',JSON.stringify(menu))
        },

        // 动态注册路由
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu')) return
            // 如果有数据
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                // 判断有没有子菜单
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}