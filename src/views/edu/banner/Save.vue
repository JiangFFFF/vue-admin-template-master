<template>
  <div class="app-container">
    <h1 style="color: skyblue">幻灯片添加</h1>
    <el-form label-width="120px">
      <el-form-item label="幻灯片名称">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="幻灯片排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>

      <el-form-item label="幻灯片url">
        <el-input v-model="banner.imageUrl" type="text" />
      </el-form-item>

      <el-form-item label="链接地址link_url">
        <el-input v-model="banner.linkUrl" type="text" />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import banner from '@/api/edu/banner'

export default {
  name: "Save",
  components:{
      
  },
  data() {
    return {
      banner: {
        title:'',
        imageUrl:'',
        sort:'',
        linkUrl:''
      },
      saveBtnDisabled: false, //保存按钮是否禁用

    };
  },
  methods: {

    init() {
      //路径中有id值，做修改
      if (this.$route.params && this.$route.params.id) {
        //从路径中获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        this.getInfo(id);
      } else {
        //路径没有id值，做添加
        //清空表单
        this.banner = {};
      }
    },

    //根据讲师id查询
    getInfo(id) {
      banner.getBannerById(id).then(
        response=>{
          this.banner=response.data.item
        }
      )
    },

    //更新幻灯片信息
    updateBanner() {
      banner.updateBanner(this.banner).then((response) => {
        //提示信息
        this.$message({
          type: "success",
          message: "更新成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({
          path: "/banner/table",
          // name:'幻灯片列表'
        });
      });
    },

    //添加幻灯片的方法
    saveBanner() {
      banner.addBanner(this.banner).then((response) => {
        //添加成功
        //提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //回到列表页面 路由跳转
        this.$router.push({
          // path:'/banner/table'
          name: "幻灯片列表",
        });
      });
    },

    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if (this.banner.id) {
        this.updateBanner();
      } else {
        //添加
        this.saveBanner();
      }
    },
  },
  //页面渲染之前执行,多次跳转只会执行一次
  created() {
    this.init();
  },

  watch: {
    //利用监听器解决路由切换问题
    $route(to, from) {
      //路由变化方式,当路由发生变化，方法就会执行
      this.init();
    },
  },
};
</script>

<style>
</style>