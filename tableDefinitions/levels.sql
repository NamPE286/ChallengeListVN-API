create table
  public.levels (
    id bigint not null,
    name text not null,
    videoID text not null,
    rating bigint null,
    rank bigint null,
    accepted boolean not null default false,
    description text null,
    creatorUID uuid not null,
    timestamp timestamp with time zone not null default now(),
    length bigint null,
    dailyStart timestamp with time zone null,
    constraint levels_pkey primary key (id),
    constraint levels_dailyStart_key unique ("dailyStart"),
    constraint levels_id_key unique (id),
    constraint levels_creatorUID_fkey foreign key ("creatorUID") references players (uid)
  ) tablespace pg_default;