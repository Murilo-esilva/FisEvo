import{supabase}from'./supabase-config.js';
function check(error){if(error)throw error}
export async function profile(id){const{data,error}=await supabase.from('profiles').select('*').eq('id',id).maybeSingle();check(error);return data}
export async function saveProfile(row){const{data,error}=await supabase.from('profiles').upsert(row).select().single();check(error);return data}
export async function list(table,options={}){let query=supabase.from(table).select(options.select||'*');for(const filter of options.filters||[])query=query[filter.method](filter.column,filter.value);if(options.order)query=query.order(options.order.column,{ascending:options.order.ascending??true});const{data,error}=await query;check(error);return data||[]}
export async function insert(table,row){const{data,error}=await supabase.from(table).insert(row).select().single();check(error);return data}
export async function update(table,id,row){const{data,error}=await supabase.from(table).update(row).eq('id',id).select().single();check(error);return data}
export async function remove(table,id){const{error}=await supabase.from(table).delete().eq('id',id);check(error)}
export async function mealsByDate(date){return list('meals',{select:'*,meal_items(*)',filters:[{method:'eq',column:'meal_date',value:date}],order:{column:'created_at',ascending:true}})}
export async function createMeal(meal,item){const created=await insert('meals',meal);try{return await insert('meal_items',{...item,meal_id:created.id})}catch(error){await remove('meals',created.id);throw error}}
