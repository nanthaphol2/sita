'use client'

import React, {useState, useEffect} from 'react'
import AuctionCard from './AuctionCard';
import { PagedResult, Auction} from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';


export default function Listings() {
  // const [auctions, setAuctions] = useState<Auction[]>([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(4);
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm
  }), shallow);

  // const params = {
  //   pageNumber: useParamsStore((state) => state.pageNumber),
  //   pageSize: useParamsStore((state) => state.pageSize),
  //   searchTerm: useParamsStore((state) => state.searchTerm),
  // }

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({url: '', query: params});

  function setPageNumber(pageNumber: number) {
    setParams({pageNumber});
  }

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
    })
  }, [url])
  if (!data) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      <div className='grid grid-cols-4 gap-6'>
          {data.results.map(auction => (
            <AuctionCard auction={auction} key={auction.id} />
          ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setPageNumber} 
        currentPage={params.pageNumber} 
        pageCount={data.pageCount}/>
      </div>
    </>
    
  )
}
