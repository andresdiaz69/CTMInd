# Stored Procedure: sp_cMandos_CRM

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[vw_cMandos_Actividades]]
- [[vw_cMandos_ClientesPotenciales]]
- [[vw_cMandos_CotizacionesVN]]
- [[vw_cMandos_CotizacionesVO]]

```sql

CREATE PROCEDURE [dbo].[sp_cMandos_CRM] 
(
@Año int, 
@Mes int
)
AS 

BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF


	--Estructura
	DECLARE @CodigoTipo smallint
	DECLARE @CodigoRenglon smallint 
	DECLARE @NombreRenglon varchar(50)
	DECLARE @Visible bit
	DECLARE @Msg varchar(200) 
	--Lineas
	DECLARE @CodigoLinea smallint
	DECLARE @CodigoEmpresa smallint 
	DECLARE @CodigoCentro smallint 
	DECLARE @CRM smallint
	DECLARE @VN smallint 
	DECLARE @VU smallint 
	DECLARE @REP smallint
	DECLARE @TMEC smallint 
	DECLARE @TCOL smallint 


	PRINT '-------------------- CRM -------------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 1)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 1
	END

	DECLARE Cursor_Estructura CURSOR LOCAL FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 1

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN

		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '

		-- Nº.Cl. Potenciales

		if @CodigoTipo = 1 and @CodigoRenglon = 1
		BEGIN
				SET @msg = @Msg + 'Ok'

				IF object_id(N'tempdb.dbo.#cMandos_Temporal', N'U') is not null
					DROP TABLE #cMandos_Temporal 

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,ISNULL(Cantidad,0) Cantidad,getdate()
					from (
						SELECT DISTINCT [CodigoLinea]
						  ,[CodigoEmpresa]
						  ,[CodigoCentro]
						  ,[CRM]
						  ,[VN]
						  ,[VU]
						  ,[REP]
						  ,[TMEC]
						  ,[TCOL]
					  FROM [dbo].[cMandos_Lineas] WHERE CodigoLinea not in (28,29) and Activo = 1 ) CML LEFT JOIN
					  vw_cMandos_ClientesPotenciales CP 
					ON CP.CodigoEmpresa = CML.CodigoEmpresa and CP.CodigoCentro = CML.CodigoCentro
					 AND Ano_Periodo = @Año and Mes_Periodo = @Mes
					order by Ano_Periodo,Mes_Periodo,CodigoLinea,CP.CodigoCentro

		END

		-- Cotiz. VN Abiertas

		if @CodigoTipo = 1 and @CodigoRenglon = 2
		BEGIN
				SET @msg = @Msg + 'Ok'

				IF object_id(N'tempdb.dbo.#cMandos_Temporal', N'U') is not null
					DROP TABLE #cMandos_Temporal 

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,
					@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
					SUM (isnull(Cantidad,0)) Cantidad,getdate()
					from (
						SELECT DISTINCT [CodigoLinea]
						  ,[CodigoEmpresa]
						  ,[CodigoCentro]
						  ,[CRM]
						  ,[VN]
						  ,[VU]
						  ,[REP]
						  ,[TMEC]
						  ,[TCOL]
					  FROM [dbo].[cMandos_Lineas] WHERE CodigoLinea not in (28,29) and Activo = 1 ) CML LEFT JOIN
					  vw_cMandos_CotizacionesVN CP 
					ON CP.CodigoEmpresa = CML.CodigoEmpresa and CP.CodigoCentro = CML.CodigoCentro
					 AND Ano_Periodo = @Año and Mes_Periodo = @Mes
					 group by CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro
					order by Ano_Periodo,Mes_Periodo,CodigoLinea,CML.CodigoCentro

		END

		-- Cotiz. VO Abiertas

		if @CodigoTipo = 1 and @CodigoRenglon = 3
		BEGIN
				SET @msg = @Msg + 'Ok'

				IF object_id(N'tempdb.dbo.#cMandos_Temporal', N'U') is not null
					DROP TABLE #cMandos_Temporal 

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
					SUM (isnull(Cantidad,0)) Cantidad,getdate()
					from (
						SELECT DISTINCT [CodigoLinea]
						  ,[CodigoEmpresa]
						  ,[CodigoCentro]
						  ,[CRM]
						  ,[VN]
						  ,[VU]
						  ,[REP]
						  ,[TMEC]
						  ,[TCOL]
					  FROM [dbo].[cMandos_Lineas] WHERE CodigoLinea not in (28,29) and Activo = 1 ) CML LEFT JOIN
					  vw_cMandos_CotizacionesVO CP 
					ON CP.CodigoEmpresa = CML.CodigoEmpresa and CP.CodigoCentro = CML.CodigoCentro
					 AND Ano_Periodo = @Año and Mes_Periodo = @Mes
					 group by CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro
					order by Ano_Periodo,Mes_Periodo,CodigoLinea,CML.CodigoCentro

		END
		

		-- NºCl.Actividades

		if @CodigoTipo = 1 and @CodigoRenglon = 4
		BEGIN
				SET @msg = @Msg + 'Ok'

				IF object_id(N'tempdb.dbo.#cMandos_Temporal', N'U') is not null
					DROP TABLE #cMandos_Temporal 

					insert into cMandos_Datos
						select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,ISNULL(Actividades,0) Cantidad,getdate()
						from (
							SELECT DISTINCT [CodigoLinea]
							,[CodigoEmpresa]
							,[CodigoCentro]
							,[CRM]
							,[VN]
							,[VU]
							,[REP]
							,[TMEC]
							,[TCOL]
							FROM [dbo].[cMandos_Lineas] WHERE CodigoLinea not in (28,29) and Activo = 1 
						) CML LEFT JOIN
						  vw_cMandos_Actividades CP 
						ON CP.CodigoEmpresa = CML.CodigoEmpresa and CP.CodigoCentro = CML.CodigoCentro
						 AND Ano_Periodo = @Año and Mes_Periodo = @Mes
						order by Ano_Periodo,Mes_Periodo,CodigoLinea,CP.CodigoCentro

		END

		ELSE
		BEGIN
			SET @msg = LEFT(@Msg + '----------------------------------------',50)
		END

		print @Msg
		FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon
	END

	CLOSE Cursor_Estructura
	DEALLOCATE Cursor_Estructura

END


```
