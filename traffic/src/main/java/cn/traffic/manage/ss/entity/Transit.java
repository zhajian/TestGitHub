package cn.traffic.manage.ss.entity;

public class Transit {
	//线路表
	private int lineId;
	private String lineName;
	private int lineLength;
	//站点表
	private int bsID;
	private String bsName;
	
	
	public int getLineId() {
		return lineId;
	}
	public void setLineId(int lineId) {
		this.lineId = lineId;
	}
	public String getLineName() {
		return lineName;
	}
	public void setLineName(String lineName) {
		this.lineName = lineName;
	}
	public int getLineLength() {
		return lineLength;
	}
	public void setLineLength(int lineLength) {
		this.lineLength = lineLength;
	}
	public int getBsID() {
		return bsID;
	}
	public void setBsID(int bsID) {
		this.bsID = bsID;
	}
	public String getBsName() {
		return bsName;
	}
	public void setBsName(String bsName) {
		this.bsName = bsName;
	}

}
