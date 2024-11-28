# Stored Procedure: sp_cMandos_Colision

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[vw_cMandos_ComisionesSpigaTallerPorOT]]
- [[vw_cMandos_ComisionesSpigaTallerPorOT_Coste]]
- [[vw_cMandos_CosteMOFacturada]]
- [[vw_cMandos_DescuentoMOFacturacion]]
- [[vw_cMandos_EntradasATaller]]
- [[vw_cMandos_HorasFacturadasMO]]
- [[vw_cMandos_HorasImproductivas]]
- [[vw_cMandos_HorasProductivas]]
- [[vw_cMandos_HorasProductivasFacturadas]]
- [[vw_cMandos_MOFacturada]]
- [[vw_cMandos_TrabajoEnCurso_mod]]
- [[vw_cMandos_UtilidadTaller]]

```sql


CREATE PROCEDURE [dbo].[sp_cMandos_Colision] 
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

	PRINT '------------------- COLISION ------------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 6)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 6
	END

	DECLARE Cursor_Estructura CURSOR LOCAL FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 6

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN

		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '


		-- Horas Productivas

		IF @CodigoTipo = 6 and @CodigoRenglon = 1
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,CodigoSeccion,Departamento,sum(HorasProductivas) Valor
					from vw_cMandos_HorasProductivas
					where Ano_Periodo = @Año 
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Departamento,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- Horas Improductivas

		IF @CodigoTipo = 6 and @CodigoRenglon = 2
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,CodigoSeccion,Departamento,sum(HorasImProductivas) Valor
					from vw_cMandos_HorasImproductivas
					where Ano_Periodo = @Año 
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,CodigoSeccion,Departamento
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- Horas Facturadas

		IF @CodigoTipo = 6 and @CodigoRenglon = 3
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Departamento, sum(valor) Valor,CodigoSeccion
					from vw_cMandos_HorasFacturadasMO
					where Ano_Periodo = @Año 
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Departamento,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END


		-- Horas Productivas Facturadas

		IF @CodigoTipo = 6 and @CodigoRenglon = 4
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Departamento,Valor,CodigoSeccion
					from vw_cMandos_HorasProductivasFacturadas
					where Ano_Periodo = @Año 
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Departamento,Valor,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- MO. Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 5
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,sum(isnull(ImporteMOFacturado,0)) Valor,CodigoSeccion
					from vw_cMandos_MOFacturada
					where Ano_Periodo = @Año
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- MO. DESCUENTO Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 6
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,sum(isnull(Descuento,0)) Valor,CodigoSeccion
					from vw_cMandos_DescuentoMOFacturacion
					where Ano_Periodo = @Año
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- MO. COSTE Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 7
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,sum(isnull(CosteMOTrabajo,0)) Valor,CodigoSeccion
					from vw_cMandos_CosteMOFacturada
					where Ano_Periodo = @Año
					and Mes_Periodo = @Mes
					and Departamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- TEXT. Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 8
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (

					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(Valor) Valor
					from (
						select distinct CodigoEmpresa,CodigoCentro,CodigoSeccion,ValorNeto Valor,NumOT
						from vw_cMandos_ComisionesSpigaTallerPorOT
						where Ano_Spiga = @Año
						and Mes_Spiga = @Mes
						and TipoOperacion = 'SUB'
						and CodDepartamento = 'TC'
					) as Datos
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- TEXT. DESCUENTO Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 9
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,SUM(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum((ValorNeto*PorcentajeDescuento)/100) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'SUB'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro
		END

		-- TEXT. COSTE Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 10
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(Coste) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT_Coste
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'SUB'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
		END

		-- Pintura. Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 11
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(ValorNeto-((ValorNeto*PorcentajeDescuento)/100)) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'PIN'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro   
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
		END

		-- Pintura. DESCUENTO Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 12
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum((ValorNeto*PorcentajeDescuento)/100) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'PIN'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro  
		END

		-- Pintura. COSTE Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 13
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(Coste) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'PIN'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro  
		END

		-- VAR. Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 14
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(ValorNeto-((ValorNeto*PorcentajeDescuento)/100)) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'VAR'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
		END

		-- VAR. DESCUENTO Facturados

		IF @CodigoTipo = 6 and @CodigoRenglon = 15
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum((ValorNeto*PorcentajeDescuento)/100) Valor
					from vw_cMandos_ComisionesSpigaTallerPorOT
					where Ano_Spiga = @Año
					and Mes_Spiga = @Mes
					and TipoOperacion = 'VAR'
					and CodDepartamento = 'TC'
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
		END

		-- Total Facturado Taller

		IF @CodigoTipo =6 and @CodigoRenglon = 16
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select MOF.Año,MOF.Mes,MOF.CodigoLinea,MOF.CodigoEmpresa,MOF.CodigoCentro,
				@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
				MOF.Valor+TEXTF.Valor+PINF.Valor+VARF.Valor,Getdate() 
				FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 5 ) MOF
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 8 ) TEXTF
				ON MOF.CodigoLinea = TEXTF.CodigoLinea and
				MOF.CodigoCentro = TEXTF.CodigoCentro and
				MOF.CodigoEmpresa = TEXTF.CodigoEmpresa
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 11 ) PINF
				ON TEXTF.CodigoLinea = PINF.CodigoLinea and
				TEXTF.CodigoCentro = PINF.CodigoCentro and
				TEXTF.CodigoEmpresa = PINF.CodigoEmpresa
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 14 ) VARF
				ON PINF.CodigoLinea = VARF.CodigoLinea and
				PINF.CodigoCentro = VARF.CodigoCentro and
				PINF.CodigoEmpresa = VARF.CodigoEmpresa
				order by CodigoLinea,CodigoCentro

		END

		-- Total Coste Venta

		IF @CodigoTipo =6 and @CodigoRenglon = 17
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select MOF.Año,MOF.Mes,MOF.CodigoLinea,MOF.CodigoEmpresa,MOF.CodigoCentro,
				@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
				MOF.Valor+TEXTF.Valor+PINF.Valor,Getdate() 
				FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 7 ) MOF
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 10 ) TEXTF
				ON MOF.CodigoLinea = TEXTF.CodigoLinea and
				MOF.CodigoCentro = TEXTF.CodigoCentro and
				MOF.CodigoEmpresa = TEXTF.CodigoEmpresa
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 13 ) PINF
				ON TEXTF.CodigoLinea = PINF.CodigoLinea and
				TEXTF.CodigoCentro = PINF.CodigoCentro and
				TEXTF.CodigoEmpresa = PINF.CodigoEmpresa
				order by CodigoLinea,CodigoCentro
		END

		-- Total Dtos. Taller

		IF @CodigoTipo =6 and @CodigoRenglon = 18
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select MOF.Año,MOF.Mes,MOF.CodigoLinea,MOF.CodigoEmpresa,MOF.CodigoCentro,
				@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
				MOF.Valor+TEXTF.Valor+PINF.Valor+VARF.Valor,Getdate() 
				FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 6 ) MOF
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 9 ) TEXTF
				ON MOF.CodigoLinea = TEXTF.CodigoLinea and
				MOF.CodigoCentro = TEXTF.CodigoCentro and
				MOF.CodigoEmpresa = TEXTF.CodigoEmpresa
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 12 ) PINF
				ON TEXTF.CodigoLinea = PINF.CodigoLinea and
				TEXTF.CodigoCentro = PINF.CodigoCentro and
				TEXTF.CodigoEmpresa = PINF.CodigoEmpresa
				LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 15 ) VARF
				ON PINF.CodigoLinea = VARF.CodigoLinea and
				PINF.CodigoCentro = VARF.CodigoCentro and
				PINF.CodigoEmpresa = VARF.CodigoEmpresa
				order by CodigoLinea,CodigoCentro
		END

		-- UTILIDAD BRUTA

		IF @CodigoTipo = 6 and @CodigoRenglon = 19 
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo ,@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0),getdate()
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (

					select Año,Mes,CodigoPresentacion,CodigoSede,Departamento,isnull(Saldo,0) valor
					from vw_cMandos_UtilidadTaller 
					where Año = @Año 
					and Mes = @Mes 
					and Departamento = 'TC'

					--select Año,Mes,CodigoPresentacion,CodigoSede,Valor 
					--from vw_cMandos_InformesDefinitivos 
					--where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 30003
				) ID 
				ON 
				ID.CodigoPresentacion = LN.CodigoLinea and
				ID.CodigoSede = LN.CodigoSede  

		END

		-- Valor Trabajo en Curso

		IF @CodigoTipo = 6 and @CodigoRenglon = 20
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(ImporteTotal) Valor
					from vw_cMandos_TrabajoEnCurso_mod
					where Ano_Periodo = @Año
					and Mes_Periodo = @Mes
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion

					--select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(ImporteMO) Valor
					--from vw_cMandos_TrabajoEnCurso
					--where Ano_Periodo = @Año
					--and Mes_Periodo = @Mes
					--group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
		END

		-- Pasos por Taller

		IF @CodigoTipo = 6 and @CodigoRenglon = 21
		BEGIN

			SET @msg = @Msg + 'Ok'

			insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
				@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
				from (
					select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroTCOL,TCOL
					from cMandos_Lineas 
					WHERE Activo = 1 
				) LN
				Left Join (
					select CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(isnull(Cantidad,0)) valor 
					from vw_cMandos_EntradasATaller
					where Ano_Periodo = @Año
					and Mes_Periodo = @Mes
					group by CodigoEmpresa,CodigoCentro,CodigoSeccion
				) ID 
				ON 
				LN.CodigoEmpresa = ID.CodigoEmpresa AND 
				LN.CodigoCentroTCOL = ID.CodigoCentro  
				and ((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
				group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				order by CodigoLinea,CodigoEmpresa,CodigoCentro 
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
