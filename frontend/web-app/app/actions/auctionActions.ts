'use server'

import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, PagedResult } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return await fetchWrapper.get(`search${query}`);
    // const res = await fetch(`http://localhost:6001/search${query}`);
    // if(!res.ok) throw new Error('Failed to fetch data');
    // return res.json();
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post('auctions', data);
}
  