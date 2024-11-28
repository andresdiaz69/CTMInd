# Stored Procedure: sp_sst_EncabezadoCronInspec

## Usa los objetos:
- [[SST_DetPlanAnualTrabajo]]
- [[SST_Subprocesos]]

```sql

-- =============================================
-- Author:		Camilo Andrés Camargo Convers
-- Create date: 20/05/2020
-- Description: Filtra los valores de los campos del encabezado del cronograma de inspecciones.
-- =============================================
CREATE PROCEDURE [dbo].[sp_sst_EncabezadoCronInspec]
	@cod_cia	CHAR(3),
	@anio		CHAR(4) = NULL,
	@version	VARCHAR(20) = NULL,
	@cod_cli	VARCHAR(15) = NULL,
	@cod_suc	VARCHAR(3) = NULL,
	@ind_filtro	INT	/*1 - Año, 2 - Versión, 3 - Empresa Usuaria, 4 - Sucursal, 5 - Consecutivo*/
--WITH ENCRYTPION
AS
BEGIN
	IF(@ind_filtro = 1)
	BEGIN
		SELECT DISTINCT anio
		FROM SST_DetPlanAnualTrabajo
		WHERE cod_cia = @cod_cia;
	END
	ELSE IF(@ind_filtro = 2)
	BEGIN
		SELECT DISTINCT version 
		FROM SST_DetPlanAnualTrabajo
		WHERE cod_cia = @cod_cia
		  AND anio = @anio;
	END
	ELSE IF(@ind_filtro = 3)
	BEGIN
		SELECT DISTINCT cod_cli 
		FROM SST_DetPlanAnualTrabajo
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version;
	END
	ELSE IF(@ind_filtro = 4)
	BEGIN
		SELECT DISTINCT cod_suc 
		FROM SST_DetPlanAnualTrabajo
		WHERE cod_cia = @cod_cia
		  AND anio = @anio
		  AND version = @version
		  AND cod_cli = @cod_cli;
	END
	ELSE IF(@ind_filtro = 5)
	BEGIN
		SELECT P.cons
		FROM SST_DetPlanAnualTrabajo AS P 
		INNER JOIN SST_Subprocesos AS S ON P.sub_proc = S.sub_proc
		WHERE P.cod_cia = @cod_cia
		  AND P.anio = @anio
		  AND P.version = @version
		  AND P.cod_cli = @cod_cli
		  AND P.cod_suc = @cod_suc;
	END
END

```
