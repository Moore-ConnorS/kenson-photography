update photos set description = $2
where id = $1
returning *;