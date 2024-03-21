/*Artwork interface stating what the object is/contains, being a type of type string, exhibition date of type Date, and special notes of type string. */
export interface Artwork {
    type: string;
    exhibitionDate: Date;
    specialNotes?: string;
  }
  