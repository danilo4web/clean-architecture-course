create schema ccca;

create table ccca.item(
    id          serial,
    description text,
    price       numeric,
    height      integer,
    width       integer,
    length      integer,
    weight      integer
);

create table ccca.coupon(
    code        text,
    percentage  numeric,
    expire_date timestamp,
    primary key (code)
);

create table ccca.order(
    id          serial,
    coupon_code text,
    code        text,
    cpf         text,
    issue_date  timestamp,
    freight     numeric,
    serial      integer,
    primary key (id)
);

create table ccca.order_item(
    id_order integer,
    id_item  integer,
    price    numeric,
    quantity integer,
    primary key (id_order, id_item)
);