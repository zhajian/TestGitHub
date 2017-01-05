package cn.traffic.manage.ss.entity;

public class Pages {

	private Integer begin;
	private Integer end;
	private String targetTime;
	
	private Integer page;
	private Integer rows;
	private Integer rowsBegin;
	private Integer rowsEnd;
	

	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
		this.rowsBegin = (this.page - 1) * rows;
		this.rowsEnd = (this.page - 1) * rows + rows;
	}
	public Integer getRowsBegin() {
		return rowsBegin;
	}
	public void setRowsBegin(Integer rowsBegin) {
		this.rowsBegin = rowsBegin;
	}
	public Integer getRowsEnd() {
		return rowsEnd;
	}
	public void setRowsEnd(Integer rowsEnd) {
		this.rowsEnd = rowsEnd;
	}
	public String getTargetTime() {
		return targetTime;
	}
	public void setTargetTime(String targetTime) {
		this.targetTime = targetTime;
	}
	public Integer getBegin() {
		return begin;
	}
	public void setBegin(Integer begin) {
		this.begin = begin;
	}
	public Integer getEnd() {
		return end;
	}
	public void setEnd(Integer end) {
		this.end = end;
	}
	
}
