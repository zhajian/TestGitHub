package cn.traffic.manage.ss.entity;

public class GuestFlow {
	
	private String dateId;
	private String pf;		//客流
	private String pf_o_d;	//o：产生客流 d：吸引客流
	private String tMode;	//METRO：地铁 BUS：公交
	
	private String pf_on_off;	//on:沿线上客 off:沿线下客
	private String dir;			//N:北 S:南
	
	
	public String getPf_on_off() {
		return pf_on_off;
	}
	public void setPf_on_off(String pf_on_off) {
		this.pf_on_off = pf_on_off;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getDateId() {
		return dateId;
	}
	public void setDateId(String dateId) {
		this.dateId = dateId;
	}
	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	public String getPf_o_d() {
		return pf_o_d;
	}
	public void setPf_o_d(String pf_o_d) {
		this.pf_o_d = pf_o_d;
	}
	public String gettMode() {
		return tMode;
	}
	public void settMode(String tMode) {
		this.tMode = tMode;
	}
	
}
