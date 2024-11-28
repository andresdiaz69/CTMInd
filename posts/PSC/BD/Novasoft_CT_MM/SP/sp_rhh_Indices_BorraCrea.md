# Stored Procedure: sp_rhh_Indices_BorraCrea

```sql
CREATE PROCEDURE [dbo].[sp_rhh_Indices_BorraCrea]
    @nIndBorrando BIT = 0
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idTab INT;
    DECLARE @cNomTab SYSNAME;
    DECLARE @cNomTabAnt SYSNAME;
    DECLARE @IndexName SYSNAME;
    DECLARE @IndexNameAnt SYSNAME;
    DECLARE @ColumName SYSNAME;
    DECLARE @tipoIndex TINYINT;
    DECLARE @is_unique BIT;
    DECLARE @index_column_id INT;
    DECLARE @is_descending_key BIT;
    DECLARE @is_included_column BIT;
    DECLARE @cCadOpeIndex NVARCHAR(MAX);
    DECLARE @cListaCamposIdx NVARCHAR(MAX) = '';
    DECLARE @cListaCamposInc NVARCHAR(MAX) = '';

    IF OBJECT_ID('TempDb..[##Tmp_Indices_Privada_Web_Instalador]') IS NULL AND @nIndBorrando = 1
    BEGIN
	   SELECT I.object_id AS IdTab,
			OBJECT_NAME(I.object_id) AS NomTab,
			I.name AS IndexName,
			N.name AS ColumName,
			I.type AS tipoIndex, /*1 Clus 2 Nonclus*/
			I.is_unique,
			C.index_column_id,
			C.is_descending_key,
			C.is_included_column
	   INTO [##Tmp_Indices_Privada_Web_Instalador]
	   FROM sys.indexes AS I
	   INNER JOIN sys.index_columns AS C ON I.object_id = C.object_id AND I.index_id = C.index_id
	   INNER JOIN sys.syscolumns AS N ON N.id = I.object_id AND N.colid = C.column_id
	   WHERE I.OBJECT_ID IN(
					    OBJECT_ID('rhh_LiqHis'), OBJECT_ID('rhh_LiqMes')
					   )
		    AND I.is_primary_key = 0
	   ORDER BY I.name,
			  C.index_column_id;

	   IF @@ROWCOUNT > 0
	   BEGIN
		  SET @nIndBorrando = 1;
	   END;
    END;

    IF @nIndBorrando = 1
    BEGIN
	   DECLARE CurBorIndice CURSOR LOCAL
	   FOR SELECT DISTINCT
			    NomTab,
			    IndexName
		  FROM [##Tmp_Indices_Privada_Web_Instalador];
	   OPEN CurBorIndice;

	   FETCH NEXT FROM CurBorIndice INTO @cNomTab,
								  @IndexName;
	   WHILE @@FETCH_STATUS <> -1
	   BEGIN
		  SET @cCadOpeIndex = 'DROP INDEX ['+@IndexName+'] ON ['+@cNomTab+']';
		  PRINT CONCAT('Borrando índice ', @IndexName, ' de la tabla ', @cNomTab);
		  EXEC (@cCadOpeIndex);
		  FETCH NEXT FROM CurBorIndice INTO @cNomTab,
									 @IndexName;
	   END;
    END;

    IF @nIndBorrando = 0
	  AND OBJECT_ID('TempDb..[##Tmp_Indices_Privada_Web_Instalador]') IS NOT NULL
    BEGIN
	   DECLARE CurCreaIndice CURSOR LOCAL
	   FOR SELECT *
		  FROM [##Tmp_Indices_Privada_Web_Instalador]
		  ORDER BY NomTab,
				 IndexName,
				 is_included_column DESC,
				 index_column_id;
	   OPEN CurCreaIndice;

	   FETCH NEXT FROM CurCreaIndice INTO @idTab,
								   @cNomTab,
								   @IndexName,
								   @ColumName,
								   @tipoIndex,
								   @is_unique,
								   @index_column_id,
								   @is_descending_key,
								   @is_included_column;

	   WHILE @@FETCH_STATUS <> -1
	   BEGIN
		  IF @IndexNameAnt IS NULL OR @IndexName <> @IndexNameAnt OR @cNomTab <> @cNomTabAnt
		  BEGIN
			 SET @cCadOpeIndex = 'CREATE '+CASE @is_unique
										WHEN 1 THEN 'UNIQUE '
										ELSE ''
									 END+CASE @tipoIndex
										    WHEN 1 THEN 'CLUSTERED'
										    ELSE 'NONCLUSTERED'
										END+' INDEX ';
			 SET @cCadOpeIndex = @cCadOpeIndex+'['+@IndexName+'] ON ['+@cNomTab+']';
			 PRINT CONCAT('Creando índice ', @IndexName, ' en la tabla ', @cNomTab);
		  END;

		  IF @is_included_column = 0
		  BEGIN
			 SET @cListaCamposIdx = @cListaCamposIdx+CASE @cListaCamposIdx
												WHEN '' THEN ''
												ELSE ', '
											 END+@ColumName+CASE @is_descending_key
															WHEN 1 THEN ' DESC'
															ELSE ' ASC'
														 END;
		  END;
			 ELSE
		  BEGIN
			 SET @cListaCamposInc = @cListaCamposInc+CASE @cListaCamposInc
												WHEN '' THEN ''
												ELSE ', '
											 END+@ColumName;
		  END;

		  SET @IndexNameAnt = @IndexName;
		  SET @cNomTabAnt = @cNomTab;

		  FETCH NEXT FROM CurCreaIndice INTO @idTab,
									  @cNomTab,
									  @IndexName,
									  @ColumName,
									  @tipoIndex,
									  @is_unique,
									  @index_column_id,
									  @is_descending_key,
									  @is_included_column;

		  IF @IndexName <> @IndexNameAnt OR @cNomTab <> @cNomTabAnt OR @@FETCH_STATUS = -1
		  BEGIN
			 SET @cCadOpeIndex = @cCadOpeIndex+'('+@cListaCamposIdx+')';
			 IF @cListaCamposInc <> ''
			 BEGIN
				SET @cCadOpeIndex = @cCadOpeIndex+' INCLUDE ('+@cListaCamposInc+')';
			 END;

			 SET @cListaCamposIdx = '';
			 SET @cListaCamposInc = '';

			 EXEC (@cCadOpeIndex);
		  END;
	   END;
    END;
END;

```
