"use client";
import { useEffect, useState, useRef, useCallback } from "react";
// SearchBar 컴포넌트
export default function SearchBar({
  endpoint,
  onSearchResults,
  relatedWords,
}: {
  endpoint: string; //api endpoint
  onSearchResults: (results: any) => void; //검색 결과를 전달하는 콜백 함수
  relatedWords?: string[]; // 연관 단어 목록
}) {
  const dropdownRef = useRef<HTMLUListElement | null>(null); // 드롭다운 요소를 참조하기 위한 ref
  const [searchInput, setSearchInput] = useState<string>(""); // 사용자가 입력한 검색어
  const [mostSimilarWords, setMostSimilarWords] = useState<string[]>([]); // 연관 단어 중 가장 비슷한 단어 목록

  // 검색어가 변경될 때마다 searchInput값을 갱신하는 함수 정의
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    []
  );

  // 연관 단어 목록에서 비슷한 단어 N개를 찾아서 반환하는 함수 정의
  const findMostSimilarWords = useCallback(
    (length: number) => {
      if (relatedWords === undefined || relatedWords === null) return;

      const input = searchInput.trim().toUpperCase();
      let topNWords: string[] = [];
      const words = relatedWords;
      if (words.length === 0) return topNWords;

      for (const word of words) {
        if (word.toUpperCase().startsWith(input)) {
          topNWords.push(word);
        }
        if (topNWords.length === length) break;
      }
      console.log(topNWords);
      return topNWords;
    },
    [searchInput, relatedWords]
  );

  // 검색 단어가 변경될 때마다 비슷한 단어 N개를 찾는 useEffect
  useEffect(() => {
    if (relatedWords === undefined || relatedWords === null) return;
    if (searchInput.length > 0) {
      console.log(searchInput);
      const mostSimilarWebsite = findMostSimilarWords(5); // 유사한 웹사이트 이름 5개 찾기
      setMostSimilarWords(mostSimilarWebsite ?? []);
    } else {
      setMostSimilarWords([]); // searchInput이 비어 있으면 유사한 웹사이트 목록 비우기
    }
  }, [searchInput, relatedWords, findMostSimilarWords]);

  // 드롭다운 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMostSimilarWords([]); // 외부 클릭 시 드롭다운 숨기기
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 검색어가 변경될 때 마다 가장 비슷한 이름의 검색결과를 상위 컴포넌트의 핸들러로 전달하는 useEffect
  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await fetch(`${endpoint}?name=${mostSimilarWords[0]}`); // 검색어를 포함한 api endpoint로 요청=>의존성 주의
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        onSearchResults(data);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    }

    //디바운싱을 적용하여 검색어가 변경될 때마다 fetchSearchResults 호출
    if (mostSimilarWords.length === 0) {
      return;
    }

    const debouncedSearch = setTimeout(() => {
      fetchSearchResults();
    }, 700);
    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [mostSimilarWords, endpoint, onSearchResults]);

  return (
    <form className="max-w-md mx-auto my-8">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="웹사이트 이름이나 주소(URL)을 적어주세요..."
          value={searchInput}
          onChange={handleInputChange}
          required
        />
        {/* mostSimilarWebsites dropdown */}
        {searchInput.length > 0 && mostSimilarWords.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-600"
          >
            {mostSimilarWords.map((websiteName, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setSearchInput(websiteName);
                  setMostSimilarWords([]);
                }}
              >
                {websiteName}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            e.preventDefault(); // form submit 방지
            setMostSimilarWords([]); // 검색 버튼 클릭 시 드롭다운 숨기기
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
