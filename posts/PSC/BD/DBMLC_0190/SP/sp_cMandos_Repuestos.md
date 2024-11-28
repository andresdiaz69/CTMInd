# Stored Procedure: sp_cMandos_Repuestos

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[vw_cMandos_ComisionesSpigaAlmacenAlbaran]]
- [[vw_cMandos_ComisionesSpigaTallerPorOT]]
- [[vw_cMandos_InventarioRepuestosResumido]]
- [[vw_cMandos_InventarioRepuestosResumidoAnterior]]
- [[vw_InformesDefinitivos]]

```sql

CREATE PROCEDURE [dbo].[sp_cMandos_Repuestos] 
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
	DECLARE @Msg varchar(max) 
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

	PRINT '------------------ REPUESTOS -----------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 4)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 4
	END

	DECLARE Cursor_Estructura CURSOR FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 4

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN
		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '
		
		-- VENTAS EXTERNAS

			IF @CodigoTipo = 4 and @CodigoRenglon = 1
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM [vw_cMandos_ComisionesSpigaAlmacenAlbaran]
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO','VCOA','VCR','VCRA')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VCO

			IF @CodigoTipo = 4 and @CodigoRenglon = 2
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede ,CodigoCentroREP
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS VCOA

			IF @CodigoTipo = 4 and @CodigoRenglon = 3
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCOA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS VCR

			IF @CodigoTipo = 4 and @CodigoRenglon = 4
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCR')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS VCRA

			IF @CodigoTipo = 4 and @CodigoRenglon = 5
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCRA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- UTILIDAD BRUTA 'VCO','VCOA','VCR','VCRA'

			IF @CodigoTipo = 4 and @CodigoRenglon = 6
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto])-SUM(CostoNeto) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO','VCOA','VCR','VCRA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS INTERNAS

			IF @CodigoTipo = 4 and @CodigoRenglon = 7
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN','VINA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS VIN

			IF @CodigoTipo = 4 and @CodigoRenglon = 8
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- VENTAS VINA

			IF @CodigoTipo = 4 and @CodigoRenglon = 9
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro, 
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VINA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- UTILIDAD BRUTA 'VIN','VINA'

			IF @CodigoTipo = 4 and @CodigoRenglon = 10
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto])-SUM(CostoNeto) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN','VINA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro 

			END

		-- Fact. Taller Mec.

			IF @CodigoTipo = 4 and @CodigoRenglon = 11
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,RMEC 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TM'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TM') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro and 
					((LN.RMEC <> 0 AND LN.RMEC = ID.CodigoSeccion) OR (LN.RMEC = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro


			END

		-- Utilidad Taller Mec. Bruta Mec.

			IF @CodigoTipo = 4 and @CodigoRenglon = 12
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)-isnull(ID.Costo,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,RMEC 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TM'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TM') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro and 
					((LN.RMEC <> 0 AND LN.RMEC = ID.CodigoSeccion) OR (LN.RMEC = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- REP Taller Mec. Valor Ventas

			IF @CodigoTipo = 4 and @CodigoRenglon = 13
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,RMEC 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TM'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TM') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro and 
					((LN.RMEC <> 0 AND LN.RMEC = ID.CodigoSeccion) OR (LN.RMEC = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- REP Taller Mec. Valor Costo

			IF @CodigoTipo = 4 and @CodigoRenglon = 14
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Costo,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,RMEC 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TM'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TM') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroREP = ID.CodigoCentro and 
					((LN.RMEC <> 0 AND LN.RMEC = ID.CodigoSeccion) OR (LN.RMEC = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- Fact. Taller Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 15
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroTCOL,TCOL 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TC'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TC') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroTCOL = ID.CodigoCentro and 
					((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- Valor Ventas Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 17
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroTCOL,TCOL 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TC'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TC') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroTCOL = ID.CodigoCentro and 
					((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- Valor Costo Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 18
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Costo,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroTCOL,TCOL 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TC'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TC') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroTCOL = ID.CodigoCentro and 
					((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- Utilidad Bruta Taller Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 16
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Venta,0)-isnull(ID.Costo,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroTCOL,TCOL 
						from cMandos_Lineas 
						WHERE Activo = 1 
					) LN
					Left Join (
						select Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion,Sum(Venta.Valor) Venta,sum(Costo.Valor) Costo, Sum(Venta.Valor-Costo.Valor) Utilidad from 
							(select CodigoEmpresa,CodigoCentro,NumOT,SUM(ValorNeto) Valor, Sum(UnidadesVendidas) Unidades,CodigoSeccion
							from vw_cMandos_ComisionesSpigaTallerPorOT 
							where Ano_spiga = @Año 
							and Mes_spiga = @Mes 
							and TipoOperacion = 'MAT' 
							and CodDepartamento = 'TC'
							group by CodigoEmpresa,CodigoCentro,CodigoSeccion,NumOT) Venta
							LEFT JOIN
							(SELECT distinct CodigoEmpresa,CodigoCentro,NumOt,Coste Valor 
							FROM vw_cMandos_ComisionesSpigaTallerPorOT 
							WHERE	
							TipoOperacion = 'MAT'
							and CodDepartamento = 'TC') Costo
							ON Venta.CodigoEmpresa = Costo.CodigoEmpresa and Venta.CodigoCentro = Costo.CodigoCentro and Venta.NumOT = Costo.NumOT 
						group by  Venta.CodigoEmpresa,Venta.CodigoCentro,CodigoSeccion
					) ID 
					ON 
					LN.CodigoEmpresa = ID.CodigoEmpresa AND 
					LN.CodigoCentroTCOL = ID.CodigoCentro and 
					((LN.TCOL <> 0 AND LN.TCOL = ID.CodigoSeccion) OR (LN.TCOL = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
					group by LN.CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- Valor Venta Veta

			ELSE IF @CodigoTipo = 4 and @CodigoRenglon = 19
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
						select @Año,@Mes,Externas.CodigoLinea,Externas.CodigoEmpresa,Externas.CodigoCentro,
						@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
						isnull(Externas.Valor,0)+isnull(Internas.Valor,0)+isnull(FacMec.Valor,0)+isnull(FacCol.Valor,0) Valor,Getdate() FechaGeneración
						FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 1) Externas	
						LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 7) Internas
						ON Externas.CodigoLinea = Internas.CodigoLinea and
						Externas.CodigoCentro = Internas.CodigoCentro and
						Externas.CodigoEmpresa = Internas.CodigoEmpresa
						LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 11) FacMec
						ON Internas.CodigoLinea = FacMec.CodigoLinea and
						Internas.CodigoCentro = FacMec.CodigoCentro and
						Internas.CodigoEmpresa = FacMec.CodigoEmpresa
						LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 15) FacCol
						ON FacMec.CodigoLinea = FacCol.CodigoLinea and
						FacMec.CodigoCentro = FacCol.CodigoCentro and
						FacMec.CodigoEmpresa = FacCol.CodigoEmpresa

			END

		-- Utilidad Bruta Modulo

			ELSE IF @CodigoTipo = 4 and @CodigoRenglon = 20
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Año,@Mes Mes,Externas.CodigoLinea,Externas.CodigoEmpresa,Externas.CodigoCentro,
					@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
					isnull(Externas.Valor,0)+isnull(Internas.Valor,0)+isnull(FacMec.Valor,0)+isnull(FacCol.Valor,0) Valor,Getdate() FechaGeneración
					FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 6) Externas	
					LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 10) Internas
					ON Externas.CodigoLinea = Internas.CodigoLinea and
					Externas.CodigoCentro = Internas.CodigoCentro and
					Externas.CodigoEmpresa = Internas.CodigoEmpresa
					LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 12) FacMec
					ON Internas.CodigoLinea = FacMec.CodigoLinea and
					Internas.CodigoCentro = FacMec.CodigoCentro and
					Internas.CodigoEmpresa = FacMec.CodigoEmpresa
					LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 16) FacCol
					ON FacMec.CodigoLinea = FacCol.CodigoLinea and
					FacMec.CodigoCentro = FacCol.CodigoCentro and
					FacMec.CodigoEmpresa = FacCol.CodigoEmpresa

			END


		-- UTILIDAD RP

			IF @CodigoTipo = 4 and @CodigoRenglon = 21 
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
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor 
						from InformesComiteDB.dbo.vw_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 30002
					) ID 
					ON 
					ID.CodigoPresentacion = LN.CodigoLinea and
					ID.CodigoSede = LN.CodigoSede  

			END

		-- Valor Inventario

			IF @CodigoTipo = 4 and @CodigoRenglon = 22 
			BEGIN

				SET @msg = @Msg + 'Ok'

				IF @Mes = month(getdate()) BEGIN
					insert into cMandos_Datos
						select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
						@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
						from (
							select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,REP 
							from cMandos_Lineas 
							WHERE Activo = 1 
						) LN
						Left Join (
							select CodigoEmpresa,CodigoCentro,CodigoSeccion,isnull(ValorPM,0) Valor 
							from vw_cMandos_InventarioRepuestosResumido
							where Ano_Periodo=@Año and Mes_Periodo=@Mes 
						) ID 
						ON 
						LN.CodigoEmpresa = ID.CodigoEmpresa AND 
						LN.CodigoCentroREP = ID.CodigoCentro and 
						((LN.REP <> 0 AND LN.REP = ID.CodigoSeccion) OR (LN.REP = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
						group by CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				END
				ELSE BEGIN
					insert into cMandos_Datos
						select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
						@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
						from (
							select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,REP 
							from cMandos_Lineas 
							WHERE Activo = 1 
						) LN
						Left Join (
							select CodigoEmpresa,CodigoCentro,CodigoSeccion,isnull(ValorPM,0) Valor 
							from vw_cMandos_InventarioRepuestosResumidoAnterior
							where Ano_Periodo=@Año and Mes_Periodo=@Mes 
						) ID 
						ON 
						LN.CodigoEmpresa = ID.CodigoEmpresa AND 
						LN.CodigoCentroREP = ID.CodigoCentro and 
						((LN.REP <> 0 AND LN.REP = ID.CodigoSeccion) OR (LN.REP = 0 and ID.CodigoSeccion=ID.CodigoSeccion))
						group by CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro
				END

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
