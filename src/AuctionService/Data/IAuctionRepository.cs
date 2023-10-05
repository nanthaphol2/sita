using AuctionService.DTOs;
using AuctionService.Entities;

namespace AuctionService;

public interface IAuctionRepository
{
    Task<List<AuctionDto>> GetAuctionsAsync(string date);
    Task<AuctionDto> GetAuctionByIdAsync(Guid id);

}
