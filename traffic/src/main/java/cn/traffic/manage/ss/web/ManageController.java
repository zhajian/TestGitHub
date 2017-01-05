package cn.traffic.manage.ss.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.traffic.manage.ss.entity.Pages;

import com.hongguaninfo.hgdf.core.utils.exception.BaseException;
import com.hongguaninfo.hgdf.wadp.core.aop.log.UserLog;
import com.hongguaninfo.hgdf.wadp.core.base.BasePage;
import com.hongguaninfo.hgdf.wadp.core.exception.BizException;
import com.hongguaninfo.hgdf.wadp.core.interceptor.RepeatSubmitToken;
import com.hongguaninfo.hgdf.wadp.core.templete.HttpTemplete;
import com.hongguaninfo.hgdf.wadp.core.templete.OperateTemplete;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysRole;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysUser;
import com.hongguaninfo.hgdf.wadp.service.sys.SysAuthService;
import com.hongguaninfo.hgdf.wadp.service.sys.SysRoleService;
import com.hongguaninfo.hgdf.wadp.service.sys.SysUserService;

@Controller
@RequestMapping("/manage/role")
public class ManageController {
	@Autowired
	private SysUserService sysUserService;
	@Autowired
	private SysAuthService sysAuthService;
	@Autowired
	private SysRoleService sysRoleBiz;

	// 角色管理
	@RequestMapping(value = "/showmanagerole")
	public String showManageRole(HttpServletRequest request,
			HttpServletResponse response, Model model) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				str = "traffic/role/role_manage";
			}
		};
		return templete.operateModel();
	}
	// 权限理
	@RequestMapping(value = "/showmanageauth")
	public String showManageAuth(HttpServletRequest request,
			HttpServletResponse response, Model model) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				str = "traffic/role/auth_manage";
			}
		};
		return templete.operateModel();
	}
	//角色列表
	@RequestMapping(value = "/sysroletables")
	@ResponseBody
	public Map getSysRoleList(final SysRole vo,
			HttpServletRequest request) {
//		System.out.println(vo.getRoleName()+"==="+vo.getRoleCode());
		OperateTemplete templete = new HttpTemplete(request) {
			@SuppressWarnings("unchecked")
			@Override
			protected void doSomething() throws BaseException {
				sysRoleBiz.getSysRoleList(vo, map);
			}
		};
		return templete.operate();
	}
	// 用户管理
	@RequestMapping(value = "/showmanageuser")
	public String showManageUser(HttpServletRequest request,
			HttpServletResponse response, Model model) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				str = "traffic/role/user_manage";
			}
		};
		return templete.operateModel();
	}
	//用户列表
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/dataTables")
	@ResponseBody
	public Map getSysUserList(final SysUser vo,
			HttpServletRequest request) {
		vo.setMerchantId(0);
		OperateTemplete templete = new HttpTemplete(request) {
			@SuppressWarnings("unchecked")
			@Override
			protected void doSomething() throws BaseException {
				vo.setIsFinal(0);
				sysUserService.getSysUserList(vo, map);
			}
		};
		return templete.operate();
	}
	@RequestMapping("/ajaxList")
	@ResponseBody
	public List getRoleList(HttpServletResponse response,
			HttpServletRequest request) throws BizException {
		List list = sysRoleBiz.getSysRoleList();
		return list;
	}
	
	@RequestMapping("/authList")
	@ResponseBody
	public List getAuthList(HttpServletResponse response,
			HttpServletRequest request) throws BizException {
		List list = sysAuthService.getSysAuthFatherNoteList();
		return list;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/addUser")
	@RepeatSubmitToken(removeToken = true)
	@ResponseBody
//	@UserLog(code = "addSysUser", name = "运营平台增加用户", remarkClass = SysUser.class)
	public Map addUser(@Valid final SysUser vo, BindingResult result,
			HttpServletResponse response, final HttpServletRequest request) {
		OperateTemplete templete = new HttpTemplete(request, result) {
			protected void doSomething() throws BizException {
				if (doValidate()) {
					vo.setMerchantId(0);
					sysUserService.insertUser(vo);
				}
			}
		};
		return templete.operate();
	}
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/deleteUser")
	@RepeatSubmitToken(removeToken = true)
	@ResponseBody
//	@UserLog(code = "deleteSysUser", name = "运营平台删除用户用户",remarkClass = Integer.class)
	public Map deleteUser(final Integer deleteUserId,
			HttpServletResponse response, final HttpServletRequest request) {
		 OperateTemplete templete = new HttpTemplete(request) {
	            protected void doSomething() throws BizException {
	                sysUserService.deleteById(deleteUserId);
	            }
		};
		return templete.operate();
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getUserById")
	@ResponseBody
	public Map getUserById(final Integer userId, 
			HttpServletRequest request) {
		OperateTemplete templete = new HttpTemplete(request) {
			@Override
			protected void doSomething() throws BaseException {
				map.put("sysuser", sysUserService.getUser(userId));
			}
		};
		return templete.operate();
	}
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/updateUser")
	@RepeatSubmitToken(removeToken = true)
	@ResponseBody
//	@UserLog(code = "addSysUser", name = "运营平台修改用户", remarkClass = SysUser.class)
	public Map updateUser(@Valid final SysUser vo, BindingResult result,
			HttpServletResponse response, final HttpServletRequest request) {
//		System.out.println("update user="+vo.getUserId());
		OperateTemplete templete = new HttpTemplete(request, result) {
			protected void doSomething() throws BizException {
				if (doValidate()) {
					sysUserService.updateUser(vo);
				}
			}
		};
		return templete.operate();
	}
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/updatePwdUser")
	@RepeatSubmitToken(removeToken = true)
	@ResponseBody
//	@UserLog(code = "addSysUser", name = "运营平台管理员修改密码用户", remarkClass = Integer.class)
	public Map updatePwdUser(final Integer userId, final String plainPassword,
			HttpServletResponse response, final HttpServletRequest request) {
//		System.out.println("update user="+userId+"==="+plainPassword);
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BizException {
				if (doValidate()) {
					sysUserService.updateUserPwd(plainPassword, userId);
				}
			}
		};
		return templete.operate();
	}
}
