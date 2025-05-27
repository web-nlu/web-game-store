'use client'
import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import CardAccount from "@/components/accounts/CardAccount";
import {useSearchParams} from "next/navigation";

type Props = {
  availableAccounts: Account[]
}

export default function LazyLoadingList({availableAccounts} : Props) {
  const params = useSearchParams();
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const [accounts, setAccounts] = useState(availableAccounts);
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(params.toString());
    if(page === 1) return;
    const fetchData = async () => {
      const searchParams = new URLSearchParams(params.toString());
      searchParams.set("page", page.toString());
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts?${searchParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      const {content: accounts, totalPages} = await res.json();

      if (!accounts?.length || page >= totalPages) {
        setHasMore(false);
        return;
      }

      setAccounts((prev) => [...prev, ...accounts]);
    };

    if (hasMore) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <CardAccount account={account} key={account.id} />
      ))}

      {hasMore && (
        <div ref={ref} className="text-center py-8">
          <span>Đang tải thêm...</span>
        </div>
      )}
    </div>
  );
}