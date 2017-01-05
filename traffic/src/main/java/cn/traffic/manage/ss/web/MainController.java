package cn.traffic.manage.ss.web;

import java.awt.image.BufferedImage;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.google.code.kaptcha.Producer;
import com.hongguaninfo.hgdf.core.utils.SmsUtil;
import com.hongguaninfo.hgdf.wadp.core.base.BaseController;
import com.hongguaninfo.hgdf.wadp.core.exception.BizException;
import com.hongguaninfo.hgdf.wadp.core.interceptor.RepeatSubmitInterceptor;
import com.hongguaninfo.hgdf.wadp.core.interceptor.RepeatSubmitToken;
import com.hongguaninfo.hgdf.wadp.core.templete.HttpTemplete;
import com.hongguaninfo.hgdf.wadp.core.templete.OperateTemplete;
import com.hongguaninfo.hgdf.wadp.core.utils.SessionUtils;
import com.hongguaninfo.hgdf.wadp.service.sys.SysUserService;

@Controller
@RequestMapping("/")
public class MainController extends BaseController {

	@Autowired
	private SysUserService sysUserService;
    @Autowired
    private Producer captchaProducer;

    
	/**
	 * 返回主页面
	 * @param model
	 * @param session
	 * @return
	 * @throws BizException
	 */
	@RequestMapping(value="/")
	public String main(Model model, HttpSession session) throws BizException{
		session.setAttribute("auths", sysUserService.getUserIndexLeftMenu());
//		Integer merchantId = SessionUtils.getUser().getMerchantBasic().getMerchantId();
//		model.addAttribute("merchantSmsAccount", merchantSmsService.getMerchantSmsAccountByMerchantId(merchantId));
//		model.addAttribute("merchantBasic", merchantService.getMerchantBasicWithChildMerhcatBasicList());
//		model.addAttribute("wifiUserStatisticsModel", statistMerchantService.getWifiUserStatistics(merchantId));
//		String yesterDay = com.hongguaninfo.hgdf.core.utils.DateUtil.getDateTime("yyyy-MM-dd",getBeforeDay(new Date()));
//		model.addAttribute("yesterDay", yesterDay);
		return "index";
	}
	
	public Date getBeforeDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, -1);
		return cal.getTime();
	}
	
	/**
     * @throws Exception 
     * @Title: login
     * @Description: 登录
     * @since 1.0.0
     */
    @RequestMapping(value = "login")
    public String login(HttpServletRequest request,
            HttpServletResponse response, Model model) throws Exception {
        SessionUtils.kickUser();
//        SysConfig sysConf = sysConfigService.getSysConfigByKey(Constants.LOGIN_VERIFCODE);
//        model.addAttribute("sysConfig", sysConf);
        return "login";
    }
    
    /**
     * @Title:
     * @Description: 刷新submitToken
     * @since 1.0.0
     */
    @RequestMapping(value = "refSubmitToken")
    @ResponseBody
    @RepeatSubmitToken(saveToken = true)
    public Map refSubmitToken(final HttpServletRequest request,
            HttpServletResponse response) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                String serverToken = (String) request.getSession(true)
                        .getAttribute(RepeatSubmitInterceptor.TOKEN_TAG);
                map.put("data", serverToken);
            }
        };
        return templete.operate();
    }

    /**
     * 
     * @Title: captchaImage
     * @Description: 验证码图片
     * @since 1.0.0
     */
    @RequestMapping(value = "captchaImage")
    public ModelAndView getKaptchaImage(HttpServletRequest request,
            HttpServletResponse response) {
        HttpSession session = request.getSession();
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control",
                "no-store, no-cache, must-revalidate");
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        response.setHeader("Pragma", "no-cache");
        response.setContentType("image/jpeg");
        String capText = captchaProducer.createText();

        session.setAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY, capText);
        BufferedImage bi = captchaProducer.createImage(capText);
        try {
            ServletOutputStream out = response.getOutputStream();
            ImageIO.write(bi, "jpg", out);
            LOG.debug("*****验证码是: " + capText + "*****");
            try {
                out.flush();
            } finally {
                out.close();
            }
        } catch (Exception e) {
            LOG.error("getKaptchaImage fail !", e);
        }
        return null;
    }
    
    /**
     * 
     * @Title: getRandomNum
     * @Description: 获取随机数字
     * @param @param vo
     * @param @param response
     * @param @param request
     * @since 1.0.0
     */
    @RequestMapping("/getRandomNum")
    @ResponseBody
    public Map getRandomChar(HttpServletResponse response,
            final HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                map.put("data", SmsUtil.getDyVfCode());
            }
        };
        return templete.operate();
    }
}
