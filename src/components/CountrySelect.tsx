import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CountrySelect = ({ value, onValueChange }: CountrySelectProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

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
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-32">
        <SelectValue>
          {selectedCountry && (
            <div className="flex items-center gap-2">
              <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-4 object-cover rounded-sm" />
              <span>{selectedCountry.dialCode}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.dialCode}>
            <div className="flex items-center gap-2">
              <img src={country.flag} alt={country.name} className="w-5 h-4 object-cover rounded-sm" />
              <span>{country.name}</span>
              <span className="text-muted-foreground">{country.dialCode}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
