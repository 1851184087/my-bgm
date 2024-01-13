<template>
    <div class="manage">
        <!-- 新增按钮 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose" width="50%">
            <!-- 用户的表单信息 -->
            <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item prop="name" label="姓名">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年 龄">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="birth" label="出生日期">
                    <el-date-picker value-format="yyyy-MM-DD" type="date" placeholder="选择日期"
                        v-model="form.birth"></el-date-picker>
                </el-form-item>
                <el-form-item prop="addr" label="地址">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                +新增
            </el-button>
            <!-- form搜索区 -->
            <el-form :inline="true" :modle="userForm">
                <el-form-item>
                    <el-input placeholder="请输入姓名查询" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">
            <el-table stripe height="90%" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pager">
                <el-pagination @current-change="handlePage" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api/index'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择年龄' }
                ],
                birth: [
                    { required: true, message: '请选择日期' }
                ],
                addr: [
                    { required: true, message: '请选择日期' }
                ]
            },
            tableData: [],
            modalType: 0, // 0表示新增，1表示编辑
            total: 0, // 当前用户列表的总条数
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                name: ''
            }
        }
    },
    methods: {
        // 确定按钮 提交用户表单
        submit() {
            // validate方法是element中检查表单验证的方法
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            // 重新获取列表的接口
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            // 重新获取列表的接口
                            this.getList()
                        })
                    }
                    // resetFields方法是element中重置表单的方法
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        // 弹窗关闭的时候
        handleClose() {
            // resetFields方法是element中重置表单的方法
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        // 取消按钮
        cancel() {
            this.handleClose()
            this.dialogVisible = false
        },

        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))

        },
        handleDelete(row) {
            this.$confirm('是否删除用户信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    // 重新获取列表的接口
                    this.getList()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        // 获取列表的数据
        getList() {
            getUser({ params: { ...this.pageData, ...this.userForm } }).then(({ data }) => {
                this.tableData = data.list
                this.total = data.count || 0
            })
        },
        // 选择页码的回调
        handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
        // 搜索列表
        onSubmit(){
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.manage {
    height: 90%;

    .common-table {
        position: relative;
        // 动态计算高度
        height: calc(100% - 62px);

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>