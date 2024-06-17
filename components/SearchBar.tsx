"use client";
import { useEffect, useState, useRef, useCallback } from "react";

export default function SearchBar() {
  const websiteNames = useRef<string[]>([]); // 웹사이트 이름을 저장하는 배열
  const dropdownRef = useRef<HTMLUListElement | null>(null); // 드롭다운 요소를 참조하기 위한 ref

  const [searchInput, setSearchInput] = useState<string>(""); // 사용자가 입력한 검색어
  const [mostSimilarWebsites, setMostSimilarWebsites] = useState<string[]>([]); // 유사한 웹사이트 이름 목록 상태
  const [currentWebsite, setCurrentWebsite] = useState<string>(""); // 현재 검색중인 웹사이트 이름 상태

  // 사용자가 입력한 이름으로 시작하는 웹사이트 이름 5개를 찾아서 반환하는 함수
  const findMostSimilarWebsiteName = useCallback(() => {
    const input = searchInput.trim().toUpperCase();
    let top5Names: string[] = [];
    const websiteList = websiteNames.current;
    if (websiteList.length === 0) return top5Names;
    for (const websiteName of websiteList) {
      if (websiteName.toUpperCase().startsWith(input)) {
        top5Names.push(websiteName);
      }
      if (top5Names.length === 5) break;
    }
    console.log(top5Names);
    return top5Names;
  }, [searchInput]);

  // 검색 입력값이 변경될 때마다 searchInput(state)을 갱신하는 함수
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    []
  );

  // 웹사이트 이름 목록을 서버로부터 받아서 반환하는 함수, 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    async function fetchWebsiteNames() {
      try {
        const response = await fetch(`/api/website-names`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        websiteNames.current = data.map(
          (record: { website_name: string }) => record.website_name
        );
        console.log(websiteNames.current);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    }
    fetchWebsiteNames();
  }, []);

  // 검색 입력값이 변경될 때마다 유사한 웹사이트 이름을 찾는 useEffect
  useEffect(() => {
    if (searchInput.length > 0) {
      console.log(searchInput);
      const mostSimilarWebsite = findMostSimilarWebsiteName();
      setMostSimilarWebsites(mostSimilarWebsite);
    } else {
      setMostSimilarWebsites([]); // searchInput이 비어 있으면 유사한 웹사이트 목록 비우기
    }
  }, [searchInput, findMostSimilarWebsiteName]);

  // 드롭다운 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMostSimilarWebsites([]); // 외부 클릭 시 드롭다운 숨기기
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="웹사이트 이름이나 주소(URL)을 적어주세요..."
          value={searchInput}
          onChange={handleInputChange}
          required
        />
        {/* mostSimilarWebsites dropdown */}
        {searchInput.length > 0 && mostSimilarWebsites.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg dark:bg-gray-800 dark:border-gray-600"
          >
            {mostSimilarWebsites.map((websiteName, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setSearchInput(websiteName);
                  setMostSimilarWebsites([]);
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
            setCurrentWebsite(searchInput);
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
