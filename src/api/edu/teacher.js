import request from '@/utils/request'

export default{
    //1、讲师列表（条件查询分页）
    //current 当前页，limit每页记录数，teacherQuery条件对象
    getTeacherList(current,limit,teacherQuery){
        return request({
            // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`, //使用模板字符串防止出错
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示将对象转换为json进行传递到接口里面
            data:teacherQuery
          })
    },

    //删除讲师
    deleteTeacherById(id){
        return request({
            url:`/eduservice/teacher/${id}`,
            method:'delete',
        })
    },

    //添加讲师
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method:'post',
            data:teacher,
            // param:
        })
    },

    //根据id查询数据
    getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/getTeacher/${id}`,
            method:'get'
        })
    },

    //讲师更新功能
    updateTeacher(teacher){
        return request({
            url:`/eduservice/teacher/updateTeacher`,
            method:'post',
            data:teacher

        })
    }
    
}
