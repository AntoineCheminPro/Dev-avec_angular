//Utilisé dans DetailComponent pour afficher les statistiques des médailles par pays

export interface CountryData {
    name: string;
    series: { value: number; name: number; }[];
  }