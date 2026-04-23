import { Activity, Gauge, GitBranch, Smartphone } from "lucide-react";

export const labs = [
  {
    slug: "gesture-sheet",
    icon: Smartphone,
    title: "Gesture Sheet",
    question: "BottomSheet를 직접 만들 때 막혔던 지점들",
    body: "Reanimated로 ToastMessage와 BottomSheet를 직접 만들면서, 단순히 아래에서 위로 올라오는 View가 아니라 전역 호출, dim 영역, 닫힘 타이밍, 화면 높이 계산까지 같이 봐야 한다는 걸 확인했습니다.",
    detail:
      "처음에는 isVisible 하나로 열고 닫으면 될 것 같았지만, 닫힐 때 애니메이션이 끝나기 전에 컴포넌트가 사라지는 문제가 있었습니다. 그래서 보여지는 상태와 실제 마운트 상태를 분리해서 관리하는 쪽으로 정리했습니다.",
    sections: [
      {
        title: "왜 직접 만들었는가",
        body: "gorhom bottom sheet 같은 안정적인 라이브러리가 있지만, Reanimated가 어떤 방식으로 값을 갱신하고 화면을 움직이는지 직접 확인하고 싶었습니다. 그래서 production-ready 컴포넌트를 만드는 것보다 overlay, 전역 호출, animation timing을 이해하는 쪽에 목적을 뒀습니다."
      },
      {
        title: "가장 크게 배운 부분",
        body: "애니메이션은 보이는 위치값만 다루는 문제가 아니었습니다. 열림 여부, 마운트 여부, content 초기화, 배경 터치 처리, 화면 높이 계산이 같이 움직여야 부자연스럽게 사라지지 않았습니다."
      }
    ],
    source: {
      label: "연결된 글",
      title: "Reanimated로 BottomSheet와 ToastMessage 만들기",
      href: "/blog/velog-React-Native-reanimated%EB%A1%9C-BottomSheet%EC%99%80-ToastMessage-%EB%A7%8C%EB%93%A4%EA%B8%B0"
    },
    notes: [
      "ToastMessage는 어디서든 호출되어야 해서 Recoil atom과 custom hook으로 전역 호출 형태를 만들었습니다.",
      "BottomSheet는 내부 content를 ReactElement로 받아서 화면마다 다른 내용을 넣을 수 있게 했습니다.",
      "Dimensions로 화면 높이를 구하고, 처음에는 화면 아래에 배치한 뒤 withTiming으로 올라오게 만들었습니다.",
      "닫을 때 바로 unmount하면 사라지는 느낌이 강해서, 닫힘 애니메이션과 상태 초기화 타이밍을 따로 봤습니다."
    ],
    tradeoffs: [
      "라이브러리를 쓰면 안정성과 접근성 처리가 더 좋지만, 직접 만들면서 overlay, mount timing, animation value의 관계를 이해할 수 있었습니다.",
      "전역 상태로 제어하면 호출은 편하지만, 여러 Toast가 겹칠 때 queue 정책이 필요해집니다.",
      "height를 고정값에 가깝게 계산하면 구현은 단순하지만, 기기별 safe area와 키보드 대응은 더 보강해야 합니다."
    ],
    next: [
      "safe area와 keyboard avoiding까지 포함한 BottomSheet로 확장",
      "Toast가 여러 번 호출될 때 queue로 순차 노출",
      "gesture handler를 붙여 drag down으로 닫기"
    ],
    learned: ["Reanimated", "mount timing", "global trigger", "overlay"],
    tags: ["React Native", "Reanimated", "BottomSheet", "Toast"]
  },
  {
    slug: "render-cost-meter",
    icon: Gauge,
    title: "Render Cost Meter",
    question: "리렌더링 글을 쓰면서 정리한 렌더 비용 체크리스트",
    body: "React 렌더링을 정리하면서, 리렌더링 자체가 문제가 아니라 어떤 상태가 어느 범위까지 다시 그리게 만드는지가 핵심이라는 쪽으로 생각이 바뀌었습니다.",
    detail:
      "처음에는 state가 바뀌면 전체 앱이 다시 그려진다고 오해하기 쉬웠습니다. 실제로는 상태를 가진 컴포넌트와 그 자식이 다시 호출되고, Context나 props 참조가 어떻게 연결되어 있는지에 따라 범위가 달라졌습니다.",
    sections: [
      {
        title: "왜 따로 정리했는가",
        body: "리렌더링은 React를 쓰면서 자주 듣는 말이지만, 막상 문제가 생기면 어디서부터 봐야 할지 애매했습니다. 그래서 Trigger, Render Phase, Commit Phase를 나누고, 실제로 어떤 컴포넌트가 다시 호출되는지 기준을 잡았습니다."
      },
      {
        title: "가장 크게 배운 부분",
        body: "성능 문제는 memo를 붙이는 것으로 바로 해결되지 않았습니다. 상태 위치, props 참조, Context 구독 범위, list key처럼 렌더링이 퍼지는 경로를 먼저 봐야 했습니다."
      }
    ],
    source: {
      label: "연결된 글",
      title: "React 렌더링 & 리렌더링",
      href: "/blog/velog-React-%EB%A6%AC%EC%97%91%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81"
    },
    notes: [
      "Trigger, Render Phase, Commit Phase를 나눠서 보니 React가 언제 계산하고 언제 DOM에 반영하는지 구분하기 쉬웠습니다.",
      "상태를 소유한 컴포넌트 기준으로 렌더링 범위를 추적하면 불필요한 memo보다 먼저 구조를 볼 수 있습니다.",
      "부모 컴포넌트가 다시 호출되면 자식도 다시 호출될 수 있어서, props 참조 안정성이 중요해집니다.",
      "Context는 편하지만 값이 자주 바뀌면 구독하는 컴포넌트가 같이 흔들릴 수 있습니다."
    ],
    tradeoffs: [
      "memo를 많이 붙이면 당장 렌더 횟수는 줄 수 있지만, 비교 비용과 코드 복잡도가 생깁니다.",
      "상태를 너무 아래로 내리면 렌더 범위는 줄지만, 형제 컴포넌트와 공유해야 할 때 구조가 꼬일 수 있습니다.",
      "Context를 쪼개면 업데이트 범위는 줄지만 Provider 구조가 많아질 수 있습니다."
    ],
    next: [
      "React DevTools Profiler로 실제 렌더 시간을 확인",
      "FlatList item 렌더링과 key 안정성 사례 추가",
      "useMemo/useCallback을 붙이기 전후의 차이를 작은 예제로 비교"
    ],
    learned: ["render phase", "commit phase", "props reference", "context"],
    tags: ["React", "Rendering", "Performance"]
  },
  {
    slug: "motion-route",
    icon: GitBranch,
    title: "Motion Route",
    question: "페이지 전환에 애니메이션을 넣을 때 먼저 정해야 하는 것",
    body: "프론트엔드에서 애니메이션은 넣는 것보다 줄이는 게 어려웠습니다. 모든 이동에 motion을 붙이면 화려해 보이지만, 사용자가 어디로 이동했는지 설명하지 못하면 오히려 산만했습니다.",
    detail:
      "목록에서 상세로 들어가는 이동, 탭 사이 이동, 뒤로 가기 이동은 성격이 다릅니다. 그래서 같은 fade를 반복하기보다 현재 화면의 depth와 다음 행동을 기준으로 움직임의 강도를 다르게 두는 쪽이 낫다고 판단했습니다.",
    sections: [
      {
        title: "왜 따로 정리했는가",
        body: "포트폴리오에 애니메이션을 많이 넣으면 처음에는 좋아 보이지만, 글을 읽는 사이트에서는 금방 산만해질 수 있었습니다. 그래서 움직임을 넣는 기준을 먼저 정리했습니다."
      },
      {
        title: "가장 크게 배운 부분",
        body: "좋은 모션은 사용자를 놀라게 하는 효과가 아니라, 지금 화면이 어떤 관계로 이동했는지 알려주는 피드백에 가까웠습니다. 그래서 섹션 진입, 카드 hover, 상세 이동을 같은 강도로 처리하지 않는 편이 낫다고 봤습니다."
      }
    ],
    source: {
      label: "연결된 구현",
      title: "포트폴리오 페이지 전환과 섹션 진입 애니메이션",
      href: "/"
    },
    notes: [
      "메인 페이지는 섹션이 아래에서 올라오는 정도로만 움직여 읽는 흐름을 방해하지 않게 했습니다.",
      "카드 hover는 y축 이동을 작게 주고, 링크 이동 자체보다 클릭 가능하다는 피드백을 주는 데 집중했습니다.",
      "상세 페이지는 정보 읽기가 우선이라 과한 등장 애니메이션을 넣지 않았습니다.",
      "prefers-reduced-motion 환경에서는 animation과 transition 시간을 사실상 제거했습니다."
    ],
    tradeoffs: [
      "움직임을 많이 넣으면 첫인상은 강해지지만, 글을 읽는 사이트에서는 금방 피로해집니다.",
      "CSS animation은 가볍고 예측 가능하지만, route 상태와 세밀하게 연결하려면 Framer Motion이 더 편합니다.",
      "hover 효과는 데스크톱에서는 좋지만 모바일에서는 의미가 약해서 기본 구조가 먼저 안정적이어야 합니다."
    ],
    next: [
      "목록에서 상세로 들어갈 때 shared layout 느낌의 전환 실험",
      "모바일에서 터치 피드백을 hover 대신 active 상태로 정리",
      "페이지별 motion 강도를 통일하는 기준 만들기"
    ],
    learned: ["motion intent", "hover feedback", "reduced motion", "route depth"],
    tags: ["Motion", "UX", "Framer Motion"]
  },
  {
    slug: "network-feedback",
    icon: Activity,
    title: "Network Feedback",
    question: "API 실패를 그냥 에러 문구로 끝내지 않기",
    body: "React Query의 queryFn 반환 실수와 공공기관 API CORS 문제를 겪으면서, 네트워크 문제는 코드보다 화면 상태 설계가 더 중요할 때가 많다고 느꼈습니다.",
    detail:
      "같은 실패라도 Promise를 return하지 않은 개발 실수, 브라우저 CORS 정책, 인증 실패, 서버 오류는 사용자가 해야 할 행동이 전부 다릅니다. 그래서 loading/error/success만으로 묶기보다 실패의 종류를 화면에서 구분해야 합니다.",
    sections: [
      {
        title: "왜 따로 정리했는가",
        body: "네트워크 에러는 화면에서는 비슷하게 보이지만 원인은 전혀 다를 수 있었습니다. React Query의 return 누락은 코드 실수였고, 공공기관 API CORS는 브라우저 정책 문제였습니다."
      },
      {
        title: "가장 크게 배운 부분",
        body: "프론트엔드에서 에러 처리는 alert 하나로 끝나는 일이 아니었습니다. 재시도할 수 있는 실패인지, 로그인으로 보내야 하는지, 프록시나 JSONP 같은 구조 변경이 필요한지 구분해야 했습니다."
      }
    ],
    source: {
      label: "연결된 글",
      title: "React Query Error / 공공기관 API CORS",
      href: "/blog/velog-React-Query-Error-Query-data-cannot-be-undefined"
    },
    notes: [
      "React Query에서 queryFn이 값을 return하지 않으면 Query data cannot be undefined가 발생했습니다.",
      "관리자 웹에서 공공기관 API를 직접 호출하려고 했을 때 CORS 때문에 axios 요청이 막혔습니다.",
      "JSONP는 CORS를 우회할 수 있었지만 전역 callback 관리와 script cleanup을 직접 처리해야 했습니다.",
      "사용자에게는 같은 에러로 보여도 개발자 입장에서는 원인과 복구 방법이 완전히 다릅니다."
    ],
    tradeoffs: [
      "JSONP는 빠르게 문제를 우회할 수 있지만, 타입 안정성과 에러 처리가 fetch보다 불편합니다.",
      "프록시 서버를 두면 구조는 깔끔하지만, 배포와 운영 관리가 추가됩니다.",
      "캐시를 길게 두면 화면은 빠르지만, 데이터 최신성에 대한 기준을 따로 잡아야 합니다."
    ],
    next: [
      "API 실패 타입별 UI 문구 분리",
      "React Query staleTime/cacheTime 기준 정리",
      "관리자 웹에서는 가능한 백엔드 프록시 구조로 정리"
    ],
    learned: ["React Query", "CORS", "JSONP", "error state"],
    tags: ["React Query", "Network", "CORS", "JSONP"]
  }
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
