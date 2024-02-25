create table
  public.players (
    name text not null,
    email text null,
    facebook text null,
    youtube text null,
    discord text null,
    uid uuid not null default uuid_generate_v4 (),
    "isAdmin" boolean null default false,
    "isBanned" boolean null default false,
    "isHidden" boolean null default false,
    rating bigint null default '0'::bigint,
    rank bigint null,
    "googleAvatarID" text null,
    "bannerImage" text null,
    constraint players_pkey primary key (uid),
    constraint players_uid_key unique (uid)
  ) tablespace pg_default;