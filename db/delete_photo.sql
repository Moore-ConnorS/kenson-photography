delete from photos where id = $1
returning *;