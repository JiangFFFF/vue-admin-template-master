import request from '@/utils/request'

export default({
    //添加幻灯片
    addBanner(banner){
        return request({
            url:`/educms/banneradmin/addBanner`,
            method:'post',
            data:banner
        })
    },

    //更新幻灯片
    updateBanner(banner){
        return request({
            url:`/educms/banneradmin/updateBanner`,
            method:'put',
            data:banner
        })
    },

    //删除幻灯片
    removeBannerById(id){
        return request({
            url:`/educms/banneradmin/remove/${id}`,
            method:'delete'
        })
    },

    //根据id查询幻灯片
    getBannerById(id){
        return request({
            url:`/educms/banneradmin/get/${id}`,
            method:'get'
        })
    },

    //条件查询带分页
    getBannerQuery(page,limit,bannerQuery){
        return request({
            url:`/educms/banneradmin/pageBannerQuery/${page}/${limit}`,
            method:'post',
            data:bannerQuery
        })

    }



})