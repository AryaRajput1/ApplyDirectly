import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery } = {}) {
    const supabase = await supabaseClient(token);
    let query = supabase.from('jobs').select('*, company:companies(name,logo_url), saved: savedJobs(id), viewed:viewedJobs(id)');

    if (location) {
        query = query.eq('location', location)
    }
    if (company_id) {
        query = query.eq('company_id', company_id)
    }

    if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`)
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error:', error);
        return null;
    }

    return data;
}


export async function savedJobs(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { data, error } = await supabase.from("savedJobs").delete().eq("job_id", saveData.job_id);

        if (error) {
            console.log('Error Deleting saved jobs: ', error)
            return null;
        }

        return data;
    }

    const { data, error } = await supabase.from("savedJobs").insert([saveData]).select();

    if (error) {
        console.log('Error Saving saved jobs: ', error)
        return null;
    }

    return data;
}

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("companies").select('*');

    if (error) {
        console.log('Error jobs: ', error)
        return null;
    }

    return data;
}

export async function getSingleJob(token, { id } = {}) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("jobs").select('*, company:companies(name,logo_url)').eq('id', id).single();

    if (error) {
        console.log('Error getting job: ', error)
        return null;
    }

    return data;
}