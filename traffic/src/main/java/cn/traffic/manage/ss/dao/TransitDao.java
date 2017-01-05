package cn.traffic.manage.ss.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

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
import cn.traffic.manage.ss.mapper.TransitMapper;

import com.hongguaninfo.hgdf.wadp.core.base.BaseDao;

@Repository("transitDao")
public class TransitDao extends BaseDao<Transit,TransitMapper,Integer> 
		implements TransitMapper {
   
	@Override
    public String getMapperNamesapce() {
        return TransitMapper.class.getName().toString();
    }

	@Override
	public int getSumNum() {
		return getMapperByType(TransitMapper.class).getSumNum();
	}
	@Override
	public int getTransitNum() {
		return getMapperByType(TransitMapper.class).getTransitNum();
	}
	@Override
	public int getAllLines() {
		return getMapperByType(TransitMapper.class).getAllLines();
	}
	@Override
	public int getAllStations() {
		return getMapperByType(TransitMapper.class).getAllStations();
	}

	@Override
	public List<GuestFlow> getFlow() {
		return getMapperByType(TransitMapper.class).getFlow();
	}

	@Override
	public List<GuestFlow> getNSFlow() {
		return getMapperByType(TransitMapper.class).getNSFlow();
	}

	@Override
	public List<LinePF> getLinePF(Pages page) {
		return getMapperByType(TransitMapper.class).getLinePF(page);
	}

	@Override
	public int getCountLinePF(Pages page) {
		return getMapperByType(TransitMapper.class).getCountLinePF(page);
	}

	@Override
	public List<String> getHistoryPF(DayPF vo) {
		return getMapperByType(TransitMapper.class).getHistoryPF(vo);
	}

	@Override
	public List<String> getHourPF(String targetTime) {
		return getMapperByType(TransitMapper.class).getHourPF(targetTime);
	}

	@Override
	public List<LinePF> getLinePF2(Pages page) {
		return getMapperByType(TransitMapper.class).getLinePF2(page);
	}

	@Override
	public int getCountLinePF2(Pages page) {
		return getMapperByType(TransitMapper.class).getCountLinePF2(page);
	}

	@Override
	public List<DayBsPF> getDayBsPF(Pages page) {
		return getMapperByType(TransitMapper.class).getDayBsPF(page);
	}

	@Override
	public int getCountDayBsPF(Pages page) {
		return getMapperByType(TransitMapper.class).getCountDayBsPF(page);
	}

	@Override
	public List<Lines> getLines() {
		return getMapperByType(TransitMapper.class).getLines();
	}

	@Override
	public List<Bdxl> getBdxl1List(Bdxl vo) {
		return getMapperByType(TransitMapper.class).getBdxl1List(vo);
	}

	@Override
	public List<Integer> getBdxl1List1(Bdxl vo) {
		return getMapperByType(TransitMapper.class).getBdxl1List1(vo);
	}

	@Override
	public List<Lines> getLine() {
		return getMapperByType(TransitMapper.class).getLine();
	}

	@Override
	public List<LineBs> getBsNameByLineName(LineBs vo) {
		return getMapperByType(TransitMapper.class).getBsNameByLineName(vo);
	}

	@Override
	public List<BsPF> getBsHourPF(BsPF vo) {
		return getMapperByType(TransitMapper.class).getBsHourPF(vo);
	}

	@Override
	public Long getBsId(BsPF vo) {
		return getMapperByType(TransitMapper.class).getBsId(vo);
	}

	@Override
	public List<BsPF> getAmBsPF(BsPF vo) {
		return getMapperByType(TransitMapper.class).getAmBsPF(vo);
	}

	@Override
	public List<BsPF> getPmBsPF(BsPF vo) {
		return getMapperByType(TransitMapper.class).getPmBsPF(vo);
	}

	@Override
	public List<Min15PF> getAreaList(String time) {
		return getMapperByType(TransitMapper.class).getAreaList(time);
	}

	@Override
	public List<Min15PF> getLineList(String time) {
		return getMapperByType(TransitMapper.class).getLineList(time);
	}

	@Override
	public List<BsPF> getBsPFByHH(BsPF vo) {
		return getMapperByType(TransitMapper.class).getBsPFByHH(vo);
	}

	@Override
	public List<String> getBuslaneData1() {
		return getMapperByType(TransitMapper.class).getBuslaneData1();
	}

	@Override
	public List<String> getBuslaneData2() {
		return getMapperByType(TransitMapper.class).getBuslaneData2();
	}

	@Override
	public List<String> getBuslaneData3() {
		return getMapperByType(TransitMapper.class).getBuslaneData3();
	}

	@Override
	public List<String> getLinesName() {
		return getMapperByType(TransitMapper.class).getLinesName();
	}

	@Override
	public List<Min15PF> getBusLineOD(Map<String, Object> map) {
		return getMapperByType(TransitMapper.class).getBusLineOD(map);
	}

	@Override
	public List<Min15PF> getPdnlPFNS(String time) {
		return getMapperByType(TransitMapper.class).getPdnlPFNS(time);
	}

	@Override
	public List<Min15PF> getPdnlPFSN(String time) {
		return getMapperByType(TransitMapper.class).getPdnlPFSN(time);
	}

	@Override
	public List<Min15PF> getBusSpeedPF1(Map<String, Object> map) {
		return getMapperByType(TransitMapper.class).getBusSpeedPF1(map);
	}

	@Override
	public List<Min15PF> getBusSpeedPF2(Map<String, Object> map) {
		return getMapperByType(TransitMapper.class).getBusSpeedPF2(map);
	}

	@Override
	public List<Min15PF> getBusSpeedPF3(Map<String, Object> map) {
		return getMapperByType(TransitMapper.class).getBusSpeedPF3(map);
	}

	@Override
	public List<String> getFrRoads() {
		return getMapperByType(TransitMapper.class).getFrRoads();
	}

	@Override
	public List<String> grtTrRoads() {
		return getMapperByType(TransitMapper.class).grtTrRoads();
	}

	@Override
	public List<RoadSpeed> getRoadSpeed1(RoadSpeed vo) {
		return getMapperByType(TransitMapper.class).getRoadSpeed1(vo);
	}

	@Override
	public List<RoadSpeed> getRoadSpeed2(RoadSpeed vo) {
		return getMapperByType(TransitMapper.class).getRoadSpeed2(vo);
	}

	@Override
	public RoadCross getRoadCross(RoadSpeed vo) {
		return getMapperByType(TransitMapper.class).getRoadCross(vo);
	}
	

}
