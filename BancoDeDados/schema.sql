create table if not exists usuarios (
id serial primary key,
nome text not null,
cpf varchar(14) not null unique,
email text not null unique,
senha text not null
)