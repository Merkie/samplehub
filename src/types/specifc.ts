export enum Page {
    Search = "Search",
    StaffPicks = "Staff Picks",
    Trending = "Trending",
    Library = "Library",
}

export enum FilterType {
    all = "all",
    loops = "loops",
    oneshots = "oneshots",
    presets = "presets",
}

export enum BpmType {
    range,
    exact,
}

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

export interface IFilter {
    type: FilterType;
    range: [number, number];
    key: KeyType;
    scale: string;
}