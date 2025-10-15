import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const SimpleCountrySelect = ({ value, onValueChange, className }: CountrySelectProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,cca2,flags");
        const data = await response.json();
        
        const formattedCountries: Country[] = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes?.length > 0)
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
            dialCode: country.idd.root + (country.idd.suffixes[0] || ""),
            flag: country.flags.svg || country.flags.png,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        // Prioritize common countries at the top
        const priority = ["+91", "+1", "+44", "+86", "+81"];
        const priorityCountries = formattedCountries.filter(c => priority.includes(c.dialCode));
        const otherCountries = formattedCountries.filter(c => !priority.includes(c.dialCode));
        
        setCountries([...priorityCountries, ...otherCountries]);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        // Fallback to default countries
        setCountries([
          { name: "India", code: "IN", dialCode: "+91", flag: "https://flagcdn.com/in.svg" },
          { name: "United States", code: "US", dialCode: "+1", flag: "https://flagcdn.com/us.svg" },
          { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "https://flagcdn.com/gb.svg" },
          { name: "China", code: "CN", dialCode: "+86", flag: "https://flagcdn.com/cn.svg" },
          { name: "Japan", code: "JP", dialCode: "+81", flag: "https://flagcdn.com/jp.svg" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const selectedCountry = countries.find(c => c.dialCode === value);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        disabled={loading}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-32 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-4 object-cover rounded-sm" />
            <span>{selectedCountry.dialCode}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Select</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-50 top-full left-0 mt-1 w-72 max-h-80 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onValueChange(country.dialCode);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
              >
                <img src={country.flag} alt={country.name} className="w-5 h-4 object-cover rounded-sm" />
                <span className="flex-1 text-left">{country.name}</span>
                <span className="text-muted-foreground">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
