begin
update
  players
set
  rating = 0
where
  true;

with
  v_table_a as (
    select
      "userUID",
      sum(
        rating * greatest(0, ceil(- power((no - 42.21) / 10, 3) + 30) / 100)
      ) as pt
    from
      records_view
    where
      no <= 75
    group by
      "userUID"
  )
update
  players
set
  rating = v_table_a.pt / 12
from
  v_table_a
where
  players.uid = v_table_a."userUID";

WITH
  v_table_name AS (
    SELECT
      uid,
      (
        case
          when "rating" is not null then RANK() OVER (
            ORDER BY
              "rating" desc nulls last
          )
        end
      ) as ab
    FROM
      players
  )
UPDATE
  players
set
  "rank" = v_table_name.ab
FROM
  v_table_name
WHERE
  players.uid = v_table_name.uid;

WITH
  v_table_name AS (
    SELECT
      id,
      (
        case
          when "rating" is not null then RANK() OVER (
            ORDER BY
              "rating" desc nulls last
          )
        end
      ) as ab
    FROM
      levels
  )
UPDATE
  levels
set
  "rank" = v_table_name.ab
FROM
  v_table_name
WHERE
  levels.id = v_table_name.id;
end