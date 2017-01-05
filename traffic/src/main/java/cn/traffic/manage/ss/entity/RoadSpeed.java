package cn.traffic.manage.ss.entity;

public class RoadSpeed {
	
	private String frName;
	private String trName;
	private Integer vRoad;
	private Integer vBuslane;
	private String targetTime;
	private String dateByHour;
	
	
	public String getFrName() {
		return frName;
	}
	public void setFrName(String frName) {
		this.frName = frName;
	}
	public String getTrName() {
		return trName;
	}
	public void setTrName(String trName) {
		this.trName = trName;
	}
	public Integer getvRoad() {
		return vRoad;
	}
	public void setvRoad(Integer vRoad) {
		this.vRoad = vRoad;
	}
	public Integer getvBuslane() {
		return vBuslane;
	}
	public void setvBuslane(Integer vBuslane) {
		this.vBuslane = vBuslane;
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
	

}
