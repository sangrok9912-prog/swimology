/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Subject {
  title: string;
  hours1: number;
  hours2: number;
  topics: string[];
}

export interface QuizQuestionSample {
  question: string;
  answer: string;
}

export interface QuestionBankSubject {
  id: string;
  chapter: number;
  title: string;
  range: string;
  totalQuestions: number;
  keywords: string[];
  pdfUrl: string;
  samples: QuizQuestionSample[];
  iconName: 'rescue' | 'first-aid' | 'gear' | 'law' | 'teaching' | 'attitude' | 'emergency' | 'survival';
}

export const QUESTION_BANK_DATA: QuestionBankSubject[] = [
  {
    id: 'chapter-1',
    chapter: 1,
    title: '수상구조사의 자세',
    range: '1~25번',
    totalQuestions: 25,
    keywords: ['윤리 의식', '수상구조사 의무', '정신 자세'],
    iconName: 'attitude',
    samples: [
      { question: '수상구조사의 가장 기본적인 덕목은?', answer: '봉사정신과 생명 존중의 태도' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1g12Miv3kpzZwfrIszVcahMQhf1SUMhex'
  },
  {
    id: 'chapter-2',
    chapter: 2,
    title: '조난사고의 이해',
    range: '26~100번',
    totalQuestions: 75,
    keywords: ['사고 분석', '조난 원인', '구조 체계'],
    iconName: 'emergency',
    samples: [
      { question: '수난사고의 3대 요인은?', answer: '인적 요인, 환경적 요인, 시설적 요인' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1ccP2bT3th5jsylcXjL_RE3j3eY6uE5t5'
  },
  {
    id: 'chapter-3',
    chapter: 3,
    title: '관련 법령',
    range: '101~150번',
    totalQuestions: 50,
    keywords: ['수상레저안전법', '해수욕장법', '과태료 규정'],
    iconName: 'law',
    samples: [
      { question: '수상구조사 자격의 정지 사유는?', answer: '관련 법령 위반 및 품위 손상 행위 등' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1umo0NfEW9mduNWI6R-v7EcI1QJOwiGK_'
  },
  {
    id: 'chapter-4',
    chapter: 4,
    title: '응급처치',
    range: '151~250번',
    totalQuestions: 100,
    keywords: ['CPR', 'AED', '대량 출혈', '쇼크'],
    iconName: 'first-aid',
    samples: [
      { question: '골절 환자 응급처치의 기본 원칙은?', answer: '부상 부위 고정 및 쇼크 예방' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1cXGmvysrfc8KvocL1OvRTiQE_gvi_Vaj'
  },
  {
    id: 'chapter-5',
    chapter: 5,
    title: '구조기술',
    range: '251~375번',
    totalQuestions: 125,
    keywords: ['구조영법', '수영구조', '장비구조', '부상자구조'],
    iconName: 'rescue',
    samples: [
      { question: '구조대상자 운반 시 얼굴 방향은?', answer: '항상 수면 위로 노출되도록 유지' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1Uu8EidvtBalg8XzcrF3JoGAXQS-eZOEj'
  },
  {
    id: 'chapter-6',
    chapter: 6,
    title: '지도자의 자질',
    range: '376~450번',
    totalQuestions: 75,
    keywords: ['교육 지도', '안전 관리', '지도자 도덕성'],
    iconName: 'teaching',
    samples: [
      { question: '지도자로서 가장 중요한 역할은?', answer: '정확한 기술 전수 및 철저한 안전 감독' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=1U7p1R9wbCAkE5UvagvOyNBDoW0JFVGzu'
  },
  {
    id: 'chapter-7',
    chapter: 7,
    title: '생존수영',
    range: '451~500번',
    totalQuestions: 50,
    keywords: ['부유 유지', '이함 체험', '생존 영법'],
    iconName: 'survival',
    samples: [
      { question: '생존수영의 주된 목적은?', answer: '에너지를 최소화하며 체온 유지 및 구조 대기' }
    ],
    pdfUrl: 'https://drive.google.com/uc?export=download&id=18KzU7NsoFOdwfy0tMvVFJydR_aLlRoT5'
  }
];

export interface CurriculumDetail {
  id: string;
  name: string;
  summary: string;
  pdfUrl: string;
  subjects: Subject[];
}

export const CURRICULUM_DATA: CurriculumDetail[] = [
  {
    id: '1-class',
    name: '1급 수상구조사',
    summary: '전문 인명구조 역량을 갖춘 심화 과정 총 64시간',
    pdfUrl: '#',
    subjects: [
      { 
        title: '수상구조사의 자세', 
        hours1: 2, 
        hours2: 2, 
        topics: ['수상구조사의 임무와 책임', '수상구조사의 자질과 정신'] 
      },
      { 
        title: '조난사고의 이해', 
        hours1: 8, 
        hours2: 4, 
        topics: ['재난상황의 이해', '수난사고 다발지역 분석', '해양환경 및 수상일반', '순찰 활동 계획 수립 및 점검', '사고 대응 및 의사결정'] 
      },
      { 
        title: '관련 법령', 
        hours1: 2, 
        hours2: 2, 
        topics: ['수상에서의 수색·구조법', '선박안전법', '유선 및 도선 사업법', '수상레저안전법'] 
      },
      { 
        title: '응급처치', 
        hours1: 13, 
        hours2: 10, 
        topics: ['기본 응급처치술 CPR 및 AED', '외상환자 응급처치', '응급의료 장비 사용법'] 
      },
      { 
        title: '구조기술', 
        hours1: 31, 
        hours2: 18, 
        topics: ['구조영법 잠영, 헤드업 등', '수영구조 및 장비구조', '선상안전 및 비상대응', '부상자 구조법', '생존수영'] 
      },
      {
        title: '종합구조',
        hours1: 8,
        hours2: 4,
        topics: ['종합구조 이론 및 반복교육', '로프사용 및 매듭법 실습']
      }
    ]

  },
  {
    id: '2-class',
    name: '2급 수상구조사',
    summary: '수상 안전의 핵심 인력을 양성하는 표준 과정 총 40시간',
    pdfUrl: '#',
    subjects: [
      { 
        title: '수상구조사의 자세', 
        hours1: 2, 
        hours2: 2, 
        topics: ['수상구조사의 임무와 책임', '수상구조사의 자질과 정신'] 
      },
      { 
        title: '조난사고의 이해', 
        hours1: 8, 
        hours2: 4, 
        topics: ['재난상황의 이해', '수난사고 다발지역 분석', '해양환경 및 수상일반'] 
      },
      { 
        title: '관련 법령', 
        hours1: 2, 
        hours2: 2, 
        topics: ['수상에서의 수색·구조법', '선박안전법', '유선 및 도선 사업법', '수상레저안전법'] 
      },
      { 
        title: '응급처치', 
        hours1: 13, 
        hours2: 10, 
        topics: ['기본 응급처치술 CPR 및 AED', '외상환자 응급처치', '응급의료 장비 사용법'] 
      },
      { 
        title: '구조기술', 
        hours1: 31, 
        hours2: 18, 
        topics: ['구조영법 자유형, 평영 등', '수영구조 실습', '장비구조 레스큐튜브', '생존수영'] 
      },
      {
        title: '종합구조',
        hours1: 8,
        hours2: 4,
        topics: ['종합구조 반복교육', '매듭법 실습']
      }
    ]

  }
];

export const FULL_STANDARDS_DATA = [
  {
    category: "1. 영법",
    description: "잠영, 머리들고 자유형, 평영, 트러젠 네 종목을 각 25m씩 연속으로 실시합니다.",
    items: [
      { item: "제한 시간", class1: "1분 30초 이내", class2: "1분 50초 이내", critical: true },
      { item: "종료 시간", class1: "1분 45초 초과", class2: "2분 05초 초과", critical: true },
      { item: "잠영 부상 지점 감점", class1: "15m 미만 부상 시 -3점", class2: "15m 미만 부상 시 -3점", critical: false }
    ],
    details: [
        "잠영 25m: 수중에서 신체 모든 면이 위치해야 하며 영법 제한 없음",
        "머리들고 자유형 25m: 크롤 영법 기준, 얼굴 전면 침수 금지",
        "평영 25m: 턴 동작 후 잠영 15m 초과 금지",
        "트러젠 25m: 팔 1회에 발차기 1회 원칙, 얼굴 침수 금지"
    ],
    deductions: ["벽면 터치 미달", "코스 이탈", "정해진 영법 미준수"],
    disqualifications: ["도중 포기", "바닥 딛기", "잠영 중 구조물 잡기", "무릎 이하 수영복 외 장비 착용"]
  },
  {
    category: "2. 수영 구조",
    description: "맨몸으로 익수자에게 접근하여 안전하게 구조 및 운반하는 기술입니다.",
    items: [
      { item: "구분", class1: "겨드랑이 끌기 - 의식 있음", class2: "손목 끌기 - 의식 없음", critical: false },
      { item: "운반 영법", class1: "기본배영", class2: "횡영", critical: false }
    ],
    details: [
        "입수법: 다리 벌려 들어가기 - 시선 정면 고정, 상체 직립",
        "접근법: 머리 들고 자유형 후 수하 접근",
        "멘트 필수: 전방 요구조자 발견! 도와주세요!, 저는 수상구조사입니다"
    ],
    deductions: ["도움 요청 멘트 누락", "접근 시 익수자 시야 상실", "운반 중 얼굴 침수"],
    disqualifications: ["익수자 놓침", "경추 보호 미흡", "구조자 패닉"]
  },
  {
    category: "3. 장비 구조",
    description: "레스큐 튜브를 활용하여 익수자를 구조하고 운반하는 능력을 평가합니다.",
    items: [
      { item: "구조 방식", class1: "손목 끌기 및 횡영", class2: "뒤집기 및 기본배영", critical: false },
      { item: "의식 확인", class1: "손등 두드려 의식 확인 필수", class2: "손등 두드려 의식 확인 필수", critical: true }
    ],
    details: [
        "입수법: 다리 벌려 또는 모아 들어가기, 레스큐 튜브 45도 투척",
        "접근법: 트러젠 영법 권장",
        "체결: 튜브 버클을 익수자 가슴에 정확히 체결"
    ],
    deductions: ["튜브 투척 시 신체 접촉", "버클 체결 지연", "운반 중 튜브 이탈"],
    disqualifications: ["익수자 안면 침수 방치", "장비 분실", "코스 이탈"]
  },
  {
    category: "4. 기본 구조",
    description: "입영과 스컬링을 통해 수중에서의 기본 생존 및 구조 대기 능력을 평가합니다.",
    items: [
      { item: "입영", class1: "5분 이상 - 손목 노출", class2: "2분 이상 - 자세 위주", critical: true },
      { item: "스컬링", class1: "20초 유지", class2: "20초 유지", critical: false }
    ],
    details: [
        "입영: 손목 및 턱 선이 수면 위로 유지되어야 함",
        "스컬링: 발차기 금지, 턱 선과 양쪽 귀 침수 금지",
        "평가 범위: 2.5~3m 반경 이탈 금지"
    ],
    deductions: ["턱 선 일시 침수", "범위 이탈", "자세 불안정"],
    disqualifications: ["사물/레인 지지", "입영 중 코/입 침수", "스컬링 내 발차기 사용"]
  },
  {
    category: "5. 종합 구조 및 매듭",
    description: "경추 부상자 구조, 중량물 운반, 로프 매듭법 등을 평가합니다.",
    items: [
      { item: "중량물 운반 25m", class1: "5kg 익수자 1분 15초", class2: "3kg 익수자 1분 30초", critical: true },
      { item: "로프 매듭", class1: "5종 무작위", class2: "5종 무작위", critical: false }
    ],
    details: [
        "경추부상: 머리지지 또는 머리 턱 고정법",
        "중량물: 얼굴 전면 수면 아래 침수 금지",
        "매듭: 8자, 고정, 바른, 피셔맨, 말뚝 등 정확도 평가"
    ],
    deductions: ["매듭법 수행 시간 초과", "중량물 운반 중 멈춤", "수면 파동 과다"],
    disqualifications: ["중량물 낙하 후 방치", "경추 고정 실패", "매듭법 오작동"]
  },
  {
    category: "6. 응급처치",
    description: "심폐소생술 CPR 및 자동심장충격기 AED 사용법을 평가합니다.",
    items: [
      { item: "CPR 비율", class1: "성인 30:2", class2: "성인 30:2", critical: true },
      { item: "AED 사용", class1: "순서 및 패드 부착 정확도", class2: "순서 및 패드 부착 정확도", critical: true }
    ],
    details: [
        "압박 속도: 분당 100~120회 준수",
        "압박 깊이: 약 5cm 성인 기준",
        "인공호흡: 1초에 걸쳐 총 2회, 가슴 상승 확인"
    ],
    deductions: ["압박 위치 이탈", "인공호흡 과충전", "주변 안전 미확인"],
    disqualifications: ["압박 중단 10초 초과", "AED 조작 치명적 오류", "환자 반응 확인 누락"]
  }
];

export interface VideoItem {
  title: string;
  type: 'embed' | 'link';
  id?: string; // YouTube ID for embed
  url?: string; // External URL for link
  description?: string;
  points?: string[];
}

export interface VideoCategory {
  id: string;
  name: string;
  items: VideoItem[];
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: 'chapter1',
    name: '1. 영법',
    items: [
      { title: '잠영', type: 'embed', id: 'uhd5lBfGtIQ', description: '25m 무호흡 잠영의 핵심 기술과 감점 요인을 확인하세요.', points: ['유선형 자세 유지', '발차기 강도 조절', '중심 이동 최소화'] },
      { title: '머리 들고 자유형', type: 'embed', id: 'BVZqlqeizl8', description: '구조 대상자를 주시하며 빠르게 접근하는 필수 영법입니다.', points: ['시선 전방 고정', '높은 팔꿈치 위치', '강력한 비트 킥'] },
      { title: '평영', type: 'embed', id: 'nU0KJM2zt2M', description: '안정적인 이동과 환자 견인을 위한 평영 기술입니다.', points: ['글라이딩 타이밍', '수평 뜨기 유지', '발바닥 물 밀어내기'] },
      { title: '트러젠', type: 'embed', id: 'geRgGxE4G2Y', description: '자유형 스트로크와 평영 킥이 결합된 강력한 구조 영법입니다.', points: ['비대칭 호흡 박자', '가위차기 추진력', '피로 누적 방지'] },
      { title: '잠영 추가 학습', type: 'link', url: 'https://youtu.be/T8-JDU3asO4' },
      { title: '헤드업자유형 추가 학습', type: 'link', url: 'https://youtu.be/vzYEJwYlyyI' },
      { title: '평영 추가 학습', type: 'link', url: 'https://youtu.be/7zclcDIIqjw' },
      { title: '트러젠 추가 학습', type: 'link', url: 'https://youtu.be/n3ozJnUocT4' }
    ]
  },
  {
    id: 'chapter2',
    name: '2. 수영구조',
    items: [
      { title: '수하구조', type: 'embed', id: 'ZG_sgASjpPw', description: '물속에서 익수자의 발밑으로 접근하여 안전하게 부상시키는 기술입니다.', points: ['발밑 사각지대 접근', '겨드랑이 파지', '수면 수직 부상'] },
      { title: '앞목풀기', type: 'embed', id: 'IS_VGt1AQdg', description: '정면에서 목을 잡혔을 때의 탈출 기술입니다.', points: ['팔꿈치 관절 압박', '머리 아래로 숙이기', '탈출 후 거리 확보'] },
      { title: '뒷목풀기', type: 'embed', id: 'pzikd0au0go', description: '뒤에서 목을 잡혔을 때의 탈출 기술입니다.' },
      { title: '손목풀기', type: 'embed', id: 'DwePxEdp8E0', description: '손목을 잡혔을 때의 탈출 기술입니다.' }
    ]
  },
  {
    id: 'chapter3',
    name: '3. 장비구조',
    items: [
      { title: '1급 장비구조', type: 'embed', id: 'H7v1m3pP5vE', description: '레스큐 튜브를 이용한 1급 수준의 전문적인 장비 구조 과정입니다.' },
      { title: '2급 장비구조', type: 'embed', id: 'gWy5BYzfXns', description: '레스큐 튜브를 활용한 표준적인 구조 및 운반 가이드입니다.' }
    ]
  },
  {
    id: 'chapter4',
    name: '4. 기본구조',
    items: [
      { title: '입영', type: 'embed', id: 'Ijojb_AWPsQ', description: '수직 상태에서 손을 사용하지 않고 부력을 유지하는 핵심 기술입니다.', points: ['교차 로터리 킥', '손목 노출 유지', '허리 세워 부력 확보'] },
      { title: '스컬링', type: 'embed', id: 'XVamBaSA4yM', description: '손바닥으로 물을 저어 미세한 부력과 추진력을 만드는 기초입니다.', points: ['무한대 모양', '일정한 물의 압박', '어깨 안정성 유지'] }
    ]
  },
  {
    id: 'chapter5',
    name: '5. 종합구조',
    items: [
      { title: '경추부상자 구조', type: 'embed', id: 'mTnPTbbBvRs', description: '척추 손상 의심 환자의 수중 고정/이송법입니다.' },
      { title: '요구조자운반 기본배영', type: 'embed', id: 'DOUWQ4dY93I', description: '안정적인 배영 자세로 환자를 운반합니다.' },
      { title: '요구조자운반 횡영', type: 'embed', id: 'H8MM0yGnhYU', description: '전방 시야를 확보하며 환자를 견인하는 기술입니다.' },
      { title: '구명동의 착용법', type: 'embed', id: 'DTeXB2ZigRQ', description: '비상 상황에서 생명을 지키는 구명조끼 체결 순서입니다.' },
      { title: '퇴선방법', type: 'embed', id: '4Fj9SPeKAfw', description: '선박에서 비상 탈출 시 안전하게 뛰어드는 자세입니다.' },
      { title: '자동팽창식 구명뗏목 사용법', type: 'embed', id: 'Djgx6m5spYM' },
      { title: '스파인보드 구조', type: 'embed', id: '6PIg_D5dC5A', description: '수상 들것을 이용하여 환자를 인계하는 전 과정입니다.' },
      { title: '구명동의 착용법 추가', type: 'link', url: 'https://youtu.be/14qhWxAkNbA' },
      { title: '자동팽창식 구명뗏목 추가', type: 'link', url: 'https://youtu.be/JuZTSdfZA64' },
      { title: '퇴선방법 추가', type: 'link', url: 'https://youtu.be/CJ7MgH2XrJM' }
    ]
  },
  {
    id: 'chapter6',
    name: '6. 응급처치',
    items: [
      { title: '성인 심폐소생술 CPR', type: 'embed', id: '77YoQFffKcs', description: '성인 심정지 상황의 골든타임 사수법입니다.' },
      { title: '영아 심폐소생술 CPR', type: 'embed', id: '1-tKW_5bdVs' },
      { title: '성인 심폐소생술 추가', type: 'link', url: 'https://youtu.be/erdZSV6G5X4' },
      { title: '영아 심폐소생술 추가', type: 'link', url: 'https://youtu.be/SaKtSuf_JqI' }
    ]
  },
  {
    id: 'chapter7',
    name: '7. 로프매듭법',
    items: [
      { title: '로프매듭법 1', type: 'embed', id: '5yey1aJ5BtA', description: '수상 구조 상황에서 즉시 사용 가능한 필수 매듭 기술입니다.' },
      { title: '로프매듭법 2', type: 'embed', id: 'Mlf2w0ZkAXM' },
      { title: '로프매듭법 모음', type: 'link', url: 'https://www.youtube.com/results?search_query=수상구조사+매듭법' }
    ]
  }
];

export const NOTICES = [
  { id: 1, title: '2026년도 상반기 수상구조사 국가자격 시험 일정 안내', date: '2026.05.01' },
  { id: 2, title: '전국 공인 교육장 시설 보수 공사 및 이용 안내', date: '2026.04.15' }
];
