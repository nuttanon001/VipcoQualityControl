﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace VipcoQualityControl.Services
{
    public class RepositoryQualityControl<TEntity> : IRepositoryQualityControl<TEntity> where TEntity : class
    {
        #region PrivateMembers
        private readonly DbSet<TEntity> Entities;
        private Models.QualityControls.QualityControlContext Context;
        private readonly string ErrorMessage = string.Empty;
        #endregion

        #region Constructor
        /// <summary>
        /// The contructor requires an open DataContext to work with
        /// </summary>
        /// <param name="context">An open DataContext</param>

        public RepositoryQualityControl(Models.QualityControls.QualityControlContext context)
        {
            this.Context = context;
            this.Entities = context.Set<TEntity>();
        }
        #endregion

        /// <summary>
        /// Returns a single object with a primary key of the provided id
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="id">The primary key of the object to fetch</param>
        /// <returns>A single object with the provided primary key or null</returns>
        public TEntity Get(int id)
        {
            return this.Entities.Find(id);
        }
        public TEntity Get(string id)
        {
            return this.Entities.Find(id);
        }
        /// <summary>
        /// Returns a single object with a primary key of the provided id
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="id">The primary key of the object to fetch</param>
        /// <param name="option">Option need lazy relation</param>
        /// <returns>A single object with the provided primary key or null</returns>
        public async Task<TEntity> GetAsync(int id,bool option = false)
        {
            var entity = await Context.Set<TEntity>().FindAsync(id);
            if (!option)
                Context.Entry(entity).State = EntityState.Detached;
            return entity;
            // return await this.entities.FindAsync(id);
        }

        public async Task<TEntity> GetAsynvWithIncludes(int id, string PkName, List<string> Includes = null)
        {
            var Query = this.Context.Set<TEntity>().AsQueryable();
            if (Includes != null)
                Includes.ForEach(include => Query = Query.Include(include));
            return await Query.FirstOrDefaultAsync(e => EF.Property<int>(e, PkName) == id);
        }
        /// <summary>
        /// Returns a single object with a primary key of the provided id
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="key">The primary key of the object to fetch</param>
        /// <returns>A single object with the provided primary key or null</returns>
        public async Task<TEntity> GetAsync(string key)
        {
            // return await this.Entities.FindAsync(key);
            var entity = await Context.Set<TEntity>().FindAsync(key);
            Context.Entry(entity).State = EntityState.Detached;
            return entity;
        }
        /// <summary>
        /// Gets a collection of all objects in the database
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <returns>An ICollection of every object in the database</returns>
        public ICollection<TEntity> GetAll()
        {
            var ListData = new List<TEntity>();
            this.Entities.ToList().ForEach(item =>
            {
                Context.Entry(item).State = EntityState.Detached;
                ListData.Add(item);
            });
            return ListData;
        }

        public IQueryable<TEntity> GetAllAsQueryable()
        {
            return this.Entities.AsQueryable();
        }
        /// <summary>
        /// Gets a collection of all objects in the database
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <returns>An ICollection of every object in the database</returns>
        public async Task<ICollection<TEntity>> GetAllAsync(bool option = false)
        {
            var ListData = new List<TEntity>();
            (await this.Entities.ToListAsync()).ForEach(item =>
            {
                if (!option)
                    Context.Entry(item).State = EntityState.Detached;

                ListData.Add(item);
            });
            return ListData;
        }

        public async Task<ICollection<TEntity>> GetAllWithRelateAsync(System.Linq.Expressions.Expression<Func<TEntity, bool>> match = null)
        {
            var Query = this.Context.Set<TEntity>().AsQueryable();
            if (match != null)
            {
                Query = Query.Where(match);
            }
            return await Query.ToListAsync();
        }

        public async Task<ICollection<TEntity>> GetAllWithConditionAndIncludeAsync(
            Expression<Func<TEntity, bool>> Condition = null, List<string> Includes = null)
        {
            var Query = this.Context.Set<TEntity>().AsQueryable();

            if (Condition != null)
                Query = Query.Where(Condition);
            if (Includes != null)
                Includes.ForEach(include => Query = Query.Include(include));

            return await Query.ToListAsync();

        }

        /// <summary>
        /// Gets a collection of all objects in the database
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="relates">List of linq expression relate to find one or more relate</param>
        /// <returns>An ICollection of every object in the database</returns>
        public async Task<ICollection<TEntity>> GetAllWithIncludeAsync
            (List<Expression<Func<TEntity, object>>> relates)
        {
            var Query = this.Context.Set<TEntity>().AsQueryable();

            foreach (var relate in relates)
                Query = Query.Include(relate);

            return await Query.ToListAsync();
        }

        public async Task<ICollection<TEntity>> GetAllWithInclude2Async(List<string> Includes = null)
        {
            var Query = this.Context.Set<TEntity>().AsQueryable();
            if (Includes != null)
                Includes.ForEach(include => Query = Query.Include(include));
            return await Query.ToListAsync();
        }

        /// <summary>
        /// Returns a single object which matches the provided expression
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="match">A Linq expression filter to find a single result</param>
        /// <returns>A single object which matches the expression filter.
        /// If more than one object is found or if zero are found, null is returned</returns>
        public TEntity Find(Expression<Func<TEntity, bool>> match)
        {
            return this.Context.Set<TEntity>().SingleOrDefault(match);
        }
        /// <summary>
        /// Returns a single object which matches the provided expression
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="match">A Linq expression filter to find a single result</param>
        /// <returns>A single object which matches the expression filter.
        /// If more than one object is found or if zero are found, null is returned</returns>
        public async Task<TEntity> FindAsync(Expression<Func<TEntity, bool>> match)
        {
            return await this.Context.Set<TEntity>().SingleOrDefaultAsync(match);
        }
        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="match">A linq expression filter to find one or more results</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public ICollection<TEntity> FindAll(Expression<Func<TEntity, bool>> match)
        {
            var ListData = new List<TEntity>();
            this.Context.Set<TEntity>().Where(match).ToList().ForEach(item =>
            {
                Context.Entry(item).State = EntityState.Detached;
                ListData.Add(item);
            });

            return ListData;
        }
        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="match">A linq expression filter to find one or more results</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public async Task<ICollection<TEntity>> FindAllAsync(Expression<Func<TEntity, bool>> match, bool option = false)
        {
            var ListData = new List<TEntity>();
            (await this.Context.Set<TEntity>().Where(match).ToListAsync()).ForEach(item =>
            {
                if (!option)
                    Context.Entry(item).State = EntityState.Detached;

                ListData.Add(item);
            });
            return ListData;
        }

        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="match">A linq expression filter to find one or more results</param>
        /// <param name="relates">List of linq expression relate to find one or more relate</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public async Task<ICollection<TEntity>> FindAllWithIncludeAsync
            (Expression<Func<TEntity, bool>> match, List<Expression<Func<TEntity, object>>> relates)
        {
            var Query = this.Context.Set<TEntity>().Where(match);

            foreach (var relate in relates)
                Query = Query.Include(relate);

            return await Query.ToListAsync();
        }

        /// <summary>
        /// Returns a collection of objects which match the provided expression
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="match">A linq expression filter to find one or more results</param>
        /// <param name="relates">List of linq expression relate to find one or more relate</param>
        /// <returns>An ICollection of object which match the expression filter</returns>
        public async Task<ICollection<TEntity>> FindAllWithLazyLoadAsync
            (Expression<Func<TEntity, bool>> match,
            List<Expression<Func<TEntity, object>>> relates,
            int Skip, int Row,
            Expression<Func<TEntity, string>> order = null,
            Expression<Func<TEntity, string>> orderDesc = null)
        {
            try
            {
                var Query = this.Context.Set<TEntity>().Where(match);
                //Relate
                if (relates != null)
                {
                    foreach (var relate in relates)
                        Query = Query.Include(relate);
                }
                //Order
                if (order != null)
                    Query = Query.OrderBy(order);
                else if (orderDesc != null)
                    Query = Query.OrderByDescending(orderDesc);
                //Skip Take
                Query = Query.Skip(Skip).Take(Row);

                return await Query.ToListAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Has error {ex.ToString()}");
                return null;
            }
        }
        public ICollection<TEntity> FindAllWithLazyLoad
           (Expression<Func<TEntity, bool>> match,
           List<Expression<Func<TEntity, object>>> relates,
           int Skip, int Row,
           Expression<Func<TEntity, string>> order = null,
           Expression<Func<TEntity, string>> orderDesc = null)
        {
            var Query = this.Context.Set<TEntity>().Where(match);
            //Relate
            foreach (var relate in relates)
                Query = Query.Include(relate);
            //Order
            if (order != null)
                Query = Query.OrderBy(order);
            else if (orderDesc != null)
                Query = Query.OrderByDescending(orderDesc);
            //Skip Take
            Query = Query.Skip(Skip).Take(Row);

            return Query.ToList();
        }
        /// <summary>
        /// Inserts a single object to the database and commits the change
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="t">The object to insert</param>
        /// <returns>The resulting object including its primary key after the insert</returns>
        public TEntity Add(TEntity t)
        {
            this.Context.Set<TEntity>().Add(t);
            this.Context.SaveChanges();
            return t;
        }
        /// <summary>
        /// Inserts a single object to the database and commits the change
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="t">The object to insert</param>
        /// <returns>The resulting object including its primary key after the insert</returns>
        public async Task<TEntity> AddAsync(TEntity t)
        {
            this.Context.Set<TEntity>().Add(t);
            await this.Context.SaveChangesAsync();
            this.Context.Entry(t).State = EntityState.Detached;
            return t;
        }
        /// <summary>
        /// Inserts a collection of objects into the database and commits the changes
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="tList">An IEnumerable list of objects to insert</param>
        /// <returns>The IEnumerable resulting list of inserted objects including the primary keys</returns>
        public IEnumerable<TEntity> AddAll(IEnumerable<TEntity> tList)
        {
            this.Context.Set<TEntity>().AddRange(tList);
            this.Context.SaveChanges();
            return tList;
        }
        /// <summary>
        /// Inserts a collection of objects into the database and commits the changes
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="tList">An IEnumerable list of objects to insert</param>
        /// <returns>The IEnumerable resulting list of inserted objects including the primary keys</returns>
        public async Task<IEnumerable<TEntity>> AddAllAsync(IEnumerable<TEntity> tList)
        {
            this.Context.Set<TEntity>().AddRange(tList);
            await this.Context.SaveChangesAsync();
            return tList;
        }
        /// <summary>
        /// Updates a single object based on the provided primary key and commits the change
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="updated">The updated object to apply to the database</param>
        /// <param name="key">The primary key of the object to update</param>
        /// <returns>The resulting updated object</returns>
        public TEntity Update(TEntity updated, int key)
        {
            if (updated == null)
                return null;

            TEntity existing = this.Context.Set<TEntity>().Find(key);
            if (existing != null)
            {
                this.Context.Entry(existing).CurrentValues.SetValues(updated);
                this.Context.SaveChanges();
            }
            return existing;
        }
        /// <summary>
        /// Updates a single object based on the provided primary key and commits the change
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="updated">The updated object to apply to the database</param>
        /// <param name="key">The primary key of the object to update</param>
        /// <returns>The resulting updated object</returns>
        public TEntity Update(TEntity updated, string key)
        {
            if (updated == null)
                return null;

            TEntity existing = this.Context.Set<TEntity>().Find(key);
            if (existing != null)
            {
                this.Context.Entry(existing).CurrentValues.SetValues(updated);
                this.Context.SaveChanges();
            }
            return existing;
        }

        /// <summary>
        /// Updates a single object based on the provided primary key and commits the change
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="updated">The updated object to apply to the database</param>
        /// <param name="key">The primary key of the object to update</param>
        /// <returns>The resulting updated object</returns>
        public async Task<TEntity> UpdateAsync(TEntity updated, int key)
        {
            if (updated == null)
                return null;

            TEntity existing = await this.Context.Set<TEntity>().FindAsync(key);
            if (existing != null)
            {
                this.Context.Entry(existing).CurrentValues.SetValues(updated);
                await this.Context.SaveChangesAsync();
                this.Context.Entry(existing).State = EntityState.Detached;
            }
            return existing;
        }
        /// <summary>
        /// Updates a single object based on the provided primary key and commits the change
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="updated">The updated object to apply to the database</param>
        /// <param name="key">The primary key of the object to update</param>
        /// <returns>The resulting updated object</returns>
        public async Task<TEntity> UpdateAsync(TEntity updated, string key)
        {
            if (updated == null)
                return null;

            TEntity existing = await this.Context.Set<TEntity>().FindAsync(key);
            if (existing != null)
            {
                this.Context.Entry(existing).CurrentValues.SetValues(updated);
                await this.Context.SaveChangesAsync();
                this.Context.Entry(existing).State = EntityState.Detached;
            }
            return existing;
        }
        /// <summary>
        /// Deletes a single object from the database and commits the change
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <param name="t">The object to delete</param>
        public void Delete(int key)
        {
            try
            {
                TEntity existing = this.Context.Set<TEntity>().Find(key);
                if (existing != null)
                {
                    this.Context.Set<TEntity>().Remove(existing);
                    this.Context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Debug.Write($"Has error{ex.ToString()}");
            }
        }
        /// <summary>
        /// Deletes a single object from the database and commits the change
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="key">The primary key of the object to delete</param>

        public async Task<int> DeleteAsync(int key)
        {
            TEntity existing = await this.Context.Set<TEntity>().FindAsync(key);
            if (existing != null)
            {
                this.Context.Set<TEntity>().Remove(existing);
                return await this.Context.SaveChangesAsync();
            }
            return 0;
        }

        /// <summary>
        /// Deletes a single object from the database and commits the change
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <param name="key">The primary key of the object to delete</param>
        public async Task<int> DeleteAsync(string key)
        {
            TEntity existing = await this.Context.Set<TEntity>().FindAsync(key);
            if (existing != null)
            {
                this.Context.Set<TEntity>().Remove(existing);
                return await this.Context.SaveChangesAsync();
            }
            return 0;
        }

        /// <summary>
        /// Gets the count of the number of objects in the databse
        /// </summary>
        /// <remarks>Synchronous</remarks>
        /// <returns>The count of the number of objects</returns>
        public int Count()
        {
            return this.Context.Set<TEntity>().Count();
        }

        public int CountWithMatch(Expression<Func<TEntity, bool>> match)
        {
            return this.Context.Set<TEntity>().Where(match).Count();
        }
        /// <summary>
        /// Gets the count of the number of objects in the databse
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        /// <returns>The count of the number of objects</returns>
        public async Task<int> CountAsync()
        {
            return await this.Context.Set<TEntity>().CountAsync();
        }
        /// <summary>
        /// Gets the count of the number of objects in the databse
        /// </summary>
        /// <remarks>Asynchronous</remarks>
        ///  /// <param name="match">A linq expression filter to find one or more results</param>
        /// <returns>The count of the number of objects</returns>
        public async Task<int> CountWithMatchAsync(Expression<Func<TEntity, bool>> match)
        {
            return await this.Context.Set<TEntity>().Where(match).CountAsync();
        }

        //********************Check Data Have*********************//
        public async Task<bool> AnyDataAsync(Expression<Func<TEntity, bool>> match)
        {
            return await this.Entities.Where(match).AnyAsync();
        }
    }
}
