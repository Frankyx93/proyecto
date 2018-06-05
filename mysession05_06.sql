-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2018 a las 13:48:38
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mysession`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesstoken`
--

CREATE TABLE `accesstoken` (
  `id` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text COLLATE utf8_spanish2_ci,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `accesstoken`
--

INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES
('0ImsiwOlFRdYsVOMYNCBKU6BL25uGtOhiIIclxcqAeb2LAHnIykqkR7sBSqdpBcg', 1209600, NULL, '2018-06-05 12:43:16', 1),
('2xsEcuTHGWkxk4mivVj7HbVCTSc0LC8H7634cKnBOCKw5hWEcAGZjkYyyYkTeL0d', 1209600, NULL, '2018-06-05 09:47:22', 6),
('3D4w4Iqh3NfdIjYN20cbMtGSGlwNRw08dGE0ERPtciVrwUcGTAHeLtDLkMsfDoot', 1209600, NULL, '2018-06-05 09:37:22', 1),
('8vnapBO1CDP0UgO8CKIgeFxvuHBH64FUgQGjlxjRXtNCNQDEoXEpLeTx7cDKxKLi', 1209600, NULL, '2018-06-05 09:58:44', 1),
('ayAKAe9ojKRYjfMdaeaAGayMbQRLU7hL4opNnqlyrtJS2hSI6q5NESJYfxBm3FKa', 1209600, NULL, '2018-06-05 09:03:32', 1),
('bmdQNyGYy2tHlwHuVJQwpyskEh1Zmfa2egbNgJy8aWfhiG8U7hHdUtzVgrLGRJQE', 1209600, NULL, '2018-06-05 09:35:50', 1),
('BQlYT4xDfzsnOUJk86z78leekOvkBF7GSCvghIIklbqetBSByJQFYUaW2JEOV3wQ', 1209600, NULL, '2018-06-04 11:42:13', 1),
('CZNn1WPPiENSA8yrrOHxRcXuBjnjpKqRoFBJTyFwrpdACMndF9CXpNXfrPdXgZbB', 1209600, NULL, '2018-06-04 12:34:34', 1),
('dKaqVesI74GvKXn1BFjoMmFbUv6RNfJrbL9LWEeV8qbtReWinQ2J22zqkh8ZJUsI', 1209600, NULL, '2018-06-05 09:14:46', 3),
('gdQBrE81iEiPY63H6E9U5OMozFgKXCuA8SvcRBdNLE75nMrJ7znuEQ1iEf4ME9ya', 1209600, NULL, '2018-06-05 12:42:51', 2),
('hHmFAibg3clpSFrblNNHFiSjdEG6z4n4TETxHfCgxFdaccXJtWWRN88yIkAFoyT4', 1209600, NULL, '2018-06-04 12:37:14', 1),
('htuhgdUuJ7oUkevYxgzWyAG01D0aUF8XSPv9NTRzE3IWjbFI52gIyLTE4zdKFOyB', 1209600, NULL, '2018-06-05 13:34:16', 1),
('j6suUadWE1D6QM4dmdXtRK1hbdugvfA0vKUWE42fn6QNsuEeTgeoC11QltuiVvL7', 1209600, NULL, '2018-06-05 08:58:23', 1),
('n4HYj3gdD6rLSjz1ugImA69OBEYqw4buxAfHvHsiz3Fbc4Hr0oZDsZKdUYnsWJHv', 1209600, NULL, '2018-06-05 09:11:36', 1),
('QJLpAcqQekyIT735G2t2AFTJuF51RYxVSSjDnwH3lWgFYZOvyMYkHoOwTKPduyKw', 1209600, NULL, '2018-06-05 09:05:10', 2),
('QT92OGbyvOxkcxW7XtD1Oj8rzHzM43HbuRMoXnkSmkCjr5UakchW3CLXlVHVcY9p', 1209600, NULL, '2018-06-05 11:20:08', 1),
('qXALiElKM6NBOTk1tWm8so6Grhi2Cvvmziav3z2Sy34CeX6MCfuzq5cyLg0SFeWR', 1209600, NULL, '2018-06-04 09:15:57', 1),
('QxYTonn2d3ALbUf4bGZQFyGcXkL8HcmGsPQfGBHRgsVjEUafJr5PGD7hD5WW6v5H', 1209600, NULL, '2018-06-04 08:25:06', 1),
('RGsMGFO6WEYMbHyFkybU4m1VEP5LmHgrS1uvGcc6jnWJjNxiWLKsEtUuQWAHPoEZ', 1209600, NULL, '2018-06-05 09:59:58', 10),
('S1aG7l3QNyGNdoX1L48F26grQ0jJv96Wnf2AeRSBnClqNBEWDdJp80dlGxnCUTsu', 1209600, NULL, '2018-06-04 12:48:12', 1),
('tBqtuEHYNO4V2dBJhlBQXXz6l2qpzL0rCJ5NzXJaLchHoDuqneUa43JOpvS4whcb', 1209600, NULL, '2018-06-05 11:42:03', 1),
('x4CUaBrn7DNMV2lcrMemyywNvVkqfLfUDwUeCaIeDvmeytalzHBwbY1dlo0a6z2c', 1209600, NULL, '2018-06-04 12:36:22', 1),
('xCf4Vpr5s8CdkitDwHfy3naAvJwUBYw3cJXOCN4FuG796kbX2HocAmknzsHY0J7v', 1209600, NULL, '2018-06-05 13:32:44', 3),
('zf6Hv0TqLtbMVDlFhaPqAnTlQqoYvu4DFE8qLVeejV3pxnrx4FeYcHeBEkR8Bc39', 1209600, NULL, '2018-06-04 12:56:48', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acl`
--

CREATE TABLE `acl` (
  `id` int(11) NOT NULL,
  `model` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `property` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `accessType` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `permission` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `principalType` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `principalId` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `ejercicioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `ejercicioId`) VALUES
(2, 'Giros', NULL),
(3, 'Saltos', NULL),
(4, 'Lateralidad', NULL),
(5, 'Equilibrio', NULL),
(6, 'Coordinación', NULL),
(7, 'Esquema Corporal', NULL),
(8, 'Predeportivos', NULL),
(9, 'Orientación Espacial', NULL),
(10, 'Lanzamientos', NULL),
(11, 'Desplazamientos', NULL),
(12, 'Calentamiento', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `descripcion` varchar(512) DEFAULT NULL,
  `duracion` varchar(512) DEFAULT NULL,
  `deporte` varchar(512) DEFAULT 'psicomotricidad',
  `imagen` varchar(512) DEFAULT NULL,
  `imagen2` varchar(512) DEFAULT NULL,
  `categoriaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ejercicio`
--

INSERT INTO `ejercicio` (`id`, `nombre`, `descripcion`, `duracion`, `deporte`, `imagen`, `imagen2`, `categoriaId`) VALUES
(1, 'Cazador', 'Un alumno llevará una pelota en las manos y para pillar al resto deberá de lanzarles la pelota, los alumnos que sean golpeados por la pelota irán a la zona de eliminados a esperar a que algún compañero les choque la mano para ser salvados', 'Entre 5 y 10 minutos', 'psicomotricidad', 'http://4.bp.blogspot.com/-hFXWkM83m48/Vi_QCyOFJwI/AAAAAAAAAlY/7gMgN3g4Duc/s1600/Quema%2Bbalon-prisionero%2Bk3.jpg', 'http://4.bp.blogspot.com/-hFXWkM83m48/Vi_QCyOFJwI/AAAAAAAAAlY/7gMgN3g4Duc/s1600/Quema%2Bbalon-prisionero%2Bk3.jpg', 10),
(2, 'La Araña', 'Los participantes se situaran a un lado, en el medio estara la \"araña\", y estos trataran de cruzar de un lado a otro sin ser atrapados por la araña. El que sea atrapado se unira como araña.', 'Entre 5 y 10 minutos', 'psicomotricidad', 'http://3.bp.blogspot.com/-rFoqOOBPVsc/TzHDHLAJmcI/AAAAAAAAANY/aJr8QEFM9t4/s320/LAMURALLA.jpg', 'http://3.bp.blogspot.com/-rFoqOOBPVsc/TzHDHLAJmcI/AAAAAAAAANY/aJr8QEFM9t4/s320/LAMURALLA.jpg', 11),
(3, 'Movilidad Articular', 'Vamos moviendo todas las articulaciones 1 por 1, es importante que aprovechemos este momento para preguntarles a los niños por las distintas partes del cuerpo, o es una buena oportunidad para repasar los números', '5 minutos', 'psicomotricidad', NULL, NULL, 12),
(4, 'Zapatilla por detrás', 'situados en circulo hay uno que la liga, se encuentra por fuera del circulo dando vueltas alrededor de este. El que la liga tendra un objeto en la mano el cual soltara detras que algun miembro del circulo. Este miembro debe perseguir al que la ligaba, el que la ligaba debia llegar a quitarle el sitio al otro rodeando el circulo. Si llega antes se cambia el que la liga, si le pilla sigue ligando él.\r\nVariantes: con la pata coja, por parejas, sentados en sillas.', 'Entre 5 y 10 minutos', 'psicomotricidad', 'https://replicat.net/wp-content/uploads/2016/04/colica2.jpg', 'http://www.juegostradicionalesaragoneses.com/juegos/images/colica1.jpg', 11),
(5, 'Estatuas', 'Un jugador “la queda”. Este debe pillar a alguno de los demás jugadores tocándolo. Para no ser pillado, el jugador gritará “estatua” y se quedara inmóvil con las piernas abiertas hasta que otro jugador lo rescate pasando por debajo. Cuando el que se la queda pilla a alguien antes de que diga “estatua”, se cambian los papeles, y este será ahora el que \" la queda\".', '10 minutos', 'psicomotricidad', 'https://dexte.wikispaces.com/file/view/estatuas.jpg/284352290/369x263/estatuas.jpg', NULL, 11),
(6, 'Roba Balones', 'Los alumnos se dividen en 2 equipos, cada equipo tiene un campo donde están sus valones, y tiene que intentar coger los balones del equipo contrario sin que los integrantes del otro equipo cojan los suyos', '10 minutos', 'psicomotricidad', 'https://dexte.wikispaces.com/file/view/robabalones.jpg/336001348/800x449/robabalones.jpg', NULL, 11),
(7, 'Pelotas fuera', 'Los alumnos se dividirán en 2 equipos, uno en cada mitado del campo. Cada equipo tendrá 10 balones en su campo. El juego consiste en lanzar las pelotas al campo contrario para intentar que el campo de tu equipo se quede vacio de balones. En un minuto quien menos valones tenga en su campo gana.', NULL, 'psicomotricidad', 'https://dexte.wikispaces.com/file/view/pelotas_fuera_kk.jpg/338233906/800x449/pelotas_fuera_kk.jpg', NULL, 10),
(8, 'Pelota Sentada', 'No existen grupos preestablecidos, la persona/as con balón no pueden desplazarse ni realizar pases a nadie. Se trata de un juego de eliminación, cuando el balón es lanzado sin que bote en el suelo y le da a algún compañero, este se sienta en el suelo a la espera que reciba de nuevo el balón (por pase de otro jugador sentado o por coger un balón \'\'perdido\'\') y entre de nuevo en el juego.', 'Entre 10 y 15 minutos', 'psicomotricidad', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChaa3liowEsvgsMgP42np_g3JQCyPAdrGJaJUmJmhg5RAixARow', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3FUVLSpmsmkb8OSVRqPdKce3QFAR58kchqUj1KUsH9epbzrVGQ', 10),
(9, 'La cadena', 'Uno de los alumnos \"la lleva\" y tiene que pillar al resto. A medida que van pillando gente se unen formando una cadena y continúan con el juego hasta que pillen a todos o el monitor ponga fin al juego. La cadena no se puede romper y solo pueden pillar los extremos de la cadena.', 'Entre 5 y 10 minutos', 'psicomotricidad', 'https://iessanroque.educarex.es/departamentos/edufisica/juegosppopularesextremenos_clip_image007_0000.gif', NULL, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejerciciossesion`
--

CREATE TABLE `ejerciciossesion` (
  `id` int(11) NOT NULL,
  `parteSesion` int(11) DEFAULT '0',
  `orden` int(11) DEFAULT '0',
  `idSesion` int(11) DEFAULT NULL,
  `idEjercicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ejerciciossesion`
--

INSERT INTO `ejerciciossesion` (`id`, `parteSesion`, `orden`, `idSesion`, `idEjercicio`) VALUES
(1, 0, 0, 1, 1),
(2, 0, 0, 1, 2),
(3, 0, 0, 1, 3),
(4, 0, 0, 1, 4),
(5, 0, 0, 2, 1),
(6, 0, 0, 2, 2),
(7, 0, 0, 2, 3),
(8, 0, 0, 2, 4),
(9, 0, 0, 3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `horario` varchar(512) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id`, `nombre`, `horario`, `usuarioId`) VALUES
(1, 'Psicomotricidad 1', 'L X V', 1),
(2, 'Psicomotricidad 2', 'M J', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(512) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolemapping`
--

CREATE TABLE `rolemapping` (
  `id` int(11) NOT NULL,
  `principalType` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `principalId` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuarioId` int(11) DEFAULT NULL,
  `grupoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id`, `nombre`, `fecha`, `usuarioId`, `grupoId`) VALUES
(1, 'Sesion 1', '2018-06-04 08:21:47', 1, 1),
(2, 'Sesion 2', '2018-10-04 02:00:00', 1, 2),
(3, 'Saltos', '2018-06-04 09:51:47', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `realm` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `username` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `password` varchar(512) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_spanish2_ci NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(512) NOT NULL,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `realm`, `username`, `password`, `email`, `emailVerified`, `verificationToken`) VALUES
(1, 'Fran', '', 'Fran Marcos', '$2a$10$ofKk4ktdqHClFxYvblK/nu8D3VY2LdkPIsfwoU3Mepla0lPwboFuG', 'fran@fran.com', 0, 'c0d1895c14489afa901dfefbf2754b2cfd0ae4b93dc0883599de47f4827c01f14cb990bfaeddfadec6795121cc7b69b8446cdbf4f12b9a89269d7375559ae154'),
(2, 'Fatima', '', 'Fatima Zahra', '$2a$10$GYKQC/C/xWZV1Bbw.WfJS.ql7s9CV0m64doLuEoRec521NsqJ29ra', 'fatima@fatima.com', 0, NULL),
(3, 'Jurado 1', NULL, NULL, '$2a$10$pKidE78IsiNVmwfECCvVH.6BQz1gWieQxYmrMo4dTSuLYTgMH7Oe2', 'jurado1@proyecto.com', NULL, NULL),
(4, 'Jurado 2', NULL, NULL, '$2a$10$fFpXSYJcbdL41aAGXBnA..nyfMcbV98.3KsBcqZ2p3VCGa5F.h9jK', 'jurado2@proyecto.com', NULL, NULL),
(5, 'Jurado 3', NULL, NULL, '$2a$10$Hpi7c7Ps/BJfrIhoL9szXueZEVegh2o.uvMgOXA.RzenSHtE/UOfG', 'jurado3@proyecto.com', NULL, NULL),
(9, 'prueba', NULL, NULL, '$2a$10$FMV7lQijKbf1/j2xEzX18.Oih/7tyraNn3VEM2GWS2LUC.WqNp0sO', 'prueba@prueba.com', NULL, NULL),
(10, 'Prueba', NULL, NULL, '$2a$10$Uo0kAfaUWt6zOHiUeikkdOKAdbt3SfTFGTWBQ.2R.CNVtUATvPcIC', 'prueba1@prueba.com', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesstoken`
--
ALTER TABLE `accesstoken`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `acl`
--
ALTER TABLE `acl`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ejerciciossesion`
--
ALTER TABLE `ejerciciossesion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rolemapping`
--
ALTER TABLE `rolemapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `principalId` (`principalId`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acl`
--
ALTER TABLE `acl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ejerciciossesion`
--
ALTER TABLE `ejerciciossesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rolemapping`
--
ALTER TABLE `rolemapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
