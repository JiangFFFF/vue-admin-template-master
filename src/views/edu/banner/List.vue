<template>
  <div class="app-container">
    <h1 style="color: skyblue">幻灯片列表</h1>

        <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bannerQuery.title" placeholder="幻灯片名称" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <!--表格-->
    <el-table :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column prop="date" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="幻灯片名称" width="80" />


      <el-table-column prop="imageUrl" label="图片地址" />

      <el-table-column prop="linkUrl" label="链接地址" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next,total,jumper"
      :total="total"
      :page-size="limit"
      :current-page="page" 
      style="padding: 30px 0; text-align: center"
      @current-change="getList"
    >
    </el-pagination>
  </div>
</template>

<script>
import banner from "@/api/edu/banner.js";
export default {
  name: "List",
  data() {
    //定义变量和初始值
    return {
      page: 1, //当前页
      limit: 10, //每页显示记录数
      total: 0, //总记录数
      bannerQuery: {}, //条件封装对象
      list: null, //查询之后接口返回集合
    };
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    //讲师列表方法
    getList(page=1) {
        this.page=page
      banner.getBannerQuery(this.page, this.limit, this.bannerQuery).then(
        (response) => {
          //response为接口返回的数据
          this.list = response.data.rows;
          this.total = response.data.total;
          //   console.log(this.list);
          //   console.log(this.total);
        },
        (error) => {
          //error为错误信息
          console.log(error);
        }
      );
    },

    resetData(){ //清空的方法
        //表单输入项清空
        this.bannerQuery={}

        //查询所有幻灯片数据
        this.getList()

    },

    //删除幻灯片的方法
    removeDataById(id){
        this.$confirm('此操作将永久删除该讲师记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //点击确定，执行then方法
            banner.removeBannerById(id).then(
                response=>{
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    //回到列表页面
                    this.getList()
                }
            )
          
        }).catch(() => { //点击取消，执行catch方法
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
        // console.log(id)
    }

  },
  created() {
    //在页面渲染之前执行
    this.getList();
  },
};
</script>

<style>
</style>