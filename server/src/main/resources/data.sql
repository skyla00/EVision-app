-- m_supplier 테이블 데이터 삽입
INSERT INTO SUPPLIER (SUPPLIER_CODE, SUPPLIER_NAME, SUPPLIER_ADDRESS, SUPPLIER_PHONE, SUPPLIER_EMAIL, SUPPLIER_STATUS) VALUES
('HK', '하만카돈', '서울특별시 강남구 테헤란로 87', '02-567-8901', 'sales@harmankardon.co.kr', 'ACTIVE'),
('BO', '뱅엔울룹슨', '서울특별시 서초구 사임당로 34', '02-345-6789', 'support@bangolufsen.co.kr', 'ACTIVE'),
('MS', '마샬', '서울특별시 용산구 한강대로 42', '02-789-4567', 'info@marshallkorea.co.kr', 'ACTIVE'),
('BS', '보스', '서울특별시 종로구 삼봉로 71', '02-890-1234', 'contact@boseaudio.co.kr', 'ACTIVE'),
('GR', '제네렉', '서울특별시 마포구 상암산로 38', '02-456-7890', 'service@genelecsound.co.kr', 'ACTIVE');

-- m_item 테이블 데이터 삽입
INSERT INTO ITEM (ITEM_CODE, ITEM_NAME, UNIT, SPECS, ITEM_STATUS) VALUES
('SPKAURAS4BK', 'AURA STUDIO 4', '개', '블루투스 스피커, 360도 사운드, 2.5cm 트위터, 4.5인치 서브우퍼, 듀얼 패시브 라디에이터', 'ACTIVE'),
('SPKSTICKS4BK', 'SOUND STICKS 4', '개', '2.1채널 블루투스 스피커, 유선/무선 연결 지원, 20Hz-20kHz 주파수 응답, 8인치 서브우퍼', 'ACTIVE'),
('HADRADIANCE2400BK', 'RADIANCE 2400', '세트', '고해상도 홈 오디오 시스템, 24비트/96kHz 해상도, 무선 서브우퍼 포함, 2000W 출력', 'ACTIVE'),
('SDBCITAMB110GRAYS', 'Citation Multibeam 1100', '개', '5.1채널 사운드바, 멀티빔 서라운드, 돌비 애트모스, HDMI ARC 지원, 590W 출력', 'ACTIVE'),
('SPKBESOUNDA9', 'BEOSOUND A9', '개', '프리미엄 무선 스피커, 구글 어시스턴트 내장, 360도 사운드, 480W 출력, Wi-Fi 및 블루투스 지원', 'ACTIVE'),
('SPKBESOUNDA5', 'BEOSOUND A5', '개', '휴대용 블루투스 스피커, 180도 사운드, 24시간 배터리 수명, 240W 출력', 'ACTIVE'),
('SPKBESOUNDBALANCE', 'BEOSOUND BALANCE', '개', '스마트 홈 스피커, 구글 어시스턴트 및 애플 에어플레이 2 지원, 880W 출력', 'ACTIVE'),
('SPKBESOUNDEMERGE', 'BEOSOUND EMERGE', '개', '콤팩트 스마트 스피커, Wi-Fi 및 블루투스 지원, 180W 출력, 구글 어시스턴트 내장', 'ACTIVE'),
('HDSBEPLAYEX', 'BEOPLAY EX', '개', '무선 이어폰, 액티브 노이즈 캔슬링(ANC), 최대 35시간 재생, IP57 방수/방진', 'ACTIVE'),
('HDSBEPLAYHX', 'BEOPLAY HX', '개', '무선 헤드폰, 액티브 노이즈 캔슬링(ANC), 최대 35시간 재생, 40mm 드라이버, 가죽 이어패드', 'ACTIVE'),
('HDSBEPLAYH95', 'BEOPLAY H95', '개', '프리미엄 무선 헤드폰, 액티브 노이즈 캔슬링(ANC), 최대 38시간 재생, 티타늄 드라이버', 'ACTIVE'),
('SPKACTON3', 'Acton 3', '개', '블루투스 스피커, 3.5인치 우퍼, 2개의 0.75인치 트위터, 30W 출력, 블루투스 5.0', 'ACTIVE'),
('SPKEMBERTON2', 'Emberton 2', '개', '휴대용 블루투스 스피커, 20시간 배터리, IP67 방수/방진, 블루투스 5.0, 10W 출력', 'ACTIVE'),
('SPKWOBURN3', 'Woburn 3', '개', '대형 블루투스 스피커, 50W 출력, 듀얼 우퍼 및 트위터, RCA 입력 및 3.5mm 잭 지원', 'ACTIVE'),
('SPKSTANMORE3', 'Stanmore 3', '개', '클래식 블루투스 스피커, 2개의 15W 트위터, 50W 서브우퍼, RCA 및 3.5mm 잭 지원', 'ACTIVE'),
('HDSMONITOR2ANC', 'Monitor 2 ANC', '개', '무선 헤드폰, 액티브 노이즈 캔슬링(ANC), 최대 45시간 재생, 폴딩 디자인', 'ACTIVE'),
('HDSMAJORV', 'Major V', '개', '블루투스 헤드폰, 최대 30시간 재생, IPX4 방수 등급, 유선 연결 가능', 'ACTIVE'),
('SPKREVOLVEPLUS2', 'Revolve+ 2', '개', '360도 사운드 포터블 스피커, 17시간 배터리, IP55 방수/방진, 블루투스 5.1', 'ACTIVE'),
('SPKMAXPORTABLE', 'Max Portable', '개', '포터블 스피커, 20시간 배터리, IP67 방수/방진, 저음 강조 기능, 블루투스 5.0', 'ACTIVE'),
('HDSQCULTRA', 'QC Ultra', '개', '무선 헤드폰, 액티브 노이즈 캔슬링(ANC), 최대 24시간 재생, 블루투스 5.1', 'ACTIVE'),
('HDSQC45', 'QC 45', '개', '무선 헤드폰, 액티브 노이즈 캔슬링(ANC), 최대 24시간 재생, 블루투스 5.0', 'ACTIVE'),
('SPK8361A', '8361AW', '개', '스튜디오 모니터 스피커, 트라이앰프 디자인, 10인치 우퍼, 150W 출력, 36Hz-20kHz 응답', 'ACTIVE'),
('SPK8050B', '8050B', '개', '스튜디오 모니터 스피커, 8인치 우퍼, 150W 출력, 35Hz-20kHz 응답', 'ACTIVE');

-- m_purchase_price 테이블 데이터 삽입
INSERT INTO PURCHASE_PRICE (PURCHASE_PRICE_ID, SUPPLIER_CODE, ITEM_CODE, PURCHASE_AMOUNT, RECEIPT_DATE, STOCK_QUANTITY) VALUES
(1, 'HK', 'SPKAURAS4BK', 289000, '2023-09-01 10:00:00', 100),
(2, 'HK', 'SPKSTICKS4BK', 399000, '2023-09-05 14:00:00', 80),
(3, 'HK', 'HADRADIANCE2400BK', 5700000, '2023-08-20 11:30:00', 20),
(4, 'HK', 'SDBCITAMB110GRAYS', 1050000, '2023-07-25 09:45:00', 30),
(5, 'BO', 'SPKBESOUNDA9', 4790000, '2023-09-10 13:00:00', 50),
(6, 'BO', 'SPKBESOUNDA5', 1690000, '2023-08-15 15:20:00', 70),
(7, 'BO', 'SPKBESOUNDBALANCE', 4290000, '2023-07-30 16:00:00', 40),
(8, 'BO', 'SPKBESOUNDEMERGE', 1250000, '2023-08-10 12:00:00', 60),
(9, 'BO', 'HDSBEPLAYEX', 459000, '2023-09-01 10:00:00', 120),
(10, 'BO', 'HDSBEPLAYHX', 759000, '2023-09-15 11:00:00', 90),
(11, 'BO', 'HDSBEPLAYH95', 1390000, '2023-08-25 09:00:00', 40),
(12, 'MS', 'SPKACTON3', 479000, '2023-08-10 13:30:00', 100),
(13, 'MS', 'SPKEMBERTON2', 289000, '2023-09-05 12:45:00', 110),
(14, 'MS', 'SPKWOBURN3', 989000, '2023-08-20 14:15:00', 70),
(15, 'MS', 'SPKSTANMORE3', 679000, '2023-09-15 15:30:00', 90),
(16, 'MS', 'HDSMONITOR2ANC', 409000, '2023-09-01 11:00:00', 100),
(17, 'MS', 'HDSMAJORV', 180000, '2023-09-20 10:30:00', 150),
(18, 'BS', 'SPKREVOLVEPLUS2', 359000, '2023-08-25 12:00:00', 100),
(19, 'BS', 'SPKMAXPORTABLE', 479000, '2023-07-30 14:00:00', 90),
(20, 'BS', 'HDSQCULTRA', 459000, '2023-09-05 13:30:00', 120),
(21, 'BS', 'HDSQC45', 319000, '2023-09-10 14:30:00', 110),
(22, 'GR', 'SPK8361A', 9800000, '2023-08-15 09:45:00', 10),
(23, 'GR', 'SPK8050B', 3590000, '2023-09-05 10:00:00', 30);

-- m_customer 테이블 데이터 삽입
INSERT INTO CUSTOMER (CUSTOMER_CODE, CUSTOMER_NAME, MANAGER, CUSTOMER_ADDRESS, CUSTOMER_PHONE, CUSTOMER_EMAIL, CUSTOMER_STATUS) VALUES
('HM', '하이마트', '서준호', '서울특별시 강남구 테헤란로 12', '02-3012-4567', 'sejun.ho@himart.co.kr', 'ACTIVE'),
('EM', '일렉트로마트', '이서연', '서울특별시 송파구 올림픽로 25', '02-5112-3421', 'seoyeon.lee@electromart.co.kr', 'ACTIVE'),
('BS', '비케이사운드', '김지후', '서울특별시 마포구 상암동 45', '02-6789-1234', 'jihu.kim@bksound.co.kr', 'ACTIVE'),
('MS', '몬스터사운드', '정하윤', '서울특별시 서초구 사임당로 23', '02-7812-2345', 'hayun.jung@monstersound.co.kr', 'ACTIVE'),
('SS', '소리샵', '최민서', '서울특별시 용산구 한강대로 88', '02-9321-8765', 'minseo.choi@sorishop.co.kr', 'ACTIVE');

-- m_sales_price 테이블 데이터 삽입
INSERT INTO SALES_PRICE (SALES_PRICE_ID, ITEM_CODE, CUSTOMER_CODE, SALES_AMOUNT, START_DATE, END_DATE) VALUES
(1, 'SPKAURAS4BK', 'HM', 339000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(2, 'SPKAURAS4BK', 'EM', 329000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(3, 'SPKSTICKS4BK', 'HM', 459000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(4, 'SPKSTICKS4BK', 'BS', 449000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(5, 'HADRADIANCE2400BK', 'SS', 6190000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(6, 'HADRADIANCE2400BK', 'EM', 6090000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(7, 'SDBCITAMB110GRAYS', 'MS', 1150000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(8, 'SDBCITAMB110GRAYS', 'HM', 1199000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(9, 'SPKBESOUNDA9', 'SS', 5399000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(10, 'SPKBESOUNDA9', 'EM', 5299000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(11, 'SPKBESOUNDA5', 'BS', 1899000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(12, 'SPKBESOUNDA5', 'HM', 1799000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(13, 'SPKBESOUNDBALANCE', 'MS', 4799000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(14, 'SPKBESOUNDBALANCE', 'SS', 4699000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(15, 'SPKBESOUNDEMERGE', 'BS', 1299000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(16, 'SPKBESOUNDEMERGE', 'EM', 1279000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(17, 'HDSBEPLAYEX', 'HM', 509000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(18, 'HDSBEPLAYEX', 'MS', 499000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(19, 'HDSBEPLAYHX', 'EM', 819000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(20, 'HDSBEPLAYHX', 'SS', 809000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(21, 'SPKWOBURN3', 'MS', 1115000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(22, 'SPKWOBURN3', 'HM', 1065000, '2023-09-01 00:00:00', '9999-12-31 23:59:59'),
(23, 'SPKSTANMORE3', 'BS', 759000, '2023-09-01 00:00:00', '9999-12-31 23:59:59');

-- t_member 테이블 데이터 삽입
INSERT INTO MEMBER (MEMBER_ID, MEMBER_NAME, PASSWORD, POSITION, DEPARTMENT, MEMBER_STATUS) VALUES
('SLS001', '은하늘', '{bcrypt}$2b$12$xj.fPghO59mXgqQHQ91WSOC2VIcNSYlx1C/aJDTbUcXEjDzWkRdJW', '팀장', '영업4팀', 'ACTIVE'),
('SLS002', '박원일', '{bcrypt}$2b$12$FXzdhsipwWq7SH1shJgIXuBLF2x8HrkKAHiVtBExejgwsJBp5TcFW', '사원', '영업4팀', 'ACTIVE'),
('SLS003', '고경범', '{bcrypt}$2b$12$rtb5g6wdJfJ64My3BdwXsecJRTVJIvEPRINgPZb2vEM.s/tN4gkbm', '사원', '영업4팀', 'ACTIVE'),
('SLS004', '황해진', '{bcrypt}$2b$12$r6jVgPJ8nF8PjsCe.cOpIeMI5rDem.dFtboS0elja1Lkph6qASEL2', '사원', '영업4팀', 'ACTIVE'),
('SLS005', '옥성민', '{bcrypt}$2b$12$PHIB4XXYHRFSc/ge05/VVOTZge.mx0yp6XBoYcEuUXopQQrtpEsSS', '사원', '영업4팀', 'ACTIVE');

-- t_member_permissions 테이블 데이터 삽입 (권한 정보)
INSERT INTO MEMBER_PERMISSIONS (MEMBER_MEMBER_ID, PERMISSIONS) VALUES
('SLS001', 'TL'),
('SLS001', 'TM'),
('SLS002', 'TM'),
('SLS003', 'TM'),
('SLS004', 'TM'),
('SLS005', 'TM');