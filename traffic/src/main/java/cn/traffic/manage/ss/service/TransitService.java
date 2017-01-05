package cn.traffic.manage.ss.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import oracle.net.aso.p;

import org.mockito.asm.tree.IntInsnNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.hongguaninfo.hgdf.core.utils.DateUtil;
import com.hongguaninfo.hgdf.core.utils.exception.BaseException;

import cn.traffic.manage.ss.dao.TransitDao;
import cn.traffic.manage.ss.entity.Bdxl;
import cn.traffic.manage.ss.entity.BsPF;
import cn.traffic.manage.ss.entity.DayBsPF;
import cn.traffic.manage.ss.entity.DayPF;
import cn.traffic.manage.ss.entity.LineBs;
import cn.traffic.manage.ss.entity.LinePF;
import cn.traffic.manage.ss.entity.Min15PF;
import cn.traffic.manage.ss.entity.Pages;
import cn.traffic.manage.ss.entity.RoadCross;
import cn.traffic.manage.ss.entity.RoadSpeed;

@Service("transitService")
public class TransitService {
	
	@Autowired
	private TransitDao transitDao;
	
	public void getLinePFData(Pages page,String targetTime,Map<String, Object> map) throws BaseException {
		page.setTargetTime(targetTime.replaceAll("-", ""));
		int c = transitDao.getCountLinePF(page);
		List<LinePF> list = transitDao.getLinePF(page);
		Integer rs = page.getBegin();
		for(LinePF vo : list) {
			vo.setRows(++rs);
		}
		map.put("rows", list);
		map.put("iTotalRecords", c);
		map.put("iTotalDisplayRecords", c);
	}
	
	public void getLinePFData2(Pages page,String targetTime,Map<String, Object> map) throws BaseException {
		page.setTargetTime(targetTime.replaceAll("-", ""));
		int c = transitDao.getCountLinePF2(page);
		List<LinePF> list = transitDao.getLinePF2(page);
		Integer rs = page.getBegin();
		for(LinePF vo : list) {
			vo.setRows(++rs);
		}
		map.put("rows", list);
		map.put("iTotalRecords", c);
		map.put("iTotalDisplayRecords", c);
	}
	
	public void getHistoryPF(DayPF vo,Map<String, Object> map) throws BaseException {
		if(vo.getStartTime().equals("")) {
			getHistoryPFByInit(map);
		} else {
			List xList = new ArrayList();
			Date[] strArray = getDateArrays(DateUtil.convertStringToDate(vo.getStartTime()), DateUtil.convertStringToDate(vo.getEndTime()), Calendar.DAY_OF_YEAR);  
	        for (Date string : strArray) { 
//	        	System.out.println("日期:" + DateUtil.convertDateToString(string).replaceAll("-", "").substring(6, 8));
	            xList.add(DateUtil.convertDateToString(string).replaceAll("-", "").substring(6, 8));
	        } 
			vo.setStartTime(vo.getStartTime().replaceAll("-", ""));
			vo.setEndTime(vo.getEndTime().replaceAll("-", ""));
			List yList = transitDao.getHistoryPF(vo);
//			for(int i=0;i<yList.size();i++) {
//				System.out.println("数值:" + yList.get(i));
//			}
			map.put("xList", xList);
			map.put("yList", yList);
		}
	}
	
	public void getHistoryPFByInit(Map<String, Object> map) throws BaseException {
		//预留，初始化时从数据库取近期数据方法
	}
	
	//两个日期间值
    public static Date[] getDateArrays(Date start,Date end ,int calendarType){  
        ArrayList<Date> ret = new ArrayList<Date>();  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(start);  
        Date tmpDate = calendar.getTime();  
        long endTime = end.getTime();  
        while(tmpDate.before(end)||tmpDate.getTime() == endTime){  
            ret.add(calendar.getTime());  
            calendar.add(calendarType, 1);  
            tmpDate = calendar.getTime();  
        }         
          
        Date[] dates = new Date[ret.size()];  
        return ret.toArray(dates);        
    } 
  
	public void getHourPF(Map<String, Object> map,String targetTime) throws BaseException {
		List yList = transitDao.getHourPF(targetTime.replaceAll("-", ""));
		map.put("yList", yList);
	}
	
