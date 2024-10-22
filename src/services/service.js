import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery} = {}) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from('jobs').select('*');

    if(error) {
        console.error('Error:' , error);
        return null;
    }


    return data;
}