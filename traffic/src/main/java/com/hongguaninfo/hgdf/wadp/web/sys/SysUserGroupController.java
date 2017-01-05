package com.hongguaninfo.hgdf.wadp.web.sys;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hongguaninfo.hgdf.wadp.core.aop.log.UserLog;
import com.hongguaninfo.hgdf.wadp.core.base.BasePage;
import com.hongguaninfo.hgdf.wadp.core.exception.BizException;
import com.hongguaninfo.hgdf.wadp.core.interceptor.RepeatSubmitToken;
import com.hongguaninfo.hgdf.wadp.core.templete.HttpTemplete;
import com.hongguaninfo.hgdf.wadp.core.templete.OperateTemplete;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysUserGroup;
import com.hongguaninfo.hgdf.wadp.service.sys.SysRoleUgroupJoinService;
import com.hongguaninfo.hgdf.wadp.service.sys.SysUgroupAuthJoinService;
import com.hongguaninfo.hgdf.wadp.service.sys.SysUserGroupService;
import com.hongguaninfo.hgdf.wadp.shiro.conf.Auths;
import com.hongguaninfo.hgdf.core.utils.exception.BaseException;

@Controller
@RequestMapping("/sys/userGroup")
public class SysUserGroupController {

    @Autowired
    private SysUserGroupService sysUserGroupService;

    @Autowired
    private SysRoleUgroupJoinService sysRoleUgroupJoinService;

    @Autowired
    private SysUgroupAuthJoinService sysUgroupAuthJoinService;

    @RequestMapping(value = "/showSysUserGroup")
    @RequiresPermissions(Auths.SYS_USERGROUP)
    public String showSysUserGroup(HttpServletRequest request,
            HttpServletResponse response, Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
                str = "sys/sysUserGroup_show";
            }
        };
        return templete.operateModel();
    }

    @RequestMapping(value = "/sysUserGroupDetail/{groupId}/{fid}")
    @RequiresPermissions(Auths.SYS_USERGROUP_VIEW)
    public String sysUserGroupDetail(@PathVariable int groupId,
            @PathVariable int fid, HttpServletRequest request,
            HttpServletResponse response, Model model) throws BizException {
        model.addAttribute("fid", fid);
        SysUserGroup bo = sysUserGroupService.getUserGroupById(groupId);
        if (groupId == 0 && fid != 0) {
            bo.setfName(sysUserGroupService.getUserGroupById(fid)
                    .getGroupName());
        }
        model.addAttribute("userGroup", bo);
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
                str = "sys/sysUserGroup_detail";
            }
        };
        return templete.operateModel();
    }

    @RequestMapping("/list")
    @RequiresPermissions(Auths.SYS_USERGROUP)
    @ResponseBody
    public Map getSysUserGroupList(final SysUserGroup vo,
            final BasePage basePage, HttpServletResponse response,
            HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                sysUserGroupService.getSysUserGroupList(basePage, vo, map);
            }
        };
        return templete.operate();
    }

    @RequestMapping("/add")
    @RequiresPermissions(Auths.SYS_USERGROUP_ADD)
    @ResponseBody
    @RepeatSubmitToken(removeToken = true)
    @UserLog(code = "addSysUserGroup", name = "增加用户组", remarkClass = SysUserGroup.class)
    public Map addSysUserGroup(@Valid final SysUserGroup vo,
            BindingResult result, HttpServletResponse response,
            final HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request, result) {
            protected void doSomething() throws BizException {
                if (doValidate()) {
                    sysUserGroupService.insertUserGroup(vo);
                }
            }
        };
        return templete.operate();
    }

    @RequestMapping("/edit")
    @RequiresPermissions(Auths.SYS_USERGROUP_EDIT)
    @ResponseBody
    @UserLog(code = "editSysUserGroup", name = "修改用户组", remarkClass = SysUserGroup.class)
    public Map editSysUserGroup(final SysUserGroup vo,
            HttpServletResponse response, final HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                if (doValidate()) {
                    sysUserGroupService.updateUserGroup(vo);
                }

            }
        };
        return templete.operate();
    }

    @RequestMapping("/delete")
    @RequiresPermissions(Auths.SYS_USERGROUP_DELETE)
    @ResponseBody
    @UserLog(code = "deleteSysUserGroup", name = "删除用户组", remarkClass = Integer.class)
    public Map deleteSysUserGroup(final Integer id,
            HttpServletResponse response, final HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                sysUserGroupService.deleteById(id);
            }
        };
        return templete.operate();
    }

    @RequestMapping("/authList")
    @ResponseBody
    public Map getSysAuthList(final int groupId, final BasePage basePage,
            HttpServletResponse response, HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                map.put("list",
                        sysUgroupAuthJoinService.getListByGroupId(groupId));
            }
        };
        return templete.operate();
    }

    @RequestMapping("/roleList")
    @ResponseBody
    public Map getSysRoleList(final int groupId, final BasePage basePage,
            HttpServletResponse response, HttpServletRequest request) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BizException {
                map.put("list",
                        sysRoleUgroupJoinService.getListByGroupId(groupId));
            }
        };
        return templete.operate();
    }

}
