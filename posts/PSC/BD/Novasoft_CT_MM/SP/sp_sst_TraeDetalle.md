# Stored Procedure: sp_sst_TraeDetalle

## Usa los objetos:
- [[at]]
- [[cxc_cliente]]
- [[Fn_SST_Comas]]
- [[gen_compania]]
- [[gen_sucursal]]
- [[gth_areas]]
- [[GTH_Procesos]]
- [[SST_CronogramaInspecciones]]
- [[SST_OrigenActividad]]
- [[SST_PlanAnualCapac]]
- [[SST_PlanAnualTrabajo]]

```sql

--	=============================================
--	Author:		Marco Lara
--	Create Date:   Marzo 2020
--	Description:	Informacion Padres/Acudiente por Alumno
--	============================================ 
CREATE PROCEDURE [dbo].[sp_sst_TraeDetalle]
	@Tipo		SMALLINT,
	@Codigo		VARCHAR(100)

--WITH ENCRYPTION		
AS
BEGIN
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

	DECLARE
	@CodCia		CHAR(3),
	@Anio		CHAR(4),
	@version	VARCHAR(20),
	@Posicion	TINYINT	

	IF @tipo = 1
	BEGIN
		SELECT nom_cia AS detalle FROM gen_compania WHERE cod_cia = @Codigo
	END

	IF @tipo = 2
	BEGIN
		SELECT nom_suc AS detalle FROM gen_sucursal WHERE cod_suc = @Codigo
	END

	IF @tipo = 3
	BEGIN
		SELECT nom_cli AS detalle  FROM cxc_cliente WHERE cod_cli = @Codigo
	END

	IF @tipo = 4
	BEGIN
		SELECT des_area AS detalle FROM gth_areas WHERE cod_area = @Codigo
	END

	IF @tipo = 5
	BEGIN
		SELECT des_proc AS detalle FROM GTH_Procesos WHERE cod_proc = @Codigo
	END

	IF @tipo = 6
	BEGIN
		SELECT des_ori AS detalle FROM SST_OrigenActividad WHERE cod_ori = @Codigo
	END

	IF @tipo = 7
	BEGIN
		SELECT '' AS Anio 
		UNION ALL
		SELECT DISTINCT Anio FROM SST_PlanAnualTrabajo WHERE cod_cia = @Codigo ORDER BY Anio
	END

	IF @tipo = 12
	BEGIN
		SELECT @Posicion = dbo.at(',',@Codigo,1)
		SELECT @CodCia = SUBSTRING(@Codigo,1,@Posicion - 1), @Anio = SUBSTRING(@Codigo,@Posicion + 1,4)

		SELECT SPACE(20) AS version
		UNION ALL
		SELECT DISTINCT version FROM SST_PlanAnualTrabajo WHERE cod_cia = @CodCia AND anio = @Anio ORDER BY version
	END

	IF @tipo = 13
	BEGIN
		SELECT '' AS Anio 
		UNION ALL
		SELECT DISTINCT Anio FROM SST_PlanAnualCapac WHERE cod_cia = @Codigo ORDER BY Anio
	END

	IF @tipo = 8
	BEGIN
		SELECT @Posicion = dbo.at(',',@Codigo,1)
		SELECT @CodCia = SUBSTRING(@Codigo,1,@Posicion - 1), @Anio = SUBSTRING(@Codigo,@Posicion + 1,4)

		SELECT SPACE(20) AS version
		UNION ALL
		SELECT DISTINCT version FROM SST_PlanAnualCapac WHERE cod_cia = @CodCia AND anio = @Anio ORDER BY version
	END

	IF @tipo = 9
	BEGIN
		SELECT '' AS Anio 
		UNION ALL
		SELECT DISTINCT Anio FROM SST_CronogramaInspecciones WHERE cod_cia = @Codigo ORDER BY Anio
	END

	IF @tipo = 10
	BEGIN
		SELECT @Posicion = dbo.at(',',@Codigo,1)
		SELECT @CodCia = SUBSTRING(@Codigo,1,@Posicion - 1), @Anio = SUBSTRING(@Codigo,@Posicion + 1,4)
		SELECT '' AS Version 
		UNION ALL
		SELECT DISTINCT version FROM SST_CronogramaInspecciones WHERE cod_cia = @CodCia AND anio = @Anio ORDER BY version
	END

	IF @tipo = 11
	BEGIN
		SELECT @Posicion = dbo.at(',',@Codigo,1)
		SELECT @CodCia = dbo.Fn_SST_Comas(RTRIM(@Codigo),1), @Anio = dbo.Fn_SST_Comas(RTRIM(@Codigo),2), @version = dbo.Fn_SST_Comas(RTRIM(@Codigo),3)

		SELECT DISTINCT cons FROM SST_CronogramaInspecciones WHERE cod_cia = @CodCia AND anio = @Anio  AND version = @version ORDER BY cons
	END

END

```
