package cn.traffic.manage.ss.entity;

public class Min15PF {
	
	private String targetTime;
	private String areaType;
	private Integer pf;
	private String dateByHour;
	private double dpf;
	
	
	public double getDpf() {
		return dpf;
	}
	public void setDpf(double dpf) {
		this.dpf = dpf;
	}
	public String getDateByHour() {
		return dateByHour;
	}
	public void setDateByHour(String dateByHour) {
		this.dateByHour = dateByHour;
	}
	public String getTargetTime() {
		return targetTime;
	}
	public void setTargetTime(String targetTime) {
		this.targetTime = targetTime;
	}
	public String getAreaType() {
		return areaType;
	}
	public void setAreaType(String areaType) {
		this.areaType = areaType;
	}
	public Integer getPf() {
		return pf;
	}
	public void setPf(Integer pf) {
		this.pf = pf;
	}
	

}
