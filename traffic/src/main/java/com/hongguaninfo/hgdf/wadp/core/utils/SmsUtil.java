package com.hongguaninfo.hgdf.wadp.core.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.hongguaninfo.hgdf.core.utils.logging.LogFactory;

public class SmsUtil {

	private static final String URL = "http://121.199.16.178/webservice/sms.php?method=Submit";
	private static final String ACCOUNT = "cf_dulin";
	private static final String PASSWORD = "dulin123";
	private static final String TEMPLATE = "尊敬的用户，您的动态验证码:【变量】，有效期为2分钟，感谢您使用。";

	public static boolean send(String mobile, String message) {
		HttpClient client = new HttpClient();
		PostMethod method = new PostMethod(URL);

		client.getParams().setContentCharset("UTF-8");
		method.setRequestHeader("ContentType",
				"application/x-www-form-urlencoded;charset=UTF-8");

		String content = TEMPLATE.replace("【变量】", message);

		NameValuePair[] data = {// 提交短信
				new NameValuePair("account", ACCOUNT),
						new NameValuePair("password", PASSWORD),
						new NameValuePair("mobile", mobile),
						new NameValuePair("content", content), };
		
		method.setRequestBody(data);

		try {
			client.executeMethod(method);
			String SubmitResult = method.getResponseBodyAsString();
			// System.out.println(SubmitResult);
			Document doc = DocumentHelper.parseText(SubmitResult);
			Element root = doc.getRootElement();

			String code = root.elementText("code");
			String msg = root.elementText("msg");
			String smsid = root.elementText("smsid");

			if (code.equals("2")) {
				LogFactory.getLog(SmsUtil.class).info("发送短信 【"+message+"】 给 【"+mobile+"】 成功! "+"code:"+code+"、smsid:"+smsid);
				return true;
			}else{
				LogFactory.getLog(SmsUtil.class).info("发送短信 【"+message+"】 给 【"+mobile+"】 失败! "+"code:"+code+"、smsid:"+smsid);
				return false;
			}

		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return false;
	}
	public static void main(String[] args) {
		new SmsUtil().send("18221171163", "1234");
		//new SmsUtil().send("18601721520", "1234");
	}

}