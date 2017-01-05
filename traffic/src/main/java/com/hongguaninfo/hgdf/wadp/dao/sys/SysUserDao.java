package com.hongguaninfo.hgdf.wadp.dao.sys;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hongguaninfo.hgdf.wadp.core.base.BaseDao;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysAuth;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysRole;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysUser;
import com.hongguaninfo.hgdf.wadp.mapper.sys.SysUserMapper;

@SuppressWarnings("unchecked")
@Repository("sysUserDao")
public class SysUserDao extends BaseDao<SysUser, SysUserMapper, Integer>
        implements SysUserMapper {

    // 覆盖父类 获取Mapper命名空间
    public String getMapperNamesapce() {
        return SysUserMapper.class.getName().toString();
    }

    public SysUser getUserByLoginName(String userName) {
        return getMapperByType(SysUserMapper.class)
                .getUserByLoginName(userName);
    }

    public List<SysRole> getUserRoles(Integer userId) {
        return getMapperByType(SysUserMapper.class).getUserRoles(userId);
    }

    public List<SysAuth> getUserAuths(Map queryMap) {
        return getMapperByType(SysUserMapper.class).getUserAuths(queryMap);
    }

    public void updateloginInfo(SysUser sysUser) {
        getMapperByType(SysUserMapper.class).updateloginInfo(sysUser);

    }

}
