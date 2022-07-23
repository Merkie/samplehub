/*
    --- Specific Types ---
    This file contains all types specific to the functionality of the application.
    EG, all types besides props and api types.
*/

// Page: enum that represents the different pages of the SPA portaion of the app.
export enum Page {
    Search = "Search",
    StaffPicks = "Staff Picks",
    Trending = "Trending",
    Library = "Library",
}

// FilterType: enum that represents the different categories a user can search for in the filter component.
// See src/components/filterpanel.ts
export enum FilterType {
    all = "all",
    loops = "loops",
    oneshots = "oneshots",
    presets = "presets",
}

// BpmType: enum that represents the two different options for BPM selection.
// See src/components/filterpanel.ts
export enum BpmType {
    range,
    exact,
}

// KeyType: enum that represents the different keys a user can select
// See src/components/filterpanel.ts
export enum KeyType {
    none = "none",
    c = "c",
    c_sharp = "csh",
    d = "d",
    d_sharp = "dsh",
    e = "e",
    f = "f",
    f_sharp = "fsh",
    g = "g",
    g_sharp = "gsh",
    a = "a",
    a_sharp = "ash",
    b = "b",
}
// IFilter: interface that summarizes the user's filter selection. Used for API calls but it lives here :p
// For the record its here because its considered specific to the logic of the application, and not the API.
export interface IFilter {
    type: FilterType;
    range: [number, number];
    key: KeyType;
    scale: string;
}