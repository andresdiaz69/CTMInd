# Stored Procedure: Sp_Provision_CalculoxDias

## Usa los objetos:
- [[Provision_OT_Compania]]
- [[Provision_OT_MarcaBusesCamiones]]
- [[Provision_OT_MarcaInternacional]]
- [[Provision_OT_Tipo]]

```sql

CREATE PROC Sp_Provision_CalculoxDias

@IDMARCA INT,
@IDGAMA INT, 
@EMPRESA INT,
@CARGOT VARCHAR(5)

AS

BEGIN
	SET NOCOUNT ON
	SET FMTONLY OFF

--UNIFICA LOS TIPOS DE CARGO
DECLARE @CARGO VARCHAR(5);
IF (@CARGOT = 'C' OR @CARGOT = 'S')
BEGIN
	SET @CARGO = 'C'
END
IF (@CARGOT = 'G' OR @CARGOT = 'GA')
BEGIN
	SET @CARGO = 'G'
END
IF (@CARGOT = 'I')
BEGIN
	SET @CARGO = 'I'
END

--EXCLUYE DE MARCAS INTERNACIONALES LAS OT QUE ENTRAN CON EMPRESA DISTINTA A MOTORES Y MAQUINAS
--DECLARE @VAL BIT;
--BEGIN
--	IF EXISTS(SELECT * FROM Provision_OT_MarcaInternacional I WHERE I.IdMarca = @IDMARCA AND I.Estado = 1)
--		SET @VAL = 1;
--	ELSE 
--		SET @VAL = 0;

--	IF(@EMPRESA <> 6 AND @VAL = 1)
--		SET @IDMARCA = 0;
--END

--TIPO DE CLASIFICACION
IF EXISTS (SELECT C.IdCompania FROM Provision_OT_Compania C WHERE C.IdCompania = @EMPRESA)
BEGIN	
	IF EXISTS (SELECT DISTINCT M.* FROM Provision_OT_MarcaBusesCamiones M WHERE M.IdMarca = @IDMARCA AND M.IdGama = @IDGAMA
				AND M.Estado = 1)
	BEGIN
			SELECT C.IdCompania, T.IdTipo, T.Ndias FROM Provision_OT_Compania C, Provision_OT_Tipo T
			WHERE C.IdCompania = @EMPRESA AND T.IdTipo IN (2,5,8) AND T.TipoCargo = @CARGO
	END
	ELSE 
	BEGIN
		IF EXISTS (SELECT I.* FROM Provision_OT_MarcaInternacional I WHERE I.IdMarca = @IDMARCA AND I.Estado = 1)
		BEGIN
			SELECT C.IdCompania, T.IdTipo, T.Ndias FROM Provision_OT_Compania C, Provision_OT_Tipo T
			WHERE C.IdCompania = @EMPRESA AND T.IdTipo IN (3,6,9) AND T.TipoCargo = @CARGO
		END
		ELSE
		BEGIN
			SELECT C.IdCompania, T.IdTipo, T.Ndias FROM Provision_OT_Compania C, Provision_OT_Tipo T
			WHERE C.IdCompania = @EMPRESA AND T.IdTipo IN (1,4,7) AND T.TipoCargo = @CARGO
		END
	END
END
ELSE 
BEGIN	
	SELECT IdCompania = 0, IdTipo = 0, Ndias = 0
END

END

```