	public void getbsPFlist(Pages page,String targetTime,Map<String, Object> map) throws BaseException {
		page.setTargetTime(targetTime.replaceAll("-", ""));
//		int c = transitDao.getCountDayBsPF(page);
		List<DayBsPF> list = transitDao.getDayBsPF(page);
		Integer rs = page.getBegin();
		for(DayBsPF vo : list) {
			vo.setRows(++rs);
		}
		map.put("rows", list);
//		map.put("iTotalRecords", c);
//		map.put("iTotalDisplayRecords", c);
	}
	
	public void getbdxl1(Map<String, Object> map,Bdxl vo) throws BaseException {
		List xList =new ArrayList();
		List yList =new ArrayList();
		if(vo.getDir().equals("0")){
			vo.setDir(null);
		} else if(vo.getDir().equals("1")) {
			vo.setDir("上行");
		} else {
			vo.setDir("下行");
		}
		//按小时
		if(vo.getsTime().equals(vo.geteTime())) {
			vo.setsTime(vo.getsTime().replaceAll("-", ""));
			vo.seteTime(vo.geteTime().replaceAll("-", ""));
			List<Bdxl> result = transitDao.getBdxl1List(vo);
			List list = getAllDayList(result);
			for(int i=0;i<list.size();i++) {
				xList.add(i,i);
				yList.add(i,list.get(i));
			}
		} else {
			//按天
			Date[] strArray = getDateArrays(DateUtil.convertStringToDate(vo.getsTime()), DateUtil.convertStringToDate(vo.geteTime()), Calendar.DAY_OF_YEAR);  
	        for (Date string : strArray) { 
	            xList.add(DateUtil.convertDateToString(string).replaceAll("-", "").substring(6, 8));
	        } 
			vo.setsTime(vo.getsTime().replaceAll("-", ""));
			vo.seteTime(vo.geteTime().replaceAll("-", ""));
			List<Integer> result = transitDao.getBdxl1List1(vo);
			for(int i=0;i<result.size();i++) {
				yList.add(result.get(i));
			}
		}
		map.put("xList", xList);
		map.put("yList", yList);
	}
	
	//补全24H
	public List getAllDayList(List<Bdxl> demo) {
		for(Bdxl xl : demo){
			xl.setDateByHour(xl.getDateByHour().substring(9, 11));
		}
		for(Bdxl xl : demo){
			if(xl.getDateByHour().substring(0, 1).equals("0")) {
				xl.setDateByHour(xl.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(Bdxl xl : demo){
				if(xl.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, xl.getCountPf());
				}
			}
		}
		return l;
	}
	
	public List getAllDayListByBs(List<BsPF> demo) {
		for(BsPF bs : demo){
			bs.setDateByHour(bs.getDateByHour().substring(11, 13));
		}
		for(BsPF bs : demo){
			if(bs.getDateByHour().substring(0, 1).equals("0")) {
				bs.setDateByHour(bs.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(BsPF bs : demo){
				if(bs.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, bs.getPf());
				}
			}
		}
		return l;
	}
	
	public List getAllDayListByDayMin15(List<Min15PF> demo) {
		for(Min15PF vo : demo){
			vo.setDateByHour(vo.getDateByHour().substring(9, 11));
		}
		for(Min15PF vo : demo){
			if(vo.getDateByHour().substring(0, 1).equals("0")) {
				vo.setDateByHour(vo.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(Min15PF vo : demo){
				if(vo.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, vo.getPf());
				}
			}
		}
		return l;
	}
	
	public List getAllDayListDPFByDayMin15(List<Min15PF> demo) {
		for(Min15PF vo : demo){
			vo.setDateByHour(vo.getDateByHour().substring(9, 11));
		}
		for(Min15PF vo : demo){
			if(vo.getDateByHour().substring(0, 1).equals("0")) {
				vo.setDateByHour(vo.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(Min15PF vo : demo){
				if(vo.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, vo.getDpf());
				}
			}
		}
		return l;
	}
	
	public void getBsNameByLineName(Map<String, Object> map,LineBs vo) throws BaseException {
		map.put("bsNames", transitDao.getBsNameByLineName(vo));
	}
	
	public void getBsPF(Map<String, Object> map,BsPF vo) throws BaseException {
//		System.out.println("线路:" + vo.getLineName() + " 方向:" + vo.getDir() + " 站点:" + vo.getBsName() + " 类型:" + vo.getType() + " 日期:" + vo.getTargetTime());
		Long bsId = transitDao.getBsId(vo);
		vo.setTargetTime(vo.getTargetTime().replaceAll("-", ""));
		vo.setBsId(bsId);		
		List yList = getAllDayListByBs(transitDao.getBsHourPF(vo));
		map.put("yList", yList);
		
		//早高峰
		vo.setsTime(vo.getTargetTime() + " 07");
		vo.seteTime(vo.getTargetTime() + " 09");
		List amX = new ArrayList();
		List<BsPF> amList = transitDao.getAmBsPF(vo);
		for(BsPF bsPF : amList) {
			amX.add(bsPF.getLineName());
		}
		map.put("amX", amX);
		List amY = new ArrayList();
		for(int i =0;i<amList.size();i++) {
			Map<String, String> maps = new HashMap<String, String>();
			maps.put("value", String.valueOf(amList.get(i).getPf()));
			maps.put("name", amList.get(i).getLineName());
			amY.add(maps);
		}
		map.put("amY", amY);
		
		//晚高峰
		vo.setsTime(vo.getTargetTime() + " 17");
		vo.seteTime(vo.getTargetTime() + " 19");
		List pmX = new ArrayList();
		List<BsPF> pmList = transitDao.getPmBsPF(vo);
		for(BsPF bsPF : pmList) {
			pmX.add(bsPF.getLineName());
		}
		map.put("pmX", pmX);
		List pmY = new ArrayList();
		for(int i =0;i<pmList.size();i++) {
			Map<String, String> maps = new HashMap<String, String>();
			maps.put("value", String.valueOf(pmList.get(i).getPf()));
			maps.put("name", pmList.get(i).getLineName());
			pmY.add(maps);
		}
		map.put("pmY", pmY);
	}
	
	public void getAreaPFByHour(Map<String, Object> map,String time) throws BaseException {
		List yList = getAllDayListByDayMin15(transitDao.getAreaList(time));
		map.put("yList", yList);
	}
	
	public void getLinePFByHour(Map<String, Object> map,String time) throws BaseException {
		List yyList = getAllDayListByDayMin15(transitDao.getLineList(time));
		map.put("yyList", yyList);
	}
	
	public void getBsPFByHH(Map<String, Object> map,BsPF vo) throws BaseException {
//		System.out.println("线路:" + vo.getLineName() + " 方向:" + vo.getDir() + " sTime:" + vo.getsTime() + "eTime:" + vo.geteTime() + " hour:" + vo.getHour());
		if(vo.getDir().equals("0")){
			vo.setDir(null);
		} else if(vo.getDir().equals("1")) {
			vo.setDir("上行");
		} else {
			vo.setDir("下行");
		}
		if(vo.getsTime().equals(vo.geteTime())) {
			vo.setTargetTime(vo.getsTime().replaceAll("-", "") + " " + vo.getHour());
//			System.out.println("目标时间:" + vo.getTargetTime());
		} else {
			vo.setTargetTime("20990301 00");
		}
		List<BsPF> list = transitDao.getBsPFByHH(vo);
		List amX = new ArrayList();
		for(BsPF bsPF : list) {
			amX.add(bsPF.getBsName());
		}
		map.put("amX", amX);
		List amY = new ArrayList();
		for(int i =0;i<list.size();i++) {
			Map<String, String> maps = new HashMap<String, String>();
			maps.put("value", String.valueOf(list.get(i).getPf()));
			maps.put("name", list.get(i).getBsName());
			amY.add(maps);
		}
		map.put("amY", amY);
	}
	
	public void getBuslane(Map<String, Object> map) throws BaseException {
		map.put("data1", transitDao.getBuslaneData1());
		map.put("data2", transitDao.getBuslaneData2());
		map.put("data3", transitDao.getBuslaneData3());
	}
	
	public List<String> getLinesName() throws BaseException {
		return transitDao.getLinesName();
	}
	
	public void getBusLineOD(Map<String, Object> map,String lineName,String time,String dir) throws BaseException {
		Map paramMap = new HashMap();
		paramMap.put("lineName", lineName);
		paramMap.put("dir", dir);
		paramMap.put("time", time.replaceAll("-", ""));
		List yList = getAllDayListDPFByDayMin15(transitDao.getBusLineOD(paramMap));
		map.put("yList", yList);
	}
	
	public void getPdnlPF(Map<String, Object> map,String time) throws BaseException {
		List yList1 = getAllDayListByDayMin15(transitDao.getPdnlPFNS(time.replaceAll("-", "")));
		List yList2 = getAllDayListByDayMin15(transitDao.getPdnlPFSN(time.replaceAll("-", "")));
		map.put("yList1", yList1);
		map.put("yList2", yList2);
	}
	
	public void getBusSpeedPF(Map<String, Object> map,String time,String dir) throws BaseException {
		Map paramMap = new HashMap();
		paramMap.put("time", time.replaceAll("-", ""));
		paramMap.put("dir", dir);
		List yList1 = getAllDayListByDayMin15(transitDao.getBusSpeedPF1(paramMap));
		List yList2 = getAllDayListByDayMin15(transitDao.getBusSpeedPF2(paramMap));
		List yList3 = getAllDayListByDayMin15(transitDao.getBusSpeedPF3(paramMap));
		map.put("yList1", yList1);
		map.put("yList2", yList2);
		map.put("yList3", yList3);
	}
	
	public List<String> getFrRoads() throws BaseException {
		return transitDao.getFrRoads();
	}
	
	public List<String> grtTrRoads() throws BaseException {
		return transitDao.grtTrRoads();
	}
	
	public void getRoadSpeed1(Map<String, Object> map,RoadSpeed vo) throws BaseException {
		vo.setTargetTime(vo.getTargetTime().replaceAll("-", ""));
		List yList = getAllDayListByRoadSpeed1(transitDao.getRoadSpeed1(vo));
		RoadCross roadCross = transitDao.getRoadCross(vo);
		map.put("yList", yList);
		map.put("rCross1", roadCross);
	}
	
	public void getRoadSpeed2(Map<String, Object> map,RoadSpeed vo) throws BaseException {
		vo.setTargetTime(vo.getTargetTime().replaceAll("-", ""));
		List yList = getAllDayListByRoadSpeed2(transitDao.getRoadSpeed2(vo));
		RoadCross roadCross = transitDao.getRoadCross(vo);
		map.put("yList", yList);
		map.put("rCross2", roadCross);
	}
	
	public List getAllDayListByRoadSpeed1(List<RoadSpeed> demo) {
		for(RoadSpeed vo : demo){
			vo.setDateByHour(vo.getDateByHour().substring(9, 11));
		}
		for(RoadSpeed vo : demo){
			if(vo.getDateByHour().substring(0, 1).equals("0")) {
				vo.setDateByHour(vo.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(RoadSpeed vo : demo){
				if(vo.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, vo.getvRoad());
				}
			}
		}
		return l;
	}
	
	public List getAllDayListByRoadSpeed2(List<RoadSpeed> demo) {
		for(RoadSpeed vo : demo){
			vo.setDateByHour(vo.getDateByHour().substring(9, 11));
		}
		for(RoadSpeed vo : demo){
			if(vo.getDateByHour().substring(0, 1).equals("0")) {
				vo.setDateByHour(vo.getDateByHour().substring(1, 2));
			};
		}
		List l = new ArrayList();
		l.add(0, 0);
		l.add(1, 0);
		l.add(2, 0);
		l.add(3, 0);
		l.add(4, 0);
		l.add(5, 0);
		l.add(6, 0);
		l.add(7, 0);
		l.add(8, 0);
		l.add(9, 0);
		l.add(10, 0);
		l.add(11, 0);
		l.add(12, 0);
		l.add(13, 0);
		l.add(14, 0);
		l.add(15, 0);
		l.add(16, 0);
		l.add(17, 0);
		l.add(18, 0);
		l.add(19, 0);
		l.add(20, 0);
		l.add(21, 0);
		l.add(22, 0);
		l.add(23, 0);

		for(int i=0; i<l.size(); i++) {
			for(RoadSpeed vo : demo){
				if(vo.getDateByHour().equals(String.valueOf(i))) {
					l.remove(i);
					l.add(i, vo.getvBuslane());
				}
			}
		}
		return l;
	}
}
