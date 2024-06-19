"use client";
import { useState, useEffect, useCallback, use } from "react";
import SearchBar from "@/components/SearchBar";
import ServerStatusTable from "@/components/ServerStatusTable";

import { ServerCurrentStateRecord } from "@/lib/types/ClientInterface";
import formatKoreanDateTime from "@/lib/utils/formatKoreanDateTime";

export default function Page() {
  const [serverCurrentState, setServerCurrentState] = useState<
    ServerCurrentStateRecord[]
  >([]); //api로 불러온 정보를 상태를 저장하는 state
  const [relatedWords, setRelatedWords] = useState<string[]>([]); //연관 단어 목록을 저장하는 state
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResults = useCallback((results: any) => {
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
      <ServerStatusTable serverCurrentState={serverCurrentState} />
    </>
  );
}
