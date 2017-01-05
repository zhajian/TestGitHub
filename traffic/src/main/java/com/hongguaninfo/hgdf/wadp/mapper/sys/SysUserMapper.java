package com.hongguaninfo.hgdf.wadp.mapper.sys;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.hongguaninfo.hgdf.wadp.core.base.BaseSqlMapper;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysAuth;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysRole;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysUser;

public interface SysUserMapper extends BaseSqlMapper {
 
//    @Select("select USER_ID_ userId, LOGIN_NAME_ loginName,SEX_ sex,LOGIN_PWD_ loginPwd, USER_NAME_ userName, EMAIL_ email, MOBILE_ mobile,IS_DELETE_ isDelete, IS_VALID_ isValid, IS_LOCK_ isLock,IS_FINAL_ isFinal from SYS_USER au where LOGIN_NAME_ = #{loginName} AND MERCHANT_ID=0")
	@Select("select USER_ID_ userId, LOGIN_NAME_ loginName,SEX_ sex,LOGIN_PWD_ loginPwd, USER_NAME_ userName, EMAIL_ email, MOBILE_ mobile,IS_DELETE_ isDelete, IS_VALID_ isValid, IS_LOCK_ isLock,IS_FINAL_ isFinal from SYS_USER au where LOGIN_NAME_ = #{loginName}")
	SysUser getUserByLoginName(String userName);

    List<SysRole> getUserRoles(Integer userId);

    List<SysAuth> getUserAuths(Map queryMap);

    void updateloginInfo(SysUser sysUser);

}