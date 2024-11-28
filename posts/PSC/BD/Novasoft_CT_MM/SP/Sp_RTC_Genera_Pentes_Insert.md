# Stored Procedure: Sp_RTC_Genera_Pentes_Insert

## Usa los objetos:
- [[RTC_Pendencies]]
- [[RTC_Tablas]]
- [[sp_RTC_GeneraHistoricos]]

```sql
-- =============================================
-- Author:		Ricardo Santamaría Vanegas
-- Create date: Enero 27 de 2022
-- Description:	Genera los eventos de insert en pendientes de actualización de todos los registros existentes en las tablas seleccionadas para la integración
-- =============================================
CREATE PROCEDURE [dbo].[Sp_RTC_Genera_Pentes_Insert]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @cMsg NVARCHAR(MAX);
    DECLARE @nTotTab INT;
    DECLARE @nNomTab SYSNAME;
    DECLARE @cCamposLlaveConcat NVARCHAR(MAX);
    DECLARE @cWhereCamposLLave NVARCHAR(MAX);
    DECLARE @cCadena NVARCHAR(MAX);

/*
Elaboración de una lista de tablas asignando el nivel de dependencia
para saber el orden en que deben relacionarse los inserts
*/

    DECLARE @nNivel TINYINT = 0;
    DECLARE @nTabsIns SMALLINT = 0;

    DECLARE @RelaAdic TABLE(
	    Tabla    SYSNAME COLLATE database_default,
	    TablaRel SYSNAME COLLATE database_default
					  );

/*
Se informa el ID del último pendiente de actualización
*/
    SELECT 'ID del último pendiente de Actualización antes del proceso' = MAX(ID)
    FROM RTC_Pendencies;

/*
Se ingresan las tablas que tienen una prioridad específica, deben quedar en el máximo nivel
*/
    DECLARE @TablasOrdEsp TABLE(
	    Orden INT IDENTITY(1, 1),
	    Tabla SYSNAME COLLATE database_default,
	    Nivel SMALLINT DEFAULT 250
						 );

    INSERT INTO @TablasOrdEsp( Tabla )
    VALUES
		 (
		 'gen_paises' ),
		 (
		 'gen_deptos' ),
		 (
		 'gen_ciudad' ),
		 (
		 'gen_Barrios' ),
		 (
		 'gen_compania' ),
		 (
		 'gen_sucursal' ),
		 (
		 'gen_ccosto' ),
		 (
		 'rhh_cargos' ),
		 (
		 'gth_Areas' ),
		 (
		 'rhh_emplea' );

/*
Se ingresan las relaciones que deben darse para la integración pero que no tienen integridad referencial
--------------------------------------------------------------
*/
    INSERT INTO @RelaAdic
    VALUES
		 (
		 'gen_sucursal', 'gen_compania' ),
		 (
		 'gen_ccosto', 'gen_sucursal' ),
		 (
		 'rhh_hcm_r038hlo', 'rhh_emplea' ),
		 (
		 'rhh_hcm_r038hfi', 'rhh_emplea' ),
		 (
		 'rhh_hcm_r038hca', 'rhh_emplea' ),
		 (
		 'rhh_hcm_r038ccu', 'rhh_emplea' ),
		 (
		 'rhh_hcm_r034fun', 'rhh_emplea' );
    --------------------------------------------------------------
    DECLARE @TablasTemp TABLE(
	    NumTab      SMALLINT IDENTITY(1, 1),
	    Origen      CHAR(1), /*O Orden específico, 
						  I: Tablas iniciales, 
						  S: Tablas identificadas por integridad referencial, 
						  A: Tablas sin integridad referencial que para la integración deben mantener una relación*/
	    Nivel       SMALLINT,
	    NombreTabla SYSNAME COLLATE database_default,
	    Orden       INT DEFAULT 1000
					    );

    DECLARE @Tablas TABLE(
	    NumTab      SMALLINT IDENTITY(1, 1),
	    Nivel       SMALLINT,
	    NombreTabla SYSNAME COLLATE database_default,
	    CamposLlave NVARCHAR(MAX) DEFAULT NULL,
	    WhereCampos NVARCHAR(MAX) DEFAULT NULL
					);

    INSERT INTO @TablasTemp( Origen,
					    Nivel,
					    NombreTabla,
					    Orden
					  )
    SELECT 'O',
		 Nivel,
		 Tabla,
		 Orden
    FROM @TablasOrdEsp AS T
    WHERE Tabla IN( SELECT Nom_Tabla
				FROM RTC_Tablas );

    INSERT INTO @TablasTemp( Origen,
					    Nivel,
					    NombreTabla
					  )
    SELECT 'I',
		 @nNivel,
		 T.Nom_Tabla
    FROM RTC_Tablas AS T
    WHERE T.Nom_Tabla NOT IN( SELECT NombreTabla
						FROM @TablasTemp );

    SELECT @nTabsIns = COUNT(NombreTabla)
    FROM @TablasTemp;

    WHILE @nTabsIns > 0
    BEGIN
	   SET @nNivel = @nNivel + 1;

	   INSERT INTO @TablasTemp( Origen,
						   Nivel,
						   NombreTabla
						 )
	   SELECT DISTINCT
			'S',
			@nNivel,
			OBJECT_NAME(fc.referenced_object_id) AS TabRefer
	   FROM sys.foreign_keys AS F
	   INNER JOIN sys.foreign_key_columns AS FC ON FC.parent_object_id = F.parent_object_id
										  AND FC.referenced_object_id = F.referenced_object_id
	   INNER JOIN sys.syscolumns AS C ON C.id = F.parent_object_id AND C.colid = FC.parent_column_id
	   INNER JOIN sys.syscolumns AS CR ON CR.id = F.referenced_object_id AND CR.colid = FC.referenced_column_id
	   INNER JOIN @TablasTemp AS T ON F.parent_object_id = OBJECT_ID(T.NombreTabla) AND T.Nivel = (@nNivel - 1)
	   WHERE OBJECT_NAME(F.referenced_object_id) <> T.NombreTabla
		    AND OBJECT_NAME(F.referenced_object_id) IN( SELECT NombreTabla
											   FROM @TablasTemp
											   WHERE Nivel = 0 )
	   UNION ALL
	   SELECT DISTINCT
			'A',
			@nNivel,
			Ra.TablaRel
	   FROM @RelaAdic AS Ra
	   INNER JOIN @TablasTemp AS T ON T.NombreTabla = Ra.Tabla AND T.Nivel = (@nNivel - 1)
	   WHERE Ra.TablaRel <> T.NombreTabla
		    AND Ra.Tabla IN( SELECT NombreTabla
						 FROM @TablasTemp
						 WHERE Nivel = 0 );

	   SET @nTabsIns = @@ROWCOUNT;

    END;

    WITH MaxNivTabla
	    AS (SELECT MAX(Nivel) AS Nivel,
				MIN(Orden) AS Orden,
				NombreTabla
		   FROM @TablasTemp
		   GROUP BY NombreTabla),
	    Tablas
	    AS (SELECT T.Nivel,
				T.NombreTabla,
				T.Orden
		   FROM @TablasTemp AS T
		   INNER JOIN MaxNivTabla AS N ON N.Nivel = T.Nivel AND N.NombreTabla = T.NombreTabla)
	    INSERT INTO @Tablas( Nivel,
						NombreTabla
					   )
	    SELECT T.Nivel,
			 T.NombreTabla
	    FROM Tablas AS T
	    INNER JOIN MaxNivTabla AS N ON N.Nivel = T.Nivel AND N.NombreTabla = T.NombreTabla
			 ORDER BY T.Nivel DESC,
					T.Orden ASC;

    SET @nTotTab = @@ROWCOUNT;

/*
Por cada tabla se determina la cadena que se usará parea registrar el insert por cada registro según su llave
*/
    DECLARE @nTab INT = 1;

    WHILE @nTab <= @nTotTab
    BEGIN
	   SELECT @nNomTab = T.NombreTabla
	   FROM @Tablas AS T
	   WHERE T.NumTab = @nTab;

	   SET @cCamposLlaveConcat = NULL;
	   SET @cWhereCamposLLave = NULL;

	   WITH LlavePrim
		   AS (SELECT COL_NAME(ic.object_id, ic.column_id) AS column_name,
				    TYPE_NAME(C.user_type_id) AS column_type,
				    key_ordinal
			  FROM sys.indexes AS i
			  INNER JOIN sys.index_columns AS ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
			  INNER JOIN sys.columns AS C ON C.object_id = i.object_id AND C.column_id = ic.column_id
			  WHERE i.is_primary_key = 1 AND i.object_id = OBJECT_ID(@nNomTab))
		   SELECT @cCamposLlaveConcat = COALESCE(@cCamposLlaveConcat + '+'' AND ', '''') + column_name + IIF(column_type IN('int', 'numeric',
		   'real', 'float', 'money', 'smallint', 'tinyint', 'bigint', 'smallmoney', 'bit'), '=''+', '=''''''+') + IIF(column_type IN('datetime',
		   'date'), 'RTRIM(CONVERT(VARCHAR,' + column_name + ',112))', 'RTRIM(' + column_name + ')') + IIF(column_type IN('int', 'numeric', 'real',
		   'float', 'money', 'smallint', 'tinyint', 'bigint', 'smallmoney', 'bit'), '', '+'''''''''),
				@cWhereCamposLLave = COALESCE(@cWhereCamposLLave + ' AND ', ' WHERE ') + column_name + ' <> ' + IIF(column_type IN('int',
				'numeric', 'real', 'float', 'money', 'smallint', 'tinyint', 'bigint', 'smallmoney', 'bit'), '0', IIF(column_type IN('date',
				'datetime'), '''19000101''', '''0'''))
		   FROM LlavePrim
				ORDER BY key_ordinal;

	   UPDATE @Tablas
		SET CamposLlave = @cCamposLlaveConcat,
		    WhereCampos = @cWhereCamposLLave
	   WHERE NumTab = @nTab;

	   SET @nTab = @nTab + 1;
    END;

    SELECT T.NombreTabla AS 'Orden de Inserción de registros'
    FROM @Tablas AS T
		 ORDER BY T.NumTab;

/*
Creación de los pendientes de actualización por insert de cada registro existente en las tablas
*/
    SET @nTab = 1;

    WHILE @nTab <= @nTotTab
    BEGIN

	   SELECT @nNomTab = NombreTabla,
			@cCadena =
			'INSERT INTO RTC_Pendencies( TableName,
		  OperationTime,
		  OperationKind,
		  RecordKey,
		  AlteredFields
		  )
SELECT ''' + NombreTabla + ''', GETDATE(),''I'',' + CamposLlave + ', '''' FROM ' + NombreTabla + WhereCampos
	   FROM @Tablas
	   WHERE NumTab = @nTab;

	   EXEC (@cCadena);
	   SET @nTab = @nTab + 1;
    END;

/*
Se obliga la creación de pendientes de actualización de los históricos
*/
    BEGIN TRY
	   EXEC sp_RTC_GeneraHistoricos;
    END TRY
    BEGIN CATCH
	   SELECT 'Error en la ejecucóin de sp_RTC_GeneraHistoricos ' + CHAR(13) + CHAR(10) + ERROR_MESSAGE();
    END CATCH;
/*
Se informa el ID del último pendiente de actualización luego de ejecutar el proceso
*/
    SELECT 'ID del último pendiente de Actualización después del proceso' = MAX(ID)
    FROM RTC_Pendencies;

END;

```
