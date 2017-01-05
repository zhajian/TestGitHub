package cn.traffic.manage.ss.entity;

public class BsPF {
	
	private Long bsId;
	private String lineName;
	private String bsName;
	private String dir;
	private String type;
	private Integer pf;
	private String dateByHour;
	private String targetTime;
	private String sTime;
	private String eTime;
	private String hour;
	private Integer rown;

	
	public String getHour() {
		return hour;
	}
	public void setHour(String hour) {
		this.hour = hour;
	}
	public Integer getRown() {
		return rown;
	}
	public void setRown(Integer rown) {
		this.rown = rown;
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
	public String getLineName() {
		return lineName;
	}
	public void setLineName(String lineName) {
		this.lineName = lineName;
	}
	public String getTargetTime() {
		return targetTime;
	}
	public void setTargetTime(String targetTime) {
		this.targetTime = targetTime;
	}
	public String getDateByHour() {
		return dateByHour;
	}
	public void setDateByHour(String dateByHour) {
		this.dateByHour = dateByHour;
	}
	public Long getBsId() {
		return bsId;
	}
	public void setBsId(Long bsId) {
		this.bsId = bsId;
	}
	public String getBsName() {
		return bsName;
	}
	public void setBsName(String bsName) {
		this.bsName = bsName;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getPf() {
		return pf;
	}
	public void setPf(Integer pf) {
		this.pf = pf;
	}

	
}
