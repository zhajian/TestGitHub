package cn.traffic.manage.ss.entity;

public class Bdxl {
	
	private String sTime;
	private String eTime;
	private String lineId;
	private String dir;
	private String dateByHour;
	private Integer countPf;
	
	
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getsTime() {
		return sTime;
	}
	public void setsTime(String sTime) {
		this.sTime = sTime;
	}
	public String geteTime() {
		return eTime;
	}
	public void seteTime(String eTime) {
		this.eTime = eTime;
	}
	public String getLineId() {
		return lineId;
	}
	public void setLineId(String lineId) {
		this.lineId = lineId;
	}
	public String getDateByHour() {
		return dateByHour;
	}
	public void setDateByHour(String dateByHour) {
		this.dateByHour = dateByHour;
	}
	public Integer getCountPf() {
		return countPf;
	}
	public void setCountPf(Integer countPf) {
		this.countPf = countPf;
	}

}
