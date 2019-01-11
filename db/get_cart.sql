select c.id, p.img, p.price, c.user_id from photos p  
inner join cart c on p.id = c.photo_id
where user_id = $1