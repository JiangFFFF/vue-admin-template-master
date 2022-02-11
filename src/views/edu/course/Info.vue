<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
          <!--一级分类-->
        <el-select v-model="courseInfo.subjectParentId" 
            placeholder="一级分类" 
            @change="subjectLevelOneChanged">
            <el-option
                v-for="(subject,index) in subjectOneList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"
            ></el-option>
        </el-select>
        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
            <el-option
               v-for="subject in subjectTwoList"
               :key="subject.id"
               :label="subject.title"
               :value="subject.id"
            ></el-option>
</el-select>

    </el-form-item>

      <!-- 课程讲师 TODO -->
      <!--课程讲师-->
    <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
            <el-option
                v-for="(teacher,index) in teacherLists"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"
            ></el-option>
        </el-select>
    </el-form-item>


      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <!-- 课程简介-->
    <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>


      <!-- 课程封面 TODO -->
    <el-form-item label="课程封面">
        <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API + '/eduoss/fileoss'"
                class="avatar-uploader">
            <img width="200" height="300" :src="courseInfo.cover" />
        </el-upload>
    </el-form-item>


      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"/>
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import course from '@/api/edu/course.js'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入组件
export default {
    name:'Info',
    components:{
        Tinymce//声明组件
    },
  data() {
    return {
      saveBtnDisabled:false,
      courseInfo:{
            title: '',
            subjectId: '', //二级分类id
            subjectParentId:'', //一级分类id
            teacherId: '',
            lessonNum: 0,
            description: '',
            cover: '/static/01.jpg',
            price: 0,
            courseId:''
      },
      teacherLists:[], //封装所有讲师数据
      subjectOneList:[], //一级分类
      subjectTwoList:[],//二级分类

      BASE_API: process.env.BASE_API, // 接口API地址

    };
  },
  methods: {
      //添加课程
        addCource(){
            course.addCourseInfo(this.courseInfo).then(
                response=>{
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'添加课程信息成功！'
                    })

                    //跳转到第二步
                    this.$router.push({
                        path:'/course/chapter/'+response.data.courseId
                    })
                }
            )   
        },

        //修改课程
        updateCourse(){
            course.updateCourseInfoById(this.courseInfo).then(
                response=>{
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'更新课程信息成功！'
                    })

                    //跳转到第二步
                    this.$router.push({
                        path:'/course/chapter/'+this.courseId
                    })
                }
            )
        },
    
    saveOrUpdate(){
        //判断添加还是修改
        if(!this.courseInfo.id){
            this.addCource()
        }else{
            this.updateCourse()
        }
        
        
    },
    //查询所有讲师
    getListTeacher(){
        course.getListTeacher().then(
            response=>{
                this.teacherLists=response.data.items
            }
        )
    },
    //查询所有一级分类
    getOneSubject(){
        subject.getSubjectList().then(
            response=>{
                this.subjectOneList=response.data.list
            }
        )
    },
    //点击某个一级分类会触发二级分类
    subjectLevelOneChanged(value){
        //清空二级分类id
        this.courseInfo.subjectId=''
        //value就是一级分类id值
        // console.log(value) //得到相应一级分类id
        //遍历所有分类（包含一级和二级）
        for(var i=0;i<this.subjectOneList.length;i++){
            //得到每个一级分类
            var oneSubject=this.subjectOneList[i]
            //判断：所有一级分类id和点击的一级分类ID是否一致
            if(value===oneSubject.id){
                //从一级分类中获取二级分类
               this.subjectTwoList=oneSubject.children
            }
        }
    },
    //上传封面成功则调用
    handleAvatarSuccess(res,file){
        this.courseInfo.cover=res.data.url
    },
    //上传之前调用的方法
    beforeAvatarUpload(file){
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
    },

    //根据课程id查询信息
    getInfo(){
        course.getCourseInfoById(this.courseId).then(
            response=>{
                //在courseInfo中包含课程基本信息，包含一级分类ID和二级分类Id
                this.courseInfo=response.data.courseInfoVo
                //1、查询出所有分类
                subject.getSubjectList().then(
                    response=>{
                        //2、获取所有的一级分类
                        this.subjectOneList=response.data.list

                        //3、把所有的一级分类数组进行遍历，
                        for(var i=0;i<this.subjectOneList.length;i++){
                            //获取每个一级分类
                            var oneSubject=this.subjectOneList[i]
                            //比较当前courseInfo里面一级分类id和所有一级分类id
                            if(this.courseInfo.subjectParentId==oneSubject.id){
                                //获取一级分类的所有二级分类
                                this.subjectTwoList=oneSubject.children
                            }
                        }
                    }
                )
                //初始化所有讲师,记得调用，否则无法出现
                this.getListTeacher()

            }
        )
    },
    init(){
        //路径中有id值，做修改
      if (this.$route.params && this.$route.params.id) {
        //调用根据id查询的方法
        this.getInfo();
      } else {
        //路径没有id值，做添加
        //清空表单
        this.courseInfo = {};
      }
    }
  },
  created(){
      //获取路由id值
      if(this.$route.params && this.$route.params.id){
          this.courseId=this.$route.params.id
          //调用根据id查询的方法
          this.getInfo()
      }else{
            //初始化所有讲师,记得调用，否则无法出现
            this.getListTeacher(),
            //初始化一级分类
            this.getOneSubject()
      }  
  },
  watch:{
      //利用监听器解决路由切换问题
        $route(to, from) {
      //路由变化方式,当路由发生变化，方法就会执行
            this.init();
        },
  }
};
</script>

<style scoped>
  .tinymce-container {
  line-height: 29px;
  }
</style>

