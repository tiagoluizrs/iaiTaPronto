-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Máquina: cpmy0031.servidorwebfacil.com
-- Data de Criação: 22-Nov-2016 às 01:59
-- Versão do servidor: 5.1.66-community-log
-- versão do PHP: 5.3.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `tiago_tcc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__conversa`
--

CREATE TABLE IF NOT EXISTS `data__conversa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `dataCadastro` datetime NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `data__conversa`
--

INSERT INTO `data__conversa` (`id`, `titulo`, `dataCadastro`, `estado`) VALUES
(1, 'Conversa Padrão', '2016-11-21 00:00:00', 1),
(2, '2969b1f5bd1cde68875519945b0e01c9', '2016-11-21 22:14:35', 1),
(3, '208615f3c04d82a9bbd0c44591f88d6c', '2016-11-21 22:15:50', 1),
(4, 'a79d561f11286d903617c0bf1796bf0f', '2016-11-21 22:16:30', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__empresa`
--

CREATE TABLE IF NOT EXISTS `data__empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(14) DEFAULT NULL,
  `dataCadastro` datetime NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data__empresa_data__usuario_idx` (`usuario_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `data__empresa`
--

INSERT INTO `data__empresa` (`id`, `nome`, `email`, `telefone`, `dataCadastro`, `estado`, `usuario_id`) VALUES
(1, 'Coca-cola', 'coca@gmail.com', '21 3331-0025', '2016-11-21 22:23:34', 1, 7);

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__evento`
--

CREATE TABLE IF NOT EXISTS `data__evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` longtext,
  `dataCadastro` datetime NOT NULL,
  `dataInicio` datetime NOT NULL,
  `dataTermino` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data__evento_data__usuario1_idx` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__mensagem`
--

CREATE TABLE IF NOT EXISTS `data__mensagem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mensagem` longtext NOT NULL,
  `dataCadastro` datetime NOT NULL,
  `conversa_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `alias` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data__mensagem_data__conversa1_idx` (`conversa_id`),
  KEY `fk_data__mensagem_data__usuario1_idx` (`usuario_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `data__mensagem`
--

INSERT INTO `data__mensagem` (`id`, `mensagem`, `dataCadastro`, `conversa_id`, `usuario_id`, `alias`) VALUES
(1, 'Boa noite.', '2016-11-21 22:24:52', 3, 7, 'P Franca'),
(2, 'Tenho algumas dúvidas à tirar', '2016-11-21 22:24:59', 3, 7, 'P Franca'),
(3, 'Olá senhor José Francisco, em que posso lhe ajudar?', '2016-11-21 22:26:00', 3, 4, 'Brendha França');

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__notificacao`
--

CREATE TABLE IF NOT EXISTS `data__notificacao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL,
  `dataCadastro` datetime NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__participante`
--

CREATE TABLE IF NOT EXISTS `data__participante` (
  `usuario_id` int(11) NOT NULL,
  `projeto_id` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0',
  KEY `fk_data__participante_data__usuario1_idx` (`usuario_id`),
  KEY `fk_data__participante_data__projeto1_idx` (`projeto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__projeto`
--

CREATE TABLE IF NOT EXISTS `data__projeto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` longtext,
  `dataCadastro` datetime NOT NULL,
  `dataEntrega` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data__projeto_data__usuario1_idx` (`usuario_id`),
  KEY `fk_data__projeto_data__empresa1_idx` (`empresa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__tarefa`
--

CREATE TABLE IF NOT EXISTS `data__tarefa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` longtext,
  `dataCadastro` datetime NOT NULL,
  `dataEntrega` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  `projeto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_data__tarefa_data__projeto1_idx` (`projeto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__usuario`
--

CREATE TABLE IF NOT EXISTS `data__usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `nomeUsuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `dataCadastro` datetime NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0',
  `cpf` varchar(14) NOT NULL,
  `codigoConfirmacao` varchar(255) NOT NULL,
  `codigoRecuperacao` varchar(255) NOT NULL,
  `funcao` int(11) NOT NULL DEFAULT '3',
  `acesso` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomeUsuario_UNIQUE` (`nomeUsuario`),
  UNIQUE KEY `codigoConfirmacao_UNIQUE` (`codigoConfirmacao`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `codigoRecuperacao_UNIQUE` (`codigoRecuperacao`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Extraindo dados da tabela `data__usuario`
--

INSERT INTO `data__usuario` (`id`, `nome`, `email`, `nomeUsuario`, `senha`, `dataCadastro`, `estado`, `cpf`, `codigoConfirmacao`, `codigoRecuperacao`, `funcao`, `acesso`) VALUES
(1, 'Tiago Luiz', 'tiago@tiagoluizweb.com.br', 'tiagoluizrs', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:04:00', 1, '147.225.497-02', '60e715b14818140f7c1e96100eafcc49', 'c5b9bbf64614c389a31476f1492f63ea', 1, 9),
(4, 'Brendha França', 'contato.brendha1@gmail.com', 'Brendha França', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:13:48', 1, '863.894.259-10', 'dad879e261152823f01e8e427968b757', 'e0624e63b26d40e0200c1878763270d6', 2, 0),
(5, 'Leonardo Ciote', 'leonardo.cioti@gmail.com', 'Leonardo Cioti', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:14:35', 1, '609.430.152-86', '0f8c847d20f073f35d201fdd1f40863e', '6c018b68fb59c83f8c681a2d134011c7', 3, 0),
(6, 'Andréa Ribeiro', 'andrea.ribeiro@gmail.com', 'Andréa Ribeiro', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:15:15', 0, '342.773.537-03', '182f96dd6505f3017725ec28c96b20d1', 'f4a5edd10e63ef8c611ce89fc0a23082', 2, 1),
(7, 'José Francisco', 'prfranca49@gmail.com', 'P Franca', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:15:50', 1, '812.917.642-40', '95d98abf87993a33e6fe78f8e61d4c48', '8f3da24194d249e251600f74c9aa183d', 3, 1),
(8, 'Hamilton Luiz', 'hluiz@gmail.com', 'Hamilton Luiz', '202cb962ac59075b964b07152d234b70', '2016-11-21 22:16:30', 1, '147.146.758-93', 'ff52ae2752f81de1d28b08ded4959814', '7cd7d090aaf0d9b514b9f3b0ffe5bf0c', 3, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__usuario_conversa`
--

CREATE TABLE IF NOT EXISTS `data__usuario_conversa` (
  `conversa_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  KEY `fk_data__usuario_conversa_data__conversa1_idx` (`conversa_id`),
  KEY `fk_data__usuario_conversa_data__usuario1_idx` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `data__usuario_conversa`
--

INSERT INTO `data__usuario_conversa` (`conversa_id`, `usuario_id`) VALUES
(1, 4),
(2, 4),
(2, 5),
(1, 6),
(3, 7),
(4, 4),
(4, 8),
(3, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__usuario_notificacao`
--

CREATE TABLE IF NOT EXISTS `data__usuario_notificacao` (
  `usuario_id` int(11) NOT NULL,
  `notificacao_id` int(11) NOT NULL,
  KEY `fk_data__usuario_notificacao_data__usuario1_idx` (`usuario_id`),
  KEY `fk_data__usuario_notificacao_data__notificacao1_idx` (`notificacao_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `data__usuario_tarefa`
--

CREATE TABLE IF NOT EXISTS `data__usuario_tarefa` (
  `usuario_id` int(11) NOT NULL,
  `tarefa_id` int(11) NOT NULL,
  KEY `fk_data__usuario_tarefa_data__usuario1_idx` (`usuario_id`),
  KEY `fk_data__usuario_tarefa_data__tarefa1_idx` (`tarefa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `data__empresa`
--
ALTER TABLE `data__empresa`
  ADD CONSTRAINT `fk_data__empresa_data__usuario` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__evento`
--
ALTER TABLE `data__evento`
  ADD CONSTRAINT `fk_data__evento_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__mensagem`
--
ALTER TABLE `data__mensagem`
  ADD CONSTRAINT `fk_data__mensagem_data__conversa1` FOREIGN KEY (`conversa_id`) REFERENCES `data__conversa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__mensagem_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__participante`
--
ALTER TABLE `data__participante`
  ADD CONSTRAINT `fk_data__participante_data__projeto1` FOREIGN KEY (`projeto_id`) REFERENCES `data__projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__participante_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__projeto`
--
ALTER TABLE `data__projeto`
  ADD CONSTRAINT `fk_data__projeto_data__empresa1` FOREIGN KEY (`empresa_id`) REFERENCES `data__empresa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__projeto_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__tarefa`
--
ALTER TABLE `data__tarefa`
  ADD CONSTRAINT `fk_data__tarefa_data__projeto1` FOREIGN KEY (`projeto_id`) REFERENCES `data__projeto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__usuario_conversa`
--
ALTER TABLE `data__usuario_conversa`
  ADD CONSTRAINT `fk_data__usuario_conversa_data__conversa1` FOREIGN KEY (`conversa_id`) REFERENCES `data__conversa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__usuario_conversa_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__usuario_notificacao`
--
ALTER TABLE `data__usuario_notificacao`
  ADD CONSTRAINT `fk_data__usuario_notificacao_data__notificacao1` FOREIGN KEY (`notificacao_id`) REFERENCES `data__notificacao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__usuario_notificacao_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `data__usuario_tarefa`
--
ALTER TABLE `data__usuario_tarefa`
  ADD CONSTRAINT `fk_data__usuario_tarefa_data__tarefa1` FOREIGN KEY (`tarefa_id`) REFERENCES `data__tarefa` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_data__usuario_tarefa_data__usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `data__usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
