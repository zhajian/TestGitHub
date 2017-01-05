package com.hongguaninfo.hgdf.wadp.shiro;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongguaninfo.hgdf.wadp.entity.sys.SysUserLog;
import com.hongguaninfo.hgdf.wadp.service.sys.SysUserLogService;
import com.hongguaninfo.hgdf.core.utils.logging.Log;
import com.hongguaninfo.hgdf.core.utils.logging.LogFactory;

@Service("formAuthenticationFilter")
public class FormAuthenticationCaptchaFilter extends FormAuthenticationFilter {

    public Log log = LogFactory.getLog(getClass());

    public static final String DEFAULT_CAPTCHA_PARAM = "captcha";

    @Autowired
    private SysUserLogService sysUserLogService;

    protected String getCaptcha(ServletRequest request) {
        return WebUtils.getCleanParam(request, DEFAULT_CAPTCHA_PARAM);
    }

    protected AuthenticationToken createToken(ServletRequest request,
            ServletResponse response) {
        String username = getUsername(request);
        String password = getPassword(request);
        String captcha = getCaptcha(request);
        boolean rememberMe = isRememberMe(request);
        String host = getHost(request);

        return new UsernamePasswordCaptchaToken(username,
                password.toCharArray(), rememberMe, host, captcha);
    }

    /*
     * 主要是针对登入成功的处理方法。对于请求头是AJAX的之间返回JSON字符串。
     */
    @Override
    public boolean onLoginSuccess(AuthenticationToken token, Subject subject,
            ServletRequest request, ServletResponse response) throws Exception {
//        saveUserLog(request, "onLoginSuccess", "登录系统成功", "");
        if (!isAjax(request)) {// 不是ajax请求
            issueSuccessRedirect(request, response);
        } else {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/plain;charset=utf-8");
            PrintWriter out = response.getWriter();
            out.println("{\"success\":true,\"message\":\"登入成功\"}");
            out.flush();
            out.close();
        }
        return false;
    }

    /**
     * 主要是处理登入失败的方法
     */
    @Override
    protected boolean onLoginFailure(AuthenticationToken token,
            AuthenticationException e, ServletRequest request,
            ServletResponse response) {
//        saveUserLog(request, "onLoginFailure", "登录系统失败", token.getPrincipal().toString());
        log.error("abc", e);
        if (!isAjax(request)) {// 不是ajax请求
            setFailureAttribute(request, e);
            return true;
        }
        try {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/plain;charset=utf-8");
            PrintWriter out = response.getWriter();
            String message = e.getClass().getSimpleName();
            if ("IncorrectCredentialsException".equals(message)) {
                out.println("{\"success\":false,\"message\":\"密码错误\"}");
            } else if ("UnknownAccountException".equals(message)) {
                out.println("{\"success\":false,\"message\":\"账号不存在\"}");
            } else if ("LockedAccountException".equals(message)) {
                out.println("{\"success\":false,\"message\":\"账号被锁定\"}");
            } else {
                out.println("{\"success\":false,message:\"未知错误\"}");
            }
            out.flush();
            out.close();
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        return false;
    }

    /**
     * 所有请求都会经过的方法。
     */
    @Override
    protected boolean onAccessDenied(ServletRequest request,
            ServletResponse response) throws Exception {
        log.info("权限验证");
        if (log.isTraceEnabled()) {
            log.trace("Attempting to access a path which requires authentication.  Forwarding to the "
                    + "Authentication url [" + getLoginUrl() + "]");
        }
        if (!isAjax(request)) {// 不是ajax请求
            if (isLoginRequest(request, response)) {
                if (isLoginSubmission(request, response)) {
                    if (log.isTraceEnabled()) {
                        log.trace("Login submission detected.  Attempting to execute login.");
                    }
                    return executeLogin(request, response);
                } else {
                    if (log.isTraceEnabled()) {
                        log.trace("Login page view.");
                    }
                    // allow them to see the login page ;)
                    return true;
                }
            } else {
                saveRequestAndRedirectToLogin(request, response);
            }
        } else {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/plain;charset=utf-8");
            HttpServletResponse rep = (HttpServletResponse) response;
            rep.setHeader("sessionstatus", "timeout");// 在响应头设置session状态
            rep.getWriter()
                    .write("{\"success\":false,\"message\":\"timeout\"}");
        }
        return false;
    }

    private boolean isAjax(ServletRequest request) {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        return "XMLHttpRequest".equalsIgnoreCase(httpServletRequest
                .getHeader("X-Requested-With"));
    }

    private void saveUserLog(ServletRequest request, String code, String name,
            String remark) {
        SysUserLog sysUserLog = new SysUserLog();
        sysUserLog.setRemark(remark);
        sysUserLog.setOperIP(((HttpServletRequest) request).getRemoteAddr());
        sysUserLog.setCrtTime(new Date());
        sysUserLog.setOperCode(code);
        sysUserLog.setOperName(name);
        sysUserLogService.saveSysUserLog(sysUserLog);
    }
}