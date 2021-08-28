INSERT INTO ccca.item (id, description, price, height, width, length, weight) VALUES
(1, 'Guitarra', 1000, 100, 50, 15, 3),
(2, 'Amplificador', 5000, 50, 50, 50, 22),
(3, 'Cabo', 30, 10, 10, 10, 1);

INSERT INTO ccca.coupon (code, percentage, expire_date) values
('VALE20', 20, '2021-10-10'),
('VALE20_EXPIRED', 20, '2020-10-10');
