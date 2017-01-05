package com.hongguaninfo.hgdf.wadp.core.interceptor;

import java.lang.reflect.Method;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hongguaninfo.hgdf.core.utils.logging.Log;
import com.hongguaninfo.hgdf.core.utils.logging.LogFactory;

/**
 * <p>
 * 防止重复提交拦截器
 * </p>
 */
public class RepeatSubmitInterceptor extends HandlerInterceptorAdapter {
    private final Log log = LogFactory.getLog(getClass());

    public static final String TOKEN_TAG = "submitToken";

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();
            RepeatSubmitToken annotation = method
                    .getAnnotation(RepeatSubmitToken.class);
            if (annotation != null) {
                boolean needSaveSession = annotation.saveToken();
                if (needSaveSession) {
                    request.getSession(false).setAttribute(TOKEN_TAG,
                            UUID.randomUUID().toString());
                }
                boolean needRemoveSession = annotation.removeToken();
                if (needRemoveSession) {
                    if (isRepeatSubmit(request)) {
                        return false;
                    }
                    request.getSession(false).removeAttribute(TOKEN_TAG);
                }
            }
            return true;
        } else {
            return super.preHandle(request, response, handler);
        }
    }

    private boolean isRepeatSubmit(HttpServletRequest request) {
        String serverToken = (String) request.getSession(false).getAttribute(
                TOKEN_TAG);
        if (serverToken == null) {
            return true;
        }
        String clinetToken = request.getParameter(TOKEN_TAG);
        if (clinetToken == null) {
            return true;
        }
        if (!serverToken.equals(clinetToken)) {
            return true;
        }
        return false;
    }

}