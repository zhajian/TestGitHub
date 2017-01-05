/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014-6-30 10:16:21                           */
/*==============================================================*/
drop table if exists history_wifi_connect;
drop table if exists merchant_sms_account;
drop table if exists sys_user_merchant;
drop table if exists merchant_sms_send;
drop table if exists merchant_sms_send_item;

/*==============================================================*/
/* Table: history_wifi_connect                                  */
/*==============================================================*/
create table history_wifi_connect
(
   conn_id              int(20) not null auto_increment comment '接入编号',
   user_id              int(20) comment 'id',
   ap_id                int(20) comment 'ap的id号',
   device_type          enum('0','1','2') not null default '0' comment '客户端类型，0：其他，1：电脑，2：移动',
   token                varchar(32) not null comment 'token值',
   stage                varchar(32) comment '阶段',
   status               enum('0','1','2','3','4') not null default '0' comment '最后一次状态；0：其他状态 ，1：登录，2：认证，3：认证通过（计数），4：认证被拒',
   mac                  varchar(17) comment 'mac',
   ip                   char(15) comment 'ip',
   auth_type            varchar(32) comment '授权类型',
   auth_sub_type        varchar(32) comment '授权子类型',
   auth_identity        varchar(255) comment '授权唯一性',
   outgoing             float(18,2) not null default 0 comment '上行流量',
   incoming             float(18,2) not null default 0 comment '下行流量',
   browser_agent        varchar(255) comment '客户端请求头',
   disconnect_reason    varchar(255) default '0' comment '断开原因',
   disconnect_time      datetime comment '断开时间',
   created_time         datetime comment '创建日期',
   update_time          datetime comment '更新日期',
 `merchant_id` int(11) DEFAULT NULL COMMENT '商户id',
   primary key (conn_id),
  UNIQUE KEY `AK_Key_2` (`token`) USING BTREE,
  KEY `ap_id` (`ap_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
    KEY `I_merchantId` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='接入信息历史表';

/*==============================================================*/
/* Table: merchant_sms_account                                  */
/*==============================================================*/
CREATE TABLE `merchant_sms_account` (
  `sms_account_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商家短信帐户主键',
  `merchant_id` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT '0' COMMENT '短信总数',
  `used_num` int(11) DEFAULT '0' COMMENT '已使用数量',
   create_time          timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
   update_time          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`sms_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='商家短信帐户表';

/*==============================================================*/
/* Table: merchant_sms_send                                     */
/*==============================================================*/
CREATE TABLE `merchant_sms_send` (
  `sms_send_id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL COMMENT '主题',
  `content` varchar(600) DEFAULT NULL COMMENT '内容',
  `customer_num` int(11) DEFAULT NULL COMMENT '发送目标客户数量',
  `sms_num` int(11) DEFAULT NULL COMMENT '短信条数',
  `success_counts` int(11) DEFAULT NULL COMMENT '接口返回提交成功条数',
  `status` int(4) DEFAULT NULL COMMENT '发送状态，0=失败，1=成功',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`sms_send_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='商家短信发送表';

/*==============================================================*/
/* Table: merchant_sms_send_item                                */
/*==============================================================*/
CREATE TABLE `merchant_sms_send_item` (
  `sms_send_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_send_id` int(11) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `task_id` varchar(64) DEFAULT NULL COMMENT '接口发送任务id',
  `receive_time` timestamp NULL DEFAULT NULL COMMENT '接收时间',
  `status` int(11) DEFAULT NULL COMMENT '发送状态，0=发送失败，1=发送成功',
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`sms_send_item_id`),
  KEY `I_status_createTime` (`create_time`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='短信发送明细表';

/*==============================================================*/
/* Table: sys_user_merchant                                     */
/*==============================================================*/
create table sys_user_merchant
(
   user_id              int not null auto_increment,
   merchant_id          int comment '商家id',
   primary key (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='商家与系统用户表';


-- 商户角色
INSERT INTO SYS_ROLE (ROLE_ID_, ROLE_NAME_, ROLE_CODE_, IS_DELETE_, IS_FINAL_, CRT_TIME_, UPD_TIME_, CRT_USERID_, UPD_USERID_, DESCR_)
    VALUES(2, '商户', 'merchant', 0, 1,now(), now(), 1, 1, '商户');

-- 商户权限
insert into SYS_AUTH(AUTH_ID_,AUTH_TYPE_,AUTH_CODE_,AUTH_NAME_,AUTH_ENNAME_,AUTH_URI_
,AUTH_ICON_,ORDER_ID_,DESCR_,IS_DELETE_,IS_FINAL_,CRT_TIME_,UPD_TIME_,CRT_USERID_,UPD_USERID_
,OPER_ID_,FID_,FIDS_,LEVEL_ID_,IS_VISIBLE_)
VALUES
(5, 1,'ss:main','首页','main','/','icon-home',1,'首页',0,1,now(),now(),1,1,null,1,'',1,1),
(6, 1,'ss:indexConfig','主页设置','index config',null,'icon-cog',1,'主页设置',0,1,now(),now(),1,1,null,1,'',1,1),
(7, 1,'ss:marketPomotion','营销推广','market promotion',null,'icon-headphones',1,'营销推广',0,1,now(),now(),1,1,null,1,'',1,1),
(8, 1,'ss:businessAnalysis','经营分析','business analysis',null,'icon-list-alt',1,'经营分析',0,1,now(),now(),1,1,null,1,'',1,1),
(9, 1,'ss:myAccount','我的帐户','my account','/merchant/myAccount','icon-user',1,'我的帐户',0,1,now(),now(),1,1,null,1,'',1,1),

(71, 1,'ss:sendSms','短信发送','send sms','/merchantSms/sms/toSend','',1,'短信发送',0,1,now(),now(),1,1,null,7,1/7,2,1),

(81, 1,'ss:passengerFlow','客流统计','passengerFlow stats','/wifiUser/passengerFlow/show','',1,'客流统计',0,1,now(),now(),1,1,null,8,1/8,2,1),
(82, 1,'ss:visitors','访客列表','visitors list','/wifiUser/visitors/show','',1,'访客列表',0,1,now(),now(),1,1,null,8,1/8,2,1),
(83, 1,'ss:smsRecords','短信记录','sms records','/merchantSms/smsRecords/show','',1,'短信记录',0,1,now(),now(),1,1,null,8,1/8,2,1);

-- 商户角色权限表
insert into SYS_ROLE_AUTH_JOIN(ROLE_ID_, AUTH_ID_, IS_FINAL_, CRT_TIME_, CRT_USERID_)
VALUES (2, 5, 1, now(), 1),(2, 6, 1, now(), 1),(2, 7, 1, now(), 1),(2, 8, 1, now(), 1),(2, 9, 1, now(), 1),
(2, 71, 1, now(), 1),(2, 81, 1, now(), 1),(2, 82, 1, now(), 1),(2, 83, 1, now(), 1);


-- ALTER TABLE merchant_basic ADD COLUMN `parent_id` int(11) NOT NULL DEFAULT '0';
-- update sys_config SET CONFIG_VALUE_ = '2' WHERE CONFIG_KEY_ = 'login_verifcode';

