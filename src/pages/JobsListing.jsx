import JobCard from "@/components/custom/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import { getCompanies, getJobs } from "@/services/service";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobsListing = () => {
  const { isLoaded } = useUser();
  const [options, setOptions] = useState({
    location: "",
    company_id: "",
    searchQuery: "",
  });
  const { fn: fetchJobs, loading, data: jobs } = useFetch(getJobs, options);
  const {
    fn: fetchCompanies,
    loading: loadingCompanies,
    data: companies,
  } = useFetch(getCompanies);

  const { location, company_id, searchQuery } = options;

  useEffect(() => {
    if (isLoaded) {
      fetchJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width="100%" color="#2563EB" />;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("search-query");

    setOptions((data) => ({ ...data, searchQuery }));
  };

  return (
    <div>
      <h1 className="font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex w-full items-center gap-2"
      >
        <Input
          placeholder="Search jobs by title"
          type="text"
          name="search-query"
          className="h-full text-md"
        />
        <Button type="submit" className="w-20" variant="blue">
          Search
        </Button>
      </form>

      <div className="mt-2 flex flex-col sm:flex-row gap-2">
        <Select
          value={location}
          onValueChange={(location) =>
            setOptions((data) => ({ ...data, location }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select by Location" />
          </SelectTrigger>
          <SelectContent>
            {State.getStatesOfCountry("IN").map(({ name }) => (
              <SelectItem value={name} key={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(company_id) =>
            setOptions((data) => ({ ...data, company_id }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select by Companies" />
          </SelectTrigger>
          <SelectContent>
            {companies?.map(({ name, id }) => (
              <SelectItem value={id} key={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant='destructive' className='w-20' onClick={() => setOptions({
          location: "",
          company_id: "",
          searchQuery: "",
        })}>Clear Filter</Button>

      </div>

      {loading ? (
        <BarLoader className="mt-4" width="100%" color="#2563EB" />
      ) : (
        <>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs?.length
              ? jobs.map((job) => <JobCard key={job.id} job={job} />)
              : "No Jobs Available."}
          </div>
        </>
      )}
      
    </div>
  );
};

export default JobsListing;
