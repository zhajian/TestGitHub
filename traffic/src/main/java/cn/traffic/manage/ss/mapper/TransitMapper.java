package cn.traffic.manage.ss.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import cn.traffic.manage.ss.entity.Bdxl;
import cn.traffic.manage.ss.entity.BsPF;
import cn.traffic.manage.ss.entity.DayBsPF;
import cn.traffic.manage.ss.entity.DayPF;
import cn.traffic.manage.ss.entity.GuestFlow;
import cn.traffic.manage.ss.entity.LineBs;
import cn.traffic.manage.ss.entity.LinePF;
import cn.traffic.manage.ss.entity.Lines;
import cn.traffic.manage.ss.entity.Min15PF;
import cn.traffic.manage.ss.entity.Pages;
import cn.traffic.manage.ss.entity.RoadCross;
import cn.traffic.manage.ss.entity.RoadSpeed;
import cn.traffic.manage.ss.entity.Transit;

import com.hongguaninfo.hgdf.wadp.core.base.BaseSqlMapper;

public interface TransitMapper extends BaseSqlMapper {
	//第一页
	@Select("SELECT SUM(LENGTH) FROM tbl_bus_line")
	public int getSumNum();
	@Select("select sum(length) from tbl_gjzyd")
	public int getTransitNum();
	@Select("SELECT COUNT(1) FROM tbl_bus_line")
	public int getAllLines();
	@Select("SELECT COUNT(1) FROM tbl_bus_station")	
	public int getAllStations();
	@Select("SELECT PF,PF_O_D,TMODE tMode FROM tbl_day_mode_pf WHERE dateid = (select MAX(t.dateid) from tbl_day_mode_pf t)")
	public List<GuestFlow> getFlow();
	@Select("SELECT PF,PF_ON_OFF,DIR FROM tbl_day_dir_pf WHERE dateid = (select MAX(t.dateid) from tbl_day_dir_pf t)")
	public List<GuestFlow> getNSFlow();
	
	//第二页
	@Select("select pf from tbl_day_pf t where to_char(t.dateid,'yyyymmdd') between #{startTime} and #{endTime} order by t.dateid")
	public List<String> getHistoryPF(DayPF vo);
	@Select("select sum(pf) as cc from tbl_15min_pf where to_char(timestamp, 'yyyymmdd') = #{targetTime} group by to_char(timestamp, 'yyyy/mm/dd hh24') order by to_char(timestamp, 'yyyy/mm/dd hh24')")
	public List<String> getHourPF(String targetTime);
	@Select("SELECT LINE_NAME lineName, pf FROM (SELECT LINE_NAME,pf,ROWNUM RN FROM (select B.*,ROWNUM rown from (select LINE_NAME,round(pf / bus_num) pf  from tbl_day_line_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf desc) B where ROWNUM <= 10)) A where RN > #{begin} and RN <= #{end}")
	public List<LinePF> getLinePF(Pages page);
	@Select("SELECT count(1) FROM (select B.*,ROWNUM rown from (select * from tbl_day_line_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf/bus_num) B where ROWNUM <= 10)")
	public int getCountLinePF(Pages page);
	@Select("SELECT LINE_NAME lineName, pf FROM (SELECT LINE_NAME, pf, ROWNUM RN FROM (select B.*, ROWNUM rown from (select * from tbl_day_line_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf desc) B where ROWNUM <= 10)) A where RN > #{begin} and RN <= #{end}")
	public List<LinePF> getLinePF2(Pages page);
	@Select("SELECT count(1) FROM (select B.*,ROWNUM rown from (select * from tbl_day_line_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf) B where ROWNUM <= 10)")
	public int getCountLinePF2(Pages page);
	@Select("SELECT bs_name bsName,dir,pf FROM (SELECT bs_name,dir,pf, ROWNUM RN FROM (select B.*, ROWNUM rown from (select * from tbl_day_bs_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf desc) B where ROWNUM <= 10)) A where RN > 0 and RN <= 10")
	public List<DayBsPF> getDayBsPF(Pages page);
	@Select("SELECT count(1) FROM (select B.*,ROWNUM rown from (select * from tbl_day_bs_pf where to_char(dateid,'yyyymmdd') = #{targetTime} order by pf) B where ROWNUM <= 10)")
	public int getCountDayBsPF(Pages page);
	@Select("select t.lineid lineId,t.line_name lineName from tbl_bus_line t")
	public List<Lines> getLines();
	@Select("select distinct(t.line_name) lineName from tbl_line_bs t")
	public List<Lines> getLine();
	@Select("select t.bs_name bsName from tbl_line_bs t where t.line_name = #{linName} and t.dir = #{dir}")
	public List<LineBs> getBsNameByLineName(LineBs vo);
	public List<Bdxl> getBdxl1List(Bdxl vo);
	public List<Integer> getBdxl1List1(Bdxl vo);
	@Select("select to_char(timestamp, 'yyyy/mm/dd hh24') dateByHour, sum(pf) as pf from tbl_15min_bs_pf where to_char(timestamp, 'yyyymmdd') = #{targetTime} and bs_id = #{bsId} and type = #{type} group by to_char(timestamp, 'yyyy/mm/dd hh24') order by to_char(timestamp, 'yyyy/mm/dd hh24')")
	public List<BsPF> getBsHourPF(BsPF vo);
	@Select("select t.bs_id from tbl_line_bs t where t.line_name = #{lineName} and t.dir = #{dir} and t.bs_name = #{bsName}")
	public Long getBsId(BsPF vo);	
	@Select("select distinct line_name lineName, sum(pf) pf from tbl_15min_bls_pf where bs_id=#{bsId} and type=#{type} and to_char(timestamp,'yyyymmdd hh24')>=#{sTime} and to_char(timestamp,'yyyymmdd hh24')<#{eTime} group by line_name")
	public List<BsPF> getAmBsPF(BsPF vo);
	@Select("select distinct line_name lineName, sum(pf) pf from tbl_15min_bls_pf where bs_id=#{bsId} and type=#{type} and to_char(timestamp,'yyyymmdd hh24')>=#{sTime} and to_char(timestamp,'yyyymmdd hh24')<#{eTime} group by line_name")
	public List<BsPF> getPmBsPF(BsPF vo);
	public List<BsPF> getBsPFByHH(BsPF vo);
	@Select("select to_char(timestamp,'yyyymmdd hh24') dateByHour, sum(pf) pf from tbl_15min_pf where area_type='陆家嘴' and to_char(timestamp,'yyyymmdd') = #{time} group by to_char(timestamp,'yyyymmdd hh24') order by to_char(timestamp,'yyyymmdd hh24')")
	public List<Min15PF> getAreaList(String time);
	@Select("select to_char(timestamp,'yyyymmdd hh24') dateByHour, sum(pf) pf from tbl_15min_pf where area_type='浦东南路' and to_char(timestamp,'yyyymmdd') = #{time} group by to_char(timestamp,'yyyymmdd hh24') order by to_char(timestamp,'yyyymmdd hh24')")
	public List<Min15PF> getLineList(String time);
	
	//第四页
	@Select("select distinct t.line_name from tbl_hh_m_bodl t")
	public List<String> getLinesName();
	@Select("select t.line_name from tbl_m_buslane t")
	public List<String> getBuslaneData1();
	@Select("select t.v_line from tbl_m_buslane t")
	public List<String> getBuslaneData2();
	@Select("select t.m_degree from tbl_m_buslane t")
	public List<String> getBuslaneData3();
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(od_rate) dpf from tbl_hh_m_bodl where line_name = #{lineName} and l_dir = #{dir} and to_char(timestamp, 'yyyymmdd') = #{time} group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getBusLineOD(Map<String, Object> map);
	
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(pf) pf from tbl_hh_dir_pf where to_char(timestamp, 'yyyymmdd') = #{time} and road_name = '浦东南路' and dir = '南向北' group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getPdnlPFNS(String time);
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(pf) pf from tbl_hh_dir_pf where to_char(timestamp, 'yyyymmdd') = #{time} and road_name = '浦东南路' and dir = '北向南' group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getPdnlPFSN(String time);
	
	//第五页
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(v_path) pf from tbl_hh_bus_speed where to_char(timestamp, 'yyyymmdd') = #{time} and dir = #{dir} and path_name = '陆家嘴段' group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getBusSpeedPF1(Map<String, Object> map);
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(v_path) pf from tbl_hh_bus_speed where to_char(timestamp, 'yyyymmdd') = #{time} and dir = #{dir} and path_name = '张杨路段' group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getBusSpeedPF2(Map<String, Object> map);
	@Select("select to_char(timestamp, 'yyyymmdd hh24') dateByHour, sum(v_path) pf from tbl_hh_bus_speed where to_char(timestamp, 'yyyymmdd') = #{time} and dir = #{dir} and path_name = '塘桥段' group by to_char(timestamp, 'yyyymmdd hh24') order by to_char(timestamp, 'yyyymmdd hh24')")
	public List<Min15PF> getBusSpeedPF3(Map<String, Object> map);
	
	//第三页
	@Select("select t.fr_name from tbl_road_cross t")
	public List<String> getFrRoads();
	@Select("select t.tr_name from tbl_road_cross t")
	public List<String> grtTrRoads();
	@Select("select to_char(timestamp,'yyyymmdd hh24') dateByHour, sum(v_road) vRoad from tbl_hh_road_speed where road_name='浦东南路' and fr_name = #{frName} and tr_name = #{trName} and to_char(timestamp,'yyyymmdd') = #{targetTime} group by to_char(timestamp,'yyyymmdd hh24') order by to_char(timestamp,'yyyymmdd hh24')")
	public List<RoadSpeed> getRoadSpeed1(RoadSpeed vo);
	@Select("select to_char(timestamp,'yyyymmdd hh24') dateByHour, sum(v_buslane) vBuslane from tbl_hh_road_speed where road_name='浦东南路' and fr_name = #{frName} and tr_name = #{trName} and to_char(timestamp,'yyyymmdd') = #{targetTime} group by to_char(timestamp,'yyyymmdd hh24') order by to_char(timestamp,'yyyymmdd hh24')")
	public List<RoadSpeed> getRoadSpeed2(RoadSpeed vo);
	@Select("select t.line_num lineNum,t.bs_num bsNum from tbl_road_cross t where t.fr_name = #{frName} and t.tr_name = #{trName}")
	public RoadCross getRoadCross(RoadSpeed vo);
}

