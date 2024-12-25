export type SWAPIResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface SearchResult {
    count: number;
    results: Film[];
}

export type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export type Planet = {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string; // ISO 8601 date string
    edited: string;  // ISO 8601 date string
    url: string;
}

export type Film = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string; // ISO 8601 date string
    characters: string[]; // Array of URLs to character resources
    planets: string[];    // Array of URLs to planet resources
    starships: string[];  // Array of URLs to starship resources
    vehicles: string[];   // Array of URLs to vehicle resources
    species: string[];    // Array of URLs to species resources
    created: string;      // ISO 8601 date string
    edited: string;       // ISO 8601 date string
    url: string;          // URL to this film resource
}