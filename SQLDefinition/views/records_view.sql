create view
  public.records_view as
select
  records."videoLink",
  records."refreshRate",
  records."userUID",
  records."levelID",
  records.accepted,
  records.comment,
  records."isMobile",
  records."timestamp",
  levels.rating,
  rank() over (
    partition by
      records."userUID"
    order by
      levels.rating desc,
      records."levelID"
  ) as no
from
  levels,
  records
where
  levels.id = records."levelID"
  and levels.length <> '-1'::integer;