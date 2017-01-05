package cn.traffic.manage.ss.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.traffic.manage.ss.dao.TransitDao;
import cn.traffic.manage.ss.entity.Bdxl;
import cn.traffic.manage.ss.entity.BsPF;
import cn.traffic.manage.ss.entity.DayPF;
import cn.traffic.manage.ss.entity.GuestFlow;
import cn.traffic.manage.ss.entity.LineBs;
import cn.traffic.manage.ss.entity.LinePF;
import cn.traffic.manage.ss.entity.Lines;
import cn.traffic.manage.ss.entity.Pages;
import cn.traffic.manage.ss.entity.RoadSpeed;
import cn.traffic.manage.ss.service.TransitService;

import com.hongguaninfo.hgdf.core.utils.exception.BaseException;
import com.hongguaninfo.hgdf.wadp.core.base.BaseController;
import com.hongguaninfo.hgdf.wadp.core.templete.HttpTemplete;
import com.hongguaninfo.hgdf.wadp.core.templete.OperateTemplete;

@Controller
@RequestMapping("/normal")
public class TransitController extends BaseController {
	
	@Autowired
	private TransitService transitService;
	
	@Autowired
	private TransitDao transitDao;

	@RequestMapping(value="/index")
    public String index(HttpServletRequest request,
            HttpServletResponse response, final Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
        		//线路总里程
        		model.addAttribute("sumNum", transitDao.getSumNum());
        		//公交专用道里程
        		model.addAttribute("transitNum", transitDao.getTransitNum());
        		//线路数
        		model.addAttribute("allLines", transitDao.getAllLines());
        		//站点数
        		model.addAttribute("allStations", transitDao.getAllStations());
        		
        		List<GuestFlow> list = transitDao.getFlow();
        		for(GuestFlow flow : list) {
        			if(flow.getPf_o_d().equals("O")) {
        				//产生客流
        				if(flow.gettMode().equals("METRO")) {
        					//地铁
        					model.addAttribute("OMETRO", flow.getPf());
        				} else {
        					//公交
        					model.addAttribute("OBUS", flow.getPf());
        				}
        			} else if(flow.getPf_o_d().equals("D")) {
        				//吸引客流
        				if(flow.gettMode().equals("METRO")) {
        					//地铁
        					model.addAttribute("DMETRO", flow.getPf());
        				} else {
        					//公交
        					model.addAttribute("DBUS", flow.getPf());
        				}
        			}
        		}
        		List<GuestFlow> nsList = transitDao.getNSFlow();
        		for(GuestFlow nsFlow : nsList) {
        			if(nsFlow.getPf_on_off().equals("ON")) {
        				if(nsFlow.getDir().equals("S")) {
        					model.addAttribute("ONS", nsFlow.getPf());
        				} else {
        					model.addAttribute("ONN", nsFlow.getPf());
        				}
        			} else if(nsFlow.getPf_on_off().equals("OFF")) {
        				if(nsFlow.getDir().equals("S")) {
        					model.addAttribute("OFFS", nsFlow.getPf());
        				} else {
        					model.addAttribute("OFFN", nsFlow.getPf());
        				}
        			}
        		}
                str = "traffic/transit/index";
            }
        };
        return templete.operateModel();
    }
	
	@RequestMapping(value="/index2")
    public String index2(HttpServletRequest request,
            HttpServletResponse response, final Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
            	HashMap<String, String> linesMap = new HashMap();
            	for(Lines line : transitDao.getLines()) {
            		linesMap.put(line.getLineId(), line.getLineName());
            	}
            	HashMap<String, String> lineMap = new HashMap();
            	for(Lines line : transitDao.getLine()) {
            		lineMap.put(line.getLineName(), line.getLineName());
            	}
            	model.addAttribute("line", lineMap);
            	model.addAttribute("lines", linesMap);
                str = "traffic/transit/index2";
            }
        };
        return templete.operateModel();
    }
	
	//历史客流折线图
	@RequestMapping("/getHistoryPF")
	@ResponseBody
	public Map getHistoryPF(HttpServletResponse response, final HttpServletRequest request,final DayPF vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getHistoryPF(vo, map);
			}
		};
		return templete.operate();
	}
	
	//时变客流折线图
	@RequestMapping("/getHourPF")
	@ResponseBody
	public Map getHourPF(HttpServletResponse response, final HttpServletRequest request,final String targetTime) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getHourPF(map, targetTime);
			}
		};
		return templete.operate();
	}
	
	//线路客流列表
	@RequestMapping("/linePFlist")
	@ResponseBody
	public Map getLinePFlist(HttpServletResponse response, final HttpServletRequest request,final String iDisplayStart,final String iDisplayLength,final String targetTime) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				Pages page = new Pages();
				page.setBegin(Integer.parseInt(iDisplayStart));
				page.setEnd(Integer.parseInt(iDisplayStart) + Integer.parseInt(iDisplayLength));
				transitService.getLinePFData(page,targetTime,map);
			}
		};
		return templete.operate();
	}
	
	//线路客流列表2
	@RequestMapping("/linePFlist2")
	@ResponseBody
	public Map getLinePFlist2(HttpServletResponse response, final HttpServletRequest request,final String iDisplayStart,final String iDisplayLength,final String targetTime) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				Pages page = new Pages();
				page.setBegin(Integer.parseInt(iDisplayStart));
				page.setEnd(Integer.parseInt(iDisplayStart) + Integer.parseInt(iDisplayLength));
				transitService.getLinePFData2(page,targetTime,map);
			}
		};
		return templete.operate();
	}
	
	//线路客流列表
	@RequestMapping("/bsPFlist")
	@ResponseBody
	public Map getbsPFlist(HttpServletResponse response, final HttpServletRequest request,final String iDisplayStart,final String iDisplayLength,final String targetTime) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				Pages page = new Pages();
				page.setBegin(Integer.parseInt(iDisplayStart));
				page.setEnd(Integer.parseInt(iDisplayStart) + Integer.parseInt(iDisplayLength));
				transitService.getbsPFlist(page,targetTime,map);
			}
		};
		return templete.operate();
	}
	
	@RequestMapping("/bdxl1")
	@ResponseBody
	public Map getbdxl1(HttpServletResponse response, final HttpServletRequest request,final Bdxl vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getbdxl1(map,vo);
			}
		};
		return templete.operate();
	}
	
	//线路客流列表
	@RequestMapping("/bdxl2")
	@ResponseBody
	public Map getbdxl2(HttpServletResponse response, final HttpServletRequest request,final Bdxl vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getbdxl1(map,vo);
			}
		};
		return templete.operate();
	}
	
	@RequestMapping("/getBsNameByLineName")
	@ResponseBody
	public Map getBsNameByLineName(HttpServletResponse response, final HttpServletRequest request,final LineBs vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getBsNameByLineName(map,vo);
			}
		};
		return templete.operate();
	}
	
	//客流分析筛选图表
	@RequestMapping("/getBsPF")
	@ResponseBody
	public Map getBsPF(HttpServletResponse response, final HttpServletRequest request,final BsPF vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getBsPF(map, vo);
			}
		};
		return templete.operate();
	}
	
	//首页区域折线图表
	@RequestMapping("/getAreaPFByHour")
	@ResponseBody
	public Map getAreaPFByHour(HttpServletResponse response, final HttpServletRequest request,final String time) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getAreaPFByHour(map, time);
			}
		};
		return templete.operate();
	}
	
	//首页线路折线图表
	@RequestMapping("/getLinePFByHour")
	@ResponseBody
	public Map getLinePFByHour(HttpServletResponse response, final HttpServletRequest request,final String time) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getLinePFByHour(map, time);
			}
		};
		return templete.operate();
	}
	
	//线路时变小时站点分布
	@RequestMapping("/getBsPFByHH")
	@ResponseBody
	public Map getBsPFByHH(HttpServletResponse response, final HttpServletRequest request,final BsPF vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getBsPFByHH(map, vo);
			}
		};
		return templete.operate();
	}
	
	@RequestMapping(value="/index4")
    public String index4(HttpServletRequest request,
            HttpServletResponse response, final Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
            	HashMap<String, String> lineNameMap = new HashMap();
            	for(String lineName : transitService.getLinesName()) {
            		lineNameMap.put(lineName, lineName);
            	}
            	model.addAttribute("lineNames", lineNameMap);

                str = "traffic/transit/index4";
            }
        };
        return templete.operateModel();
    }
	
	//公交线路走向与公交专用道分析
	@RequestMapping("/getBuslane")
	@ResponseBody
	public Map getBuslane(HttpServletResponse response, final HttpServletRequest request) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {
				transitService.getBuslane(map);
			}
		};
		return templete.operate();
	}
	
	//公交线路与公交OD匹配分析
	@RequestMapping("/getBusLineOD")
	@ResponseBody
	public Map getBusLineOD(HttpServletResponse response, final HttpServletRequest request,final String lineName,final String time,final String dir) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {	
				transitService.getBusLineOD(map,lineName,time,dir);
			}
		};
		return templete.operate();
	}
	
	//浦东南路潮汐现象分析
	@RequestMapping("/getPdnlPF")
	@ResponseBody
	public Map getPdnlPF(HttpServletResponse response, final HttpServletRequest request,final String time) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {	
				transitService.getPdnlPF(map,time);
			}
		};
		return templete.operate();
	}
	
	@RequestMapping(value="/index5")
    public String index5(HttpServletRequest request,
            HttpServletResponse response, final Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
            	HashMap<String, String> linesMap = new HashMap();
                str = "traffic/transit/index5";
            }
        };
        return templete.operateModel();
    }
	
	//公交专用道各路段运营车速时变
	@RequestMapping("/getBusSpeedPF")
	@ResponseBody
	public Map getBusSpeedPF(HttpServletResponse response, final HttpServletRequest request,final String time,final String dir) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {	
				transitService.getBusSpeedPF(map,time,dir);
			}
		};
		return templete.operate();
	}
	
	@RequestMapping(value="/index3")
    public String index7(HttpServletRequest request,
            HttpServletResponse response, final Model model) {
        OperateTemplete templete = new HttpTemplete(request) {
            protected void doSomething() throws BaseException {
            	HashMap<String, String> lineNameMap = new HashMap();
            	for(String lineName : transitService.getLinesName()) {
            		lineNameMap.put(lineName, lineName);
            	}
            	model.addAttribute("lineNames", lineNameMap);
            	
            	HashMap<String, String> frRoadMap = new HashMap();
            	for(String frRoad : transitService.getFrRoads()) {
            		frRoadMap.put(frRoad, frRoad);
            	}
            	model.addAttribute("frRoads", frRoadMap);
            	
            	HashMap<String, String> trRoadMap = new HashMap();
            	for(String trRoad : transitService.grtTrRoads()) {
            		trRoadMap.put(trRoad, trRoad);
            	}
            	model.addAttribute("trRoads", trRoadMap);
            	
                str = "traffic/transit/index3";
            }
        };
        return templete.operateModel();
    }
	
	//路段运行综合分析
	@RequestMapping("/getRoadSpeed1")
	@ResponseBody
	public Map getRoadSpeed1(HttpServletResponse response, final HttpServletRequest request,final RoadSpeed vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {	
				transitService.getRoadSpeed1(map,vo);
			}
		};
		return templete.operate();
	}
	
	//增加公交专用道分析 
	@RequestMapping("/getRoadSpeed2")
	@ResponseBody
	public Map getRoadSpeed2(HttpServletResponse response, final HttpServletRequest request,final RoadSpeed vo) {
		OperateTemplete templete = new HttpTemplete(request) {
			protected void doSomething() throws BaseException {	
				transitService.getRoadSpeed2(map,vo);
			}
		};
		return templete.operate();
	}
}
