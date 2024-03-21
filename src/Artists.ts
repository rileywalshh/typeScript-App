//Import from the Artwork interface.
import { Artwork } from "./Artwork";

/*Artists interface stating what the object is/contains, being an Id of type string, name of type string, date of birth of type date, gender of type string with restrictions, contact information of type string, Artwork of type Artwork from an imported interface, and is featured of type boolean. */
export interface Artist {
    id: string;
    name: string;
    dob: Date;
    gender: 'Female' | 'Male' | 'Unspecified' | 'Anonymous';
    contactInfo: string;
    artworks: Artwork[];
    isFeatured: boolean;
  }