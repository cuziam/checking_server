"use client";
import { useState, useEffect, useCallback, use } from "react";
import SearchBar from "@/components/SearchBar";
import ServerStatusDetail from "@/components/ServerStatusDetail";
import ServerStatusTable from "@/components/ServerStatusTable";

import {
  ServerCurrentStateRecord,
  ServerStateRecord,
} from "@/lib/types/ClientInterface";
import formatKoreanDateTime from "@/lib/utils/formatKoreanDateTime";

export default function Page() {
  const [serverCurrentState, setServerCurrentState] = useState<
    ServerCurrentStateRecord[]
  >([]); //api로 불러온 정보를 상태를 저장하는 state
  const [relatedWords, setRelatedWords] = useState<string[]>([]); //연관 단어 목록을 저장하는 state
  const [searchResults, setSearchResults] = useState<ServerStateRecord[]>([]); //검색 결과를 저장하는 state
  const [showDetail, setShowDetail] = useState<boolean>(false); //상세 정보를 보여줄지 여부를 저장하는 state

  const handleSearchResults = useCallback((results: any) => {
    results.forEach((record: ServerStateRecord) => {
      record.updated_time = formatKoreanDateTime(record.updated_time);
    });
    setSearchResults(results);
  }, []);

  // 서버 상태를 불러오는 useEffect
  useEffect(() => {
    async function fetchServerStatus() {
      try {
        const response = await fetch(`/api/website-status`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        //data 파싱
        data.forEach((record: ServerCurrentStateRecord) => {
          record.updated_time = formatKoreanDateTime(record.updated_time);
          record.last_error_time = formatKoreanDateTime(record.last_error_time);
          record.last_recovery_time = formatKoreanDateTime(
            record.last_recovery_time
          );
        });
        //data를 serverCurrentState에 저장
        setServerCurrentState(data);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    }

    if (serverCurrentState.length === 0) {
      fetchServerStatus();
    }
  }, [serverCurrentState]);

  // 연관 단어(검색어) 목록을 불러오는 useEffect
  useEffect(() => {
    async function fetchRelatedWords(endpoint: string) {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const dataArr = data.map((item: any) => item.website_name);
        setRelatedWords(dataArr);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    }
    if (relatedWords.length === 0) {
      fetchRelatedWords(`/api/website-names`);
    }
  }, [relatedWords]);

  return (
    <>
      <SearchBar
        endpoint="/api/website-status"
        onSearchResults={handleSearchResults}
        relatedWords={relatedWords}
      />
      {/* 초기화면 ServerStatusTable만, 검색을 할 경우 ServerStatusDetail 렌더링 */}
      {searchResults.length === 0 ? (
        <>
          <h2 className="text-center font-bold text-xl m-4">
            {" "}
            대한민국 주요 사이트 접속 현황
          </h2>
          <ServerStatusTable serverCurrentState={serverCurrentState} />
        </>
      ) : (
        <ServerStatusDetail serverState={searchResults} />
      )}
    </>
  );
}
