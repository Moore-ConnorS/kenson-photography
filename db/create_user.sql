insert into users (name, picture, email, auth0_id)
values (${name}, ${picture}, ${email}, ${auth0_id})
returning *;