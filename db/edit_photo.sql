update photos set description = $2, price = $3
where id = $1
returning *;