package com.hongguaninfo.hgdf.wadp.core.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import com.hongguaninfo.hgdf.wadp.core.Constants;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysUser;

public class SessionUtils {
    private static final String USER_KEY = "SESSION_USER";
    private static final String USER_IP = "10.100.0.1";
    private static final String USER_MAC = "";
    private static final String VIP_LEVEL = "1";
    
    
	/**
	 * 获取session用户登录信息
	 * @param request
	 * @return
	 */
	public final static String getUserIp(HttpServletRequest request) {
		Object logined = request.getSession().getAttribute(USER_IP);
		if(logined != null) {
			return (String) logined;
		} else {
			return null;
		}
	}
	
	/**
	 * 设置session用户登录信息
	 * @param request
	 * @return
	 */
	public final static void setUserIp(HttpServletRequest request,String s) {
		request.getSession().setAttribute(USER_IP,s);
	}

	
	public final static String getUserMac(HttpServletRequest request) {
		Object userMac = request.getSession().getAttribute(USER_MAC);
		if(userMac != null) {
			return (String) userMac;
		} else {
			return null;
		}
	}
	
	public final static void setUserMac(HttpServletRequest request,String s1) {
		request.getSession().setAttribute(USER_MAC,s1);
	}
	
	
	public final static String getVipLevel(HttpServletRequest request) {
		Object vipLevel = request.getSession().getAttribute(VIP_LEVEL);
		if(vipLevel != null) {
			return (String) vipLevel;
		} else {
			return null;
		}
	}
	
	public final static void setVipLevel(HttpServletRequest request,String s2) {
		request.getSession().setAttribute(VIP_LEVEL,s2);
	}
	
    /**
     * 获取session用户信息
     * 
     * @param request
     * @return
     */
    public final static SysUser getUser(HttpServletRequest request) {
/*        Object user = request.getSession().getAttribute(USER_KEY);
        if (user != null) {
            return (SysUser) user;
        } else {
            return null;
        }*/
        return getUser();
    }

    /**
     * 设置session用户信息
     * 
     * @param request
     * @param user
     */
    public final static void setUser(HttpServletRequest request, SysUser user) {
        request.getSession().setAttribute(USER_KEY, user);
    }

    /**
     * 获取shiro用户信息
     * 
     * @param request
     * @param user
     */
    public final static SysUser getUser() {
        Subject subject = SecurityUtils.getSubject();
        if (null != subject) {
            return (SysUser) subject.getPrincipal();
        }
        return null;
    }

    /**
     * 获取用户编号
     * 
     * @param request
     * @param user
     */
    public final static Integer getUserId() {
        SysUser sysUser = getUser();
        return (sysUser == null) ? Constants.ANONYMOUS_ID : sysUser.getUserId();
    }
    

    /**
     * 获取退出登录
     * 
     * @param request
     * @param user
     */
    public final static void kickUser(){
        Subject subject = SecurityUtils.getSubject();
        if (subject != null && subject.isAuthenticated()) {
            subject.logout();
        }
    }
}