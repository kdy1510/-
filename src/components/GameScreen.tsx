import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Car as Cards, Trophy, ChevronRight, GraduationCap, Home, ArrowLeft, Clock, CheckCircle2, XCircle, Pause, Play } from 'lucide-react';

// Game Data with English translations
const WORD_SETS = [
  { word: "사과", english: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6", answers: ["사과", "바나나", "포도", "오렌지"] },
  { word: "고양이", english: "Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", answers: ["고양이", "고양이", "토끼", "햄스터"] },
  { word: "자동차", english: "Car", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70", answers: ["자동차", "자전거", "기차", "버스"] },
  { word: "책", english: "Book", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6", answers: ["책", "잡지", "신문", "노트"] },
  { word: "커피", english: "Coffee", image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e", answers: ["커피", "차", "주스", "물"] },
  { word: "컴퓨터", english: "Computer", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", answers: ["컴퓨터", "태블릿", "휴대폰", "시계"] },
  { word: "바다", english: "Sea", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", answers: ["바다", "산", "강", "호수"] },
  { word: "꽃", english: "Flower", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", answers: ["꽃", "나무", "풀", "잎"] },
  { word: "달", english: "Moon", image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d", answers: ["달", "해", "별", "구름"] },
  { word: "비행기", english: "Airplane", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05", answers: ["비행기", "헬리콥터", "배", "로켓"] },
  { word: "피아노", english: "Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0", answers: ["피아노", "기타", "드럼", "바이올린"] },
  { word: "카메라", english: "Camera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32", answers: ["카메라", "전화기", "라디오", "텔레비전"] },
  { word: "우산", english: "Umbrella", image: "https://images.pexels.com/photos/1451040/pexels-photo-1451040.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["우산", "모자", "장갑", "선글라스"] },
  { word: "시계", english: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", answers: ["시계", "반지", "목걸이", "팔찌"] },
  { word: "의자", english: "Chair", image: "https://images.unsplash.com/photo-1503602642458-232111445657", answers: ["의자", "책상", "침대", "소파"] },
  { word: "모자", english: "Hat", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee", answers: ["모자", "신발", "가방", "벨트"] },
  { word: "연필", english: "Pencil", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd", answers: ["연필", "펜", "마커", "크레용"] },
  { word: "지갑", english: "Wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93", answers: ["지갑", "가방", "백팩", "파우치"] },
  { word: "신발", english: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", answers: ["신발", "샌들", "부츠", "슬리퍼"] },
  { word: "안경", english: "Glasses", image: "https://images.unsplash.com/photo-1483412468200-72182dbbc544", answers: ["안경", "콘택트렌즈", "선글라스", "고글"] },
  { word: "치즈", english: "Cheese", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d", answers: ["치즈", "버터", "요구르트", "우유"] },
  { word: "피자", english: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591", answers: ["피자", "햄버거", "샌드위치", "파스타"] },
  { word: "아이스크림", english: "Ice Cream", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f", answers: ["아이스크림", "케이크", "쿠키", "초콜릿"] },
  { word: "기타", english: "Guitar", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1", answers: ["기타", "피아노", "드럼", "바이올린"] },
  { word: "축구공", english: "Soccer Ball", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db", answers: ["축구공", "농구공", "야구공", "테니스공"] },
  { word: "노트북", english: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", answers: ["노트북", "태블릿", "스마트폰", "데스크톱"] },
  { word: "비누", english: "Soap", image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f", answers: ["비누", "샴푸", "로션", "치약"] },
  { word: "열쇠", english: "Key", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509", answers: ["열쇠", "자물쇠", "카드", "리모컨"] },
  { word: "우유", english: "Milk", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150", answers: ["우유", "주스", "물", "커피"] },
  { word: "빵", english: "Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff", answers: ["빵", "케이크", "쿠키", "도넛"] },
  { word: "강아지", english: "Dog", image: "https://images.unsplash.com/photo-1577894899370-46a67340e0e6", answers: ["강아지", "고양이", "햄스터", "토끼"] },
  { word: "코끼리", english: "Elephant", image: "https://images.unsplash.com/photo-1563648535-1c9545386988", answers: ["코끼리", "기린", "사자", "호랑이"] },
  { word: "포도", english: "Grapes", image: "https://images.unsplash.com/photo-1610816482555-424a758c6393", answers: ["포도", "사과", "바나나", "오렌지"] },
  { word: "집", english: "House", image: "https://images.unsplash.com/photo-1568605114967-8dd3659166a5", answers: ["집", "아파트", "빌딩", "오두막"] },
  { word: "섬", english: "Island", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8c62", answers: ["섬", "반도", "해변", "산"] },
  { word: "주전자", english: "Kettle", image: "https://images.unsplash.com/photo-1616497999794-4683ff580993", answers: ["주전자", "컵", "냄비", "프라이팬"] },
  { word: "레몬", english: "Lemon", image: "https://images.pexels.com/photos/952365/pexels-photo-952365.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["레몬", "라임", "오렌지", "자몽"] },
  { word: "지도", english: "Map", image: "https://images.unsplash.com/photo-1541544741903-0a0e39a92c18", answers: ["지도", "나침반", "지구본", "책"] },
  { word: "목걸이", english: "Necklace", image: "https://images.unsplash.com/photo-1526344023409-4b170941b819", answers: ["목걸이", "팔찌", "반지", "귀걸이"] },
  { word: "올리브", english: "Olive", image: "https://images.unsplash.com/photo-1608889477445-b15f15f135d1", answers: ["올리브", "피클", "케첩", "마요네즈"] },
  { word: "펭귄", english: "Penguin", image: "https://images.unsplash.com/photo-1570146459575-0b347a568ca4", answers: ["펭귄", "갈매기", "펠리컨", "오리"] },
  { word: "퀼트", english: "Quilt", image: "https://images.unsplash.com/photo-1543236273-c4484049990d", answers: ["퀼트", "담요", "베개", "커튼"] },
  { word: "무지개", english: "Rainbow", image: "https://images.unsplash.com/photo-1547036967-23d11a040463", answers: ["무지개", "구름", "태양", "비"] },
  { word: "딸기", english: "Strawberry", image: "https://images.unsplash.com/photo-1600828981944-7439a6584a8e", answers: ["딸기", "블루베리", "라즈베리", "체리"] },
  { word: "탁자", english: "Table", image: "https://images.pexels.com/photos/2451264/pexels-photo-2451264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", answers: ["탁자", "의자", "소파", "침대"] },
  { word: "우산", english: "Umbrella", image: "https://images.unsplash.com/photo-1519183071296-a7bca2d864a9", answers: ["우산", "모자", "장갑", "스카프"] },
  { word: "바이올린", english: "Violin", image: "https://images.unsplash.com/photo-1524594160378-d864e298266f", answers: ["바이올린", "첼로", "기타", "피아노"] },
  { word: "고래", english: "Whale", image: "https://images.unsplash.com/photo-1564995249384-6ff4714b939f", answers: ["고래", "돌고래", "상어", "물개"] },
  { word: "자일", english: "Xylophone", image: "https://images.unsplash.com/photo-1576778334274-e0929f620a6c", answers: ["자일", "피아노", "드럼", "기타"] },
  { word: "요트", english: "Yacht", image: "https://images.unsplash.com/photo-1549057444-558f75c6ca28", answers: ["요트", "배", "보트", "카누"] },
  { word: "얼룩말", english: "Zebra", image: "https://images.unsplash.com/photo-1598752085214-999654096464", answers: ["얼룩말", "말", "당나귀", "노새"] },
  { word: "앵무새", english: "Parrot", image: "https://images.unsplash.com/photo-1544733432-17d492127650", answers: ["앵무새", "까치", "비둘기", "참새"] },
  { word: "수박", english: "Watermelon", image: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["수박", "멜론", "참외", "딸기"] },
  { word: "망고", english: "Mango", image: "https://images.unsplash.com/photo-1559282247-bca891a2988a", answers: ["망고", "사과", "바나나", "오렌지"] },
  { word: "체리", english: "Cherry", image: "https://images.unsplash.com/photo-1613003994795-c6b2c5394a3a", answers: ["체리", "딸기", "포도", "블루베리"] },
  { word: "자전거", english: "Bicycle", image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["자전거", "오토바이", "자동차", "스쿠터"] },
  { word: "버스", english: "Bus", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957", answers: ["버스", "기차", "택시", "지하철"] },
  { word: "기차", english: "Train", image: "https://images.unsplash.com/photo-1557070871-b30254819489", answers: ["기차", "버스", "비행기", "배"] },
  { word: "헬리콥터", english: "Helicopter", image: "https://images.unsplash.com/photo-1549692520-e094865270e4", answers: ["헬리콥터", "비행기", "로켓", "드론"] },
  { word: "배", english: "Ship", image: "https://images.unsplash.com/photo-1568952433714-38a9f183e934", answers: ["배", "보트", "요트", "카누"] },
  { word: "로켓", english: "Rocket", image: "https://images.unsplash.com/photo-1633871478606-d617c5f5a917", answers: ["로켓", "비행기", "헬리콥터", "드론"] },
  { word: "드론", english: "Drone", image: "https://images.pexels.com/photos/31554760/pexels-photo-31554760.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["드론", "헬리콥터", "비행기", "로켓"] },
  { word: "스쿠터", english: "Scooter", image: "https://images.unsplash.com/photo-1587766931554-991055943843", answers: ["스쿠터", "자전거", "오토바이", "자동차"] },
  { word: "오토바이", english: "Motorcycle", image: "https://images.pexels.com/photos/34006/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200", answers: ["오토바이", "자전거", "스쿠터", "자동차"] },
  { word: "택시", english: "Taxi", image: "https://images.unsplash.com/photo-1562322940-f21ef8160cf5", answers: ["택시", "버스", "지하철", "기차"] },
  { word: "지하철", english: "Subway", image: "https://images.unsplash.com/photo-1559548339-e5c199e4b876", answers: ["지하철", "버스", "기차", "택시"] },
  { word: "보트", english: "Boat", image: "https://images.unsplash.com/photo-1505233330874-b15c9fa19534", answers: ["보트", "배", "요트", "카누"] },
  { word: "카누", english: "Canoe", image: "https://images.unsplash.com/photo-1534336252449-a14c157a8c62", answers: ["카누", "보트", "배", "요트"] },
  { word: "냉장고", english: "Refrigerator", image: "https://media.istockphoto.com/id/928066156/ko/%EC%82%AC%EC%A7%84/%EB%B6%80%EC%97%8E%EC%97%90%EC%84%9C-%EC%97%B4%EB%A6%B0-%EB%83%89%EC%9E%A5%EA%B3%A0.jpg?s=612x612&w=0&k=20&c=l6gj0jH5ljnrwd78G6fxyRHS5sPUa6sCbnxNcJhdmQ8=", answers: ["냉장고", "오븐", "전자레인지", "식기세척기"] },
  { word: "세탁기", english: "Washing Machine", image: "https://images.unsplash.com/photo-1616238494264-39b4cb393430", answers: ["세탁기", "건조기", "다리미", "청소기"] },
  { word: "텔레비전", english: "Television", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", answers: ["텔레비전", "컴퓨터", "태블릿", "스마트폰"] },
  { word: "에어컨", english: "Air Conditioner", image: "https://images.unsplash.com/photo-1628876247299-a4965f44911d", answers: ["에어컨", "선풍기", "히터", "가습기"] },
  { word: "선풍기", english: "Fan", image: "https://images.unsplash.com/photo-1566649365424-1e5596ef64a4", answers: ["선풍기", "에어컨", "히터", "가습기"] },
  { word: "히터", english: "Heater", image: "https://images.pexels.com/photos/12034871/pexels-photo-12034871.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["히터", "에어컨", "선풍기", "가습기"] },
  { word: "가습기", english: "Humidifier", image: "https://images.unsplash.com/photo-1617187444879-8499013e9509", answers: ["가습기", "에어컨", "선풍기", "히터"] },
  { word: "청소기", english: "Vacuum Cleaner", image: "https://images.unsplash.com/photo-1606325497488-693c0a91b248", answers: ["청소기", "세탁기", "건조기", "다리미"] },
  { word: "다리미", english: "Iron", image: "https://images.unsplash.com/photo-1581093455643-a922342a7c64", answers: ["다리미", "세탁기", "건조기", "청소기"] },
  { word: "건조기", english: "Dryer", image: "https://images.unsplash.com/photo-1613084755984-e5f99306c4b7", answers: ["건조기", "세탁기", "다리미", "청소기"] },
  { word: "전자레인지", english: "Microwave", image: "https://images.unsplash.com/photo-1571173059465-898ff3994591", answers: ["전자레인지", "냉장고", "오븐", "식기세척기"] },
  { word: "오븐", english: "Oven", image: "https://images.unsplash.com/photo-1556911220-37790041048c", answers: ["오븐", "냉장고", "전자레인지", "식기세척기"] },
  { word: "식기세척기", english: "Dishwasher", image: "https://media.istockphoto.com/id/2188075668/ko/%EC%82%AC%EC%A7%84/front-view-from-female-hand-removing-clean-plate-from-a-loaded-dishwasher-background-of-modern.jpg?s=2048x2048&w=is&k=20&c=JwMa8amcqyjI5m1jJA5BbEAfuDFUvKU1eYxUAKxBj3A=", answers: ["식기세척기", "냉장고", "오븐", "전자레인지"] },
  { word: "커튼", english: "Curtain", image: "https://images.unsplash.com/photo-1535982355018-15aa623b9cd6", answers: ["커튼", "블라인드", "카펫", "벽지"] },
  { word: "블라인드", english: "Blinds", image: "https://images.pexels.com/photos/851238/pexels-photo-851238.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["블라인드", "커튼", "카펫", "벽지"] },
  { word: "카펫", english: "Carpet", image: "https://images.unsplash.com/photo-1524635170325-461a49f23d48", answers: ["카펫", "커튼", "블라인드", "벽지"] },
  { word: "벽지", english: "Wallpaper", image: "https://images.unsplash.com/photo-1559599798-f1945556567f", answers: ["벽지", "커튼", "블라인드", "카펫"] },
  { word: "거울", english: "Mirror", image: "https://images.unsplash.com/photo-1588335727783-999b2f9f71d2", answers: ["거울", "액자", "시계", "램프"] },
  { word: "액자", english: "Frame", image: "https://images.unsplash.com/photo-1513545044669-939547898130", answers: ["액자", "거울", "시계", "램프"] },
  { word: "램프", english: "Lamp", image: "https://images.unsplash.com/photo-1513161455076-d55f986c5344", answers: ["램프", "거울", "액자", "시계"] },
  { word: "소파", english: "Sofa", image: "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["소파", "의자", "침대", "탁자"] },
  { word: "침대", english: "Bed", image: "https://images.unsplash.com/photo-1554999520-c1e498fa0522", answers: ["침대", "소파", "의자", "탁자"] },
  { word: "책상", english: "Desk", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd", answers: ["책상", "의자", "컴퓨터", "램프"] },
  { word: "옷장", english: "Wardrobe", image: "https://images.unsplash.com/photo-1576355488774-982d2449599a", answers: ["옷장", "서랍장", "침대", "소파"] },
  { word: "서랍장", english: "Drawer", image: "https://images.unsplash.com/photo-1572199448260-5815819835c4", answers: ["서랍장", "옷장", "침대", "소파"] },
  { word: "화분", english: "Flowerpot", image: "https://images.unsplash.com/photo-1587330774474-9e9c513c4510", answers: ["화분", "꽃", "나무", "잔디"] },
  { word: "나무", english: "Tree", image: "https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["나무", "꽃", "화분", "잔디"] },
  { word: "잔디", english: "Grass", image: "https://images.pexels.com/photos/53504/grass-rush-juicy-green-53504.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["잔디", "꽃", "화분", "나무"] },
  { word: "울타리", english: "Fence", image: "https://images.unsplash.com/photo-1519182884243-488245ef1186", answers: ["울타리", "문", "벽", "지붕"] },
  { word: "문", english: "Door", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad", answers: ["문", "울타리", "벽", "지붕"] },
  { word: "벽", english: "Wall", image: "https://images.unsplash.com/photo-1493246572744-d379e9a743ca", answers: ["벽", "울타리", "문", "지붕"] },
  { word: "지붕", english: "Roof", image: "https://images.unsplash.com/photo-1551523859-69876f1542ca", answers: ["지붕", "울타리", "문", "벽"] },
  { word: "계단", english: "Stairs", image: "https://images.unsplash.com/photo-1509822988509-9cd8c7a1cd49", answers: ["계단", "엘리베이터", "에스컬레이터", "경사로"] },
  { word: "엘리베이터", english: "Elevator", image: "https://images.pexels.com/photos/407423/pexels-photo-407423.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["엘리베이터", "계단", "에스컬레이터", "경사로"] },
  { word: "에스컬레이터", english: "Escalator", image: "https://images.pexels.com/photos/31610406/pexels-photo-31610406.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["에스컬레이터", "계단", "엘리베이터", "경사로"] },
  { word: "수영장", english: "Swimming Pool", image: "https://images.unsplash.com/photo-1516455660949-ca26e5fc5665", answers: ["수영장", "바다", "강", "호수"] },
  { word: "강", english: "River", image: "https://images.pexels.com/photos/158489/yellowstone-national-park-sunset-twilight-dusk-158489.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["강", "수영장", "바다", "호수"] },
  { word: "호수", english: "Lake", image: "https://images.pexels.com/photos/619950/pexels-photo-619950.jpeg?auto=compress&cs=tinysrgb&w=1200", answers: ["호수", "수영장", "바다", "강"] },
  { word: "하늘", english: "Sky", image: "https://images.unsplash.com/photo-1504609773093-245cb195a0fd", answers: ["하늘", "구름", "태양", "별"] }
];

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(() => Math.floor(Math.random() * WORD_SETS.length)); // Random start
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gamePanelRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const [level, setLevel] = useState(1); // 레벨 상태 추가
  const [questionsInLevel, setQuestionsInLevel] = useState(0); // 레벨별 문제 수
  const questionsPerLevel = 10; // 레벨당 문제 수
  const baseTimeLimit = 60; // 기본 시간 제한
  const minTimeLimit = 20; // 최소 시간 제한

  const currentWordSet = WORD_SETS[currentWordIndex];

  // 레벨에 따른 시간 제한 계산 함수
  const calculateTimeLimit = () => {
    const timeLimit = baseTimeLimit - (level - 1) * 5;
    return Math.max(minTimeLimit, timeLimit);
  };

  useEffect(() => {
    if (currentWordSet) {
      const answers = [...new Set([...currentWordSet.answers, currentWordSet.word])];
      const shuffled = answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      setTimeLeft(calculateTimeLimit()); // 레벨별 시간 제한 적용
      setKey(prevKey => prevKey + 1);
    }
  }, [currentWordSet, level]); // level dependency 추가

  useEffect(() => {
    if (!isPaused) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else {
        setIsCorrect(false);
        setTimeout(() => {
          handleNextWord();
        }, 1000);
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isPaused]);

  const handleAnswer = (selectedAnswer: string) => {
    if (!isPaused) {
      const correct = selectedAnswer === currentWordSet.word;
      setIsCorrect(correct);
      if (correct) {
        // 레벨별 점수 계산
        let levelScore = 0;
        if (level === 1) levelScore = 5;
        else if (level === 2) levelScore = 10;
        else levelScore = 15;
        setScore(score + levelScore);
      }
      clearTimeout(timerRef.current as NodeJS.Timeout);
      setTimeout(() => {
        handleNextWord();
      }, 1000);
    }
  };

  const handleNextWord = () => {
    setIsCorrect(null);
    setQuestionsInLevel(questionsInLevel + 1); // 문제 수 증가

    if (questionsInLevel >= questionsPerLevel - 1) {
      // 레벨 클리어
      setLevel(level + 1);
      setQuestionsInLevel(0); // 레벨별 문제 수 초기화
      alert(`Level ${level} Clear!`); // 레벨업 알림 (추후 UI로 변경)
    }

    setCurrentWordIndex(Math.floor(Math.random() * WORD_SETS.length));
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const progressVariants = {
    initial: { width: '100%' },
    animate: {
      width: '0%',
      transition: {
        duration: timeLeft,
        ease: 'linear',
        // paused 상태에 따라 animationPlayState 제어
        animationPlayState: isPaused ? 'paused' : 'running'
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-screen bg-game-background p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 left-4 z-10">
        <button onClick={() => navigate('/menu')} className="game-button">
          <ArrowLeft className="mr-2 inline-block h-5 w-5" /> Menu
        </button>
        <br />
        <hr className="w-24 border-t border-gray-300"/>
      </div>

      <div className="mt-16 w-full max-w-md px-4" > {/* mt-12 -> mt-16 for more space */}
      </div>

      <div ref={gamePanelRef} className="game-ui-panel relative w-full max-w-md mt-8" style={{minHeight: 'calc(100vh - 120px)'}}>
				<div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            key={key}
            className="h-full bg-accent rounded-full"
            variants={progressVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: timeLeft, ease: 'linear' }}
          />
        </div>

        <div className="flex justify-between items-center mt-6 px-4">
          <div className="text-xl font-bold">Score: {score}</div>
          <div className="text-xl font-bold">Time: {timeLeft}</div>
        </div>

        <div className="mt-4 p-4 flex justify-center"> {/* Center the image */}
          {currentWordSet?.image && (
            <img
              src={currentWordSet.image}
              alt={currentWordSet.english}
              className="rounded-2xl max-w-full h-auto max-h-96 object-contain"
              style={{ maxHeight: '384px' }}
            />
          )}
        </div>

        <div className="mt-4 text-center text-3xl font-bold">{currentWordSet?.english}</div> {/* Moved below image area and reduced mt */}

        <div className="grid grid-cols-2 gap-4 mt-8 p-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              className={`game-button text-lg ${isCorrect === true && answer === currentWordSet?.word ? 'animate-pulse-correct' : ''} ${isCorrect === false && answer === currentWordSet?.word ? 'animate-pulse-incorrect' : ''}`}
              onClick={() => handleAnswer(answer)}
              disabled={isCorrect !== null || isPaused}
            >
              {answer}
            </button>
          ))}
        </div>

        <button className="game-button mt-8 w-full text-lg" onClick={togglePause}>
          {isPaused ? (
            <>
              <Play className="mr-2 inline-block h-5 w-5" /> Resume
            </>
          ) : (
            <>
              <Pause className="mr-2 inline-block h-5 w-5" /> Pause
            </>
          )}
        </button>
        {isCorrect !== null && (
          <AnimatePresence>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-6 shadow-lg z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isCorrect ? (
                <div className="flex items-center text-green-600 text-xl">
                  <CheckCircle2 className="h-8 w-8 mr-2" /> Correct!
                </div>
              ) : (
                <div className="flex items-center text-red-600 text-xl">
                  <XCircle className="h-8 w-8 mr-2" /> Incorrect!
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default GameScreen;
