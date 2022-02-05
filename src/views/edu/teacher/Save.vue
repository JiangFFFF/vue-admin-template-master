<template>
    <div class="app-container">
        <h1 style="color: skyblue">讲师添加</h1>
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name" />
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number
                        v-model="teacher.sort"
                        controls-position="right"
                        :min="0"/>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" clearable placeholder="选择讲师头衔">
                    <!--数据类型一定要和取出的json中的一致，否则没法回填因此
                    这里value使用动态绑定的值，保证其数据类型是number-->
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career" />
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea" />
            </el-form-item>
            <!-- 讲师头像：TODO -->
            <el-form-item>
                <el-button
                    :disabled="saveBtnDisabled"
                    type="primary"
                    @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import teacherApi from '@/api/edu/teacher.js'
    export default {
        name:'Save',
        data(){
            return{
                teacher:{
                    name:'',
                    intro:'',
                    career:'',
                    level:1,
                    avatar:'',
                    sort:0
                },
                saveBtnDisabled:false //保存按钮是否禁用
            }
        },
        methods:{
            init(){
                //路径中有id值，做修改
                if(this.$route.params && this.$route.params.id){
                    //从路径中获取id值
                    const id=this.$route.params.id
                    //调用根据id查询的方法
                    this.getInfo(id)
                }else{ //路径没有id值，做添加
                    //清空表单
                    this.teacher={}
                }
            },

            //根据讲师id查询
            getInfo(id){
                teacherApi.getTeacherInfo(id).then(
                    response=>{
                        this.teacher=response.data.teacher
                    }
                )
            },

            //更新讲师信息
            updateTeacher(){
                teacherApi.updateTeacher(this.teacher).then(
                    response=>{
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        })
                        //回到列表页面 路由跳转
                        this.$router.push({
                            path:'/teacher/table'
                            // name:'讲师列表'
                        })
                    }
                )   
            },

            //添加讲师的方法
            saveTeacher(){
                teacherApi.addTeacher(this.teacher).then(
                    response=>{ //添加成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        })
                        //回到列表页面 路由跳转
                        this.$router.push({
                            // path:'/teacher/table'
                            name:'讲师列表'
                        })
                    }
                )
            },

            saveOrUpdate(){
                //判断修改还是添加
                //根据teacher是否有id
                if(this.teacher.id){
                    this.updateTeacher()
                }else{
                    //添加
                    this.saveTeacher()
                }
            },
        },
        //页面渲染之前执行,多次跳转只会执行一次
        created(){
            this.init()
        },

        watch:{ //利用监听器解决路由切换问题
            $route(to,from){ //路由变化方式,当路由发生变化，方法就会执行
                this.init()
            }
        }
    }
</script>

<style>

</style>