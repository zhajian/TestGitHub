package com.hongguaninfo.hgdf.wadp.core.listener;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStoppedEvent;

/**
 * 
 * @ClassName: DefaultListener
 * @Description: 系统默认listener
 * @author henry
 * @date 2014-2-19 上午11:29:14
 * 
 */
public class DefaultListener implements ApplicationListener<ApplicationEvent>{

    public void onApplicationEvent(ApplicationEvent event) {
    	
    }
}
