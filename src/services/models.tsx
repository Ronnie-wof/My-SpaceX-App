// make the API call

type Launches = {
    launches: [Launch]
}
export type Launch = {
    fairings: Fairings,
    links: Link,
    static_fire_date_utc: string,
    static_fire_date_unix: string,
    tdb: boolean,
    net: boolean,
    window: number,
    rocket: string,
    success: boolean,
    failures: Failure,
    details: string,
    crew: Crew[],
    ships: [string],
    capsules: [string],
    payloads: [string],
    launchpad: string,
    auto_update: boolean,
    flight_number: number,
    name: string,
    date_utc: string,
    date_unix: string,
    date_local: string,
    date_precision: string,
    upcoming: boolean,
    cores: Core,
    id: string
};

type Fairings = {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[]
}
type Link = {
    patch: Patch,
    reddit: Reddit,
    flickr: Flickr,
    preskit: string,
    webcast: string,
    youtube_id: string,
    article: string,
    wikipedia: string,
}

type Patch = {
    small: string,
    large: string
}

type Reddit = {
    campaign: string,
    launch: string,
    media: string,
    recovery: string
}

type Flickr = {
    small: [string],
    original: [string]
}

type Failure = {
    time: number,
    altitude: number,
    reason: string
}

type Core = {
    core: string,
    flight: number,
    gridfins: number,
    legs: boolean,
    reused: boolean,
    landing_attempt: boolean,
    landing_success: boolean,
    landing_type: string,
    landpad: string
}

export type Crew = {
    crew: string,
    role: string
}