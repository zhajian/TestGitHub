package com.hongguaninfo.hgdf.wadp.service.sys;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.hongguaninfo.hgdf.core.utils.page.Page;
import com.hongguaninfo.hgdf.wadp.core.base.BasePage;
import com.hongguaninfo.hgdf.wadp.core.base.BaseService;
import com.hongguaninfo.hgdf.wadp.core.beans.CheckFieldResult;
import com.hongguaninfo.hgdf.wadp.core.exception.BizException;
import com.hongguaninfo.hgdf.wadp.core.utils.SessionUtils;
import com.hongguaninfo.hgdf.wadp.core.utils.generator.DbIdGenerator;
import com.hongguaninfo.hgdf.wadp.dao.sys.SysRoleDao;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysRole;

/**
 * 系统角色:SYS_ROLE biz 层
 * 
 * @author:yuyanlin
 */

@Service("sysRoleBiz")
public class SysRoleService extends BaseService {

	@Autowired
	private SysRoleDao sysRoleDao;

	@Autowired
	private DbIdGenerator dbIdGenerator;

	@Autowired
	private SysDatadicItemService sysDatadicItemBiz;

	@Autowired
	private SysRoleAuthJoinService sysRoleAuthJoinService;

	// 查询列表
	public List<SysRole> getSysRoleList(SysRole vo,
			Map<String, Object> map) throws BizException {
		vo.setIsDelete(0);
		
		List<SysRole> list = sysRoleDao.getList(vo);
		for (SysRole bo : list) {
			// bo.setIsFinalStr(sysDatadicItemBiz.getItemNameByValue("LOGIC_TAG",
			// bo.getIsFinal() + ""));
			if (bo.getIsFinal() == 0) {
				bo.setIsFinalStr("否");
			} else {
				bo.setIsFinalStr("是");
			}
		}
		map.put("rows", list);
		map.put("total", sysRoleDao.getListCount(vo));
		return list;
	}

	// 查询列表
	public List getSysRoleList() throws BizException {
		SysRole sysRole = new SysRole();
		sysRole.setIsDelete(0);
		sysRole.setIsFinal(0);
		sysRole.setMerchantId(0);
		List<SysRole> list = sysRoleDao.getListAjax(sysRole);
		return list;
	}

	// 新增
	public void insertRole(SysRole sysRole) throws BizException {
		// 校验------------------------------------------------------------------
		// 校验code-------------------------------------
		SysRole checkVo = new SysRole();
		sysRole.setRoleId(new BigDecimal(dbIdGenerator.getNextId()));
		String roleCode = "_" + sysRole.getRoleId() + "_";
		// checkVo.setRoleCode(sysRole.getRoleCode());
		checkVo.setRoleCode(roleCode);
		checkVo.setIsDelete(0);
		checkVo.setPage(1);
		checkVo.setRows(20);
		List<SysRole> checkResultList = sysRoleDao.getList(checkVo);
		if (checkResultList != null && checkResultList.size() > 0) {
			throw new BizException(JSON.toJSONString(new CheckFieldResult(
					"roleCode", "角色code已经存在")));
		}
		sysRole.setRoleCode(roleCode);
		// 校验通过------------------------------------------------------------------
		// sysRole.setRoleId(new BigDecimal(dbIdGenerator.getNextId()));
		sysRole.setIsFinal(0);
		sysRole.setIsDelete(0);
		sysRole.setCrtTime(new Date());
		sysRole.setCrtUserid(new BigDecimal(SessionUtils.getUserId()));
		sysRole.setUpdTime(new Date());
		sysRole.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
		// sysRole.setMerchantId(0);
		sysRoleDao.save(sysRole);

		// 保存权限关联
		sysRoleAuthJoinService.insertBatchSysRoleAuthJoin(
				sysRole.getCheckedAuthIds(), sysRole.getRoleId().intValue());
	}

	// 修改
	public void updateRole(SysRole sysRole) throws BizException {
		sysRole.setUpdTime(new Date());
		sysRole.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
		sysRoleDao.update(sysRole);

		// 重新保存权限关联
		if (!StringUtils.equals(sysRole.getAuthIds(),
				sysRole.getCheckedAuthIds())) {
			LOG.debug("--------------------------------------->重新保存权限关联<------------------------------------");
			sysRoleAuthJoinService.deleteByRoleId(sysRole.getRoleId()
					.intValue());
			sysRoleAuthJoinService
					.insertBatchSysRoleAuthJoin(sysRole.getCheckedAuthIds(),
							sysRole.getRoleId().intValue());
		}
	}

	// 通过id逻辑删除
	public void deleteById(int id) throws BizException {
		SysRole delVo = sysRoleDao.getById(id);
		delVo.setUpdTime(new Date());
		delVo.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
		delVo.setIsDelete(1);
		delVo.setRoleCode(delVo.getRoleCode() + "_" + id);
		sysRoleDao.update(delVo);
	}

	// 通过id获取单条信息
	public SysRole getSysRoleById(int id) throws BizException {
		if (id == 0) {
			return null;
		}
		SysRole bo = sysRoleDao.getById(id);
		bo.setAuthIds(sysRoleAuthJoinService.getAuthIdsByRoleId(id));
		return bo;
	}

}