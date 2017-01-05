package cn.traffic.manage.ss.config;

import java.util.Properties;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import com.hongguaninfo.hgdf.core.utils.props.config.CustomPropertyPlaceholderConfigurer;

@Component
public class PageVariableConfig implements InitializingBean,
		ServletContextAware {
	private static final String DEFAULT_JSPVARPREFIX = "jspvar.";
	private String jspvarPrefix = DEFAULT_JSPVARPREFIX;
	@Autowired
	private CustomPropertyPlaceholderConfigurer propertyConfigurer;

	private ServletContext servletContext;
	private Properties props;

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		props = propertyConfigurer.getProps();
		if (null != servletContext && null != props) {
			for(Object objKey : props.keySet()){
				String key = String.valueOf(objKey);
				if(key.startsWith(jspvarPrefix)){
					String value = props.getProperty(key);
					servletContext.setAttribute(key.substring(jspvarPrefix.length()), value);
				}
				
			}
		}
	}

}
