
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 03/23/2020 00:43:20
-- Generated from EDMX file: C:\Users\acer\source\repos\PROIECT_GALERIE\PROIECT_GALERIE\Galerie.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [dbGalerie];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------


-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'PropertiesSet'
CREATE TABLE [dbo].[PropertiesSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Description] nvarchar(max)  NOT NULL,
    [MediaId] int  NOT NULL
);
GO

-- Creating table 'MediaSet'
CREATE TABLE [dbo].[MediaSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Path] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'PropertiesSet'
ALTER TABLE [dbo].[PropertiesSet]
ADD CONSTRAINT [PK_PropertiesSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MediaSet'
ALTER TABLE [dbo].[MediaSet]
ADD CONSTRAINT [PK_MediaSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [MediaId] in table 'PropertiesSet'
ALTER TABLE [dbo].[PropertiesSet]
ADD CONSTRAINT [FK_MediaProperties]
    FOREIGN KEY ([MediaId])
    REFERENCES [dbo].[MediaSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MediaProperties'
CREATE INDEX [IX_FK_MediaProperties]
ON [dbo].[PropertiesSet]
    ([MediaId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
SELECT * FROM MediaSet;