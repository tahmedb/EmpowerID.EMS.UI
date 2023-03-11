using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

public static class ExtensionWrappers
{
    public async static Task<IEnumerable<T>> QueryAsync<T>(this IQueryable<T> query) where T:class
    {
        return await query.ToListAsync();
    }

    public static IQueryable<T> Preload<T,P>(this IQueryable<T> query, Expression<Func<T, P>> path) where T : class
    {
        return query.Include(path);
    }
}
