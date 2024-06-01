using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using api.Dtos.Stock;


namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;

        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return null;
            }

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync()
        {
            return await _context.Stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.FindAsync(id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> StockExists(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var exisitingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (exisitingStock == null)
            {
                return null;
            }

            exisitingStock.Symbol = stockDto.Symbol;
            exisitingStock.CompanyName = stockDto.CompanyName;
            exisitingStock.Purchase = stockDto.Purchase;
            exisitingStock.LastDiv = stockDto.LastDiv;
            exisitingStock.Industry = stockDto.Industry;
            exisitingStock.MarketCap = stockDto.MarketCap;

            await _context.SaveChangesAsync();

            return exisitingStock;
        }
    }
}
