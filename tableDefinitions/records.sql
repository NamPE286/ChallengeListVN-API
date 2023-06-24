create table
  public.records (
    videoLink text not null,
    refreshRate bigint not null,
    userUID uuid not null,
    levelID bigint not null,
    accepted boolean not null default false,
    comment text null,
    isMobile boolean not null default false,
    timestamp timestamp with time zone not null default now(),
    constraint records_pkey primary key ("userUID", "levelID"),
    constraint records_levelID_fkey foreign key ("levelID") references levels (id),
    constraint records_userUID_fkey foreign key ("userUID") references players (uid)
  ) tablespace pg_default;