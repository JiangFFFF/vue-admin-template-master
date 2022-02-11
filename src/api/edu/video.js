import request from '@/utils/request'

export default{

    //添加小节
    addVideo(video){
        return request({
            url:`/eduservice/video/addVideo`,
            method:'post',
            data:video
        })
    },

    //根据id查询小节
    getVideoById(videoId){
        return request({
            url:`/eduservice/video/getVideoById/${videoId}`,
            method:'get'
        })
    },

    //修改小节
    updateVideo(video){
        return request({
            url:`/eduservice/video/updateVideo`,
            method:'put',
            data:video
        })
    },

    //删除小节
    deleteVideo(videoId){
        return request({
            url:`/eduservice/video/${videoId}`,
            method:'delete'
        })
    },

    //删除阿里云中视频
    deleteAliyunvod(id){
        return request({
            url:`/eduvod/video/removeAlyVideo/${id}`,
            method:'delete'
        })
    }
    
}