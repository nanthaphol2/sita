'use server'

import { fetchWrapper } from "@/app/lib/fetchWrapper";
import { Auction, Bid, PagedResult } from "@/types";
import { revalidatePath } from "next/cache";
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

export async function getDetailedViewData(id: string): Promise<Auction> {
  return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  const res = await fetchWrapper.put(`auctions/${id}`, data);
  revalidatePath(`/auctions/${id}`);
  return res;
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
  return await fetchWrapper.get(`bids/${id}`);
}

export async function placeBidForAuction(auctionId: string, amount: number) {
  return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {})
}