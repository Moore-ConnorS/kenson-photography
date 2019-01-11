drop table if exists photos;

create table if not exists photos (
 id serial primary key,
 img text unique,
 description text
 );

insert into photos (img, description)
values ('http://www.youandthemat.com/wp-content/uploads/nature-2-26-17.jpg', 'lorm ipsum sit amet, something something filler filler I found on the internet');
 
insert into photos (img, description)
values ('https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg', 'lorem ipsum blag blah blah its fancy latin and whatever');

-- /////////////////////////////////////////////

drop table if exists users;

create table if not exists users (
    id serial primary key,
    name varchar(75) not null,
    picture text,
    email varchar(100) not null unique,
    auth0_id text not null
);

select * from users

-- //////////////////////////////////////////////////////

drop table if exists cart;

create table if not exists cart (
    id serial,
    user_id int,
    photo_id int,
    photo_url text,
    primary key (id),
    foreign key (user_id) references users(id),
    foreign key (photo_id) references photos(id),
    foreign key (photo_url) references photos(img)
);

insert into cart (user_id, photo_id, photo_url)
values(1, 1, 'http://www.youandthemat.com/wp-content/uploads/nature-2-26-17.jpg');

insert into cart (user_id, photo_id, photo_url)
values(2, 1, 'http://www.youandthemat.com/wp-content/uploads/nature-2-26-17.jpg')