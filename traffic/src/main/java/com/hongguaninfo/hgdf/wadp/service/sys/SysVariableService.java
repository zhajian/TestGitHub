package com.hongguaninfo.hgdf.wadp.service.sys;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongguaninfo.hgdf.wadp.core.base.BasePage;
import com.hongguaninfo.hgdf.wadp.core.exception.BizException;
import com.hongguaninfo.hgdf.wadp.core.utils.SessionUtils;
import com.hongguaninfo.hgdf.wadp.core.utils.generator.DbIdGenerator;
import com.hongguaninfo.hgdf.wadp.dao.sys.SysVariableDao;
import com.hongguaninfo.hgdf.wadp.entity.sys.SysVariable;
import com.hongguaninfo.hgdf.core.utils.page.Page;

/**
 * 系统变量表:SYS_VARIABLE biz 层
 * 
 * @author:
 */

@Service("sysVariableBiz")
public class SysVariableService {

    @Autowired
    private SysVariableDao sysVariableDao;

    @Autowired
    private DbIdGenerator dbIdGenerator;

    @Autowired
    private SysDatadicItemService sysDatadicItemBiz;

    // 查询列表数据
    public List<SysVariable> getSysVariableList(BasePage<SysVariable> basePage,
            SysVariable vo, Map<String, Object> map) throws BizException {
        vo.setIsDelete(0);
        basePage.setFilters(vo);
        Page<SysVariable> page = sysVariableDao.pageQuery(basePage);
        List<SysVariable> list = page.getResult();
        for (SysVariable bo : list) {
            bo.setIsFinalStr(sysDatadicItemBiz.getItemNameByValue("LOGIC_TAG",
                    bo.getIsFinal() + ""));
        }
        map.put("rows", list);
        map.put("total", page.getTotalCount());
        return list;
    }

    // 新增系统变量
    public void insertVariable(SysVariable sysVariable) throws BizException {
        sysVariable.setVarId(new BigDecimal(dbIdGenerator.getNextId()));
        sysVariable.setIsDelete(0);
        sysVariable.setIsFinal(0);
        sysVariable.setCrtTime(new Date());
        sysVariable.setCrtUserid(new BigDecimal(SessionUtils.getUserId()));
        sysVariable.setUpdTime(new Date());
        sysVariable.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
        sysVariableDao.save(sysVariable);
    }

    // 修改系统变量
    public void updateVariable(SysVariable sysVariable) throws BizException {
        sysVariable.setUpdTime(new Date());
        sysVariable.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
        sysVariableDao.update(sysVariable);

    }

    // 通过id删除
    public void deleteById(Integer id) throws BizException {
        SysVariable sysVariable = new SysVariable();
        sysVariable.setUpdTime(new Date());
        sysVariable.setUpdUserid(new BigDecimal(SessionUtils.getUserId()));
        sysVariable.setIsDelete(1);
        sysVariable.setVarId(new BigDecimal(id));
        sysVariableDao.update(sysVariable);

    }

    // 获取单条系统变量数据
    public SysVariable getSysVariableByVarId(int id) throws BizException {
        if (id == 0) {
            return null;
        }
        return sysVariableDao.getById(id);
    }

}