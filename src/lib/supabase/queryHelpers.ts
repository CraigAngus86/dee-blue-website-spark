
/**
 * Helper functions for Supabase queries with enhanced error handling
 */

import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './client';

/**
 * Safely execute a Supabase query with standardized error handling
 * @param queryFn Function that performs the actual Supabase query
 * @param fallback Fallback value to return if query fails
 * @param context Descriptive context for error logging
 */
export async function safeQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  fallback: T,
  context: string
): Promise<T> {
  try {
    const { data, error } = await queryFn();
    
    if (error) {
      console.error(`Error in ${context}:`, error.message, error.details, error.hint);
      
      // Log additional error information for debugging
      if (error.code) {
        console.error(`Error code: ${error.code}`);
      }
      
      return fallback;
    }
    
    if (data === null) {
      console.warn(`No data returned from ${context}`);
      return fallback;
    }
    
    return data;
  } catch (error) {
    console.error(`Exception in ${context}:`, error);
    return fallback;
  }
}

/**
 * Get a single record by ID with error handling
 * @param table Table name
 * @param id Record ID
 * @param select Optional select query
 */
export async function getById<T>(
  table: string, 
  id: string,
  select?: string
): Promise<T | null> {
  return safeQuery<T | null>(
    () => supabase
      .from(table)
      .select(select || '*')
      .eq('id', id)
      .maybeSingle(),
    null,
    `getById(${table}, ${id})`
  );
}

/**
 * Get multiple records with filtering and error handling
 * @param table Table name
 * @param select Fields to select
 * @param filters Optional filter object
 */
export async function getMany<T>(
  table: string,
  select: string,
  filters?: Record<string, any>
): Promise<T[]> {
  let query = supabase.from(table).select(select);
  
  // Apply filters if provided
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (key.includes('!')) {
        // Handle special operators
        const [field, operator] = key.split('!');
        
        switch (operator) {
          case 'gt':
            query = query.gt(field, value);
            break;
          case 'lt':
            query = query.lt(field, value);
            break;
          case 'gte':
            query = query.gte(field, value);
            break;
          case 'lte':
            query = query.lte(field, value);
            break;
          case 'neq':
            query = query.neq(field, value);
            break;
          case 'in':
            if (Array.isArray(value)) {
              query = query.in(field, value);
            }
            break;
          default:
            console.warn(`Unknown operator: ${operator}`);
        }
      } else {
        // Standard equality filter
        query = query.eq(key, value);
      }
    });
  }
  
  return safeQuery<T[]>(
    () => query,
    [] as T[],
    `getMany(${table})`
  );
}
