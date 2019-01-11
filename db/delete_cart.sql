delete from cart where id = $1
returning *;