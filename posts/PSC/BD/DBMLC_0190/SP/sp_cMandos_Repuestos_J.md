# Stored Procedure: sp_cMandos_Repuestos_J

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[vw_cMandos_ComisionesSpigaAlmacenAlbaran]]
- [[vw_cMandos_ComisionesSpigaTallerPorOT]]
- [[vw_cMandos_InventarioRepuestosResumido]]

```sql





CREATE PROCEDURE [dbo].[sp_cMandos_Repuestos_J] 
(
	@Año int, 
	@Mes int
)
AS 
--Parametros
--DECLARE @Año smallint = 2020
--DECLARE @Mes smallint = 7

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
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO','VCOA','VCR','VCRA')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 


			END

		-- VCO

			IF @CodigoTipo = 4 and @CodigoRenglon = 2
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- VENTAS VCOA

			IF @CodigoTipo = 4 and @CodigoRenglon = 3
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCOA')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- VENTAS VCR

			IF @CodigoTipo = 4 and @CodigoRenglon = 4
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCR')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 


			END

		-- VENTAS VCRA

			IF @CodigoTipo = 4 and @CodigoRenglon = 5
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCRA')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- UTILIDAD BRUTA 'VCO','VCOA','VCR','VCRA'

			IF @CodigoTipo = 4 and @CodigoRenglon = 6
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea, CodigoEmpresa, CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto])-SUM(CostoNeto) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VCO','VCOA','VCR','VCRA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- VENTAS INTERNAS

			IF @CodigoTipo = 4 and @CodigoRenglon = 7
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN','VINA')
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- VENTAS VIN

			IF @CodigoTipo = 4 and @CodigoRenglon = 8
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- VENTAS VINA

			IF @CodigoTipo = 4 and @CodigoRenglon = 9
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro, 
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto]) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VINA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 


			END

		-- UTILIDAD BRUTA 'VIN','VINA'

			IF @CodigoTipo = 4 and @CodigoRenglon = 10
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,CodigoEmpresa,CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,isnull(ID.Valor,0) Valor,getdate() 
					from (
						SELECT Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum([ValorNeto])-SUM(CostoNeto) Valor
						FROM vw_cMandos_ComisionesSpigaAlmacenAlbaran
						where Ano_Periodo = @Año and Mes_Periodo = @Mes and tipomov in ('VIN','VINA')
						AND CodigoCentro not in (55)
						group by [Ano_Periodo],[Mes_Periodo],[Ano_Spiga],[Mes_Spiga],[CodigoEmpresa],[Empresa],[CodigoCentro],[Centro]
					) ID 

			END

		-- Fact. Taller Mec.

			IF @CodigoTipo = 4 and @CodigoRenglon = 11
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Valor,0)) Valor,getdate() FechaGeneracion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TM'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- REP Valor Ventas

			IF @CodigoTipo = 4 and @CodigoRenglon = 13
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Valor,0)) Valor,getdate() FechaGeneracion
					--,ID.CodDepartamento,ID.CodigoSeccion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TM'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- REP Valor Costo

			IF @CodigoTipo = 4 and @CodigoRenglon = 14
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Costo,0)) Valor,getdate() FechaGeneracion
					--,ID.CodDepartamento,ID.CodigoSeccion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TM'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- Utilidad Bruta Mec.

			IF @CodigoTipo = 4 and @CodigoRenglon = 12
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select Ventas.Año,Ventas.Mes,Ventas.CodigoLinea,Ventas.CodigoEmpresa,Ventas.CodigoCentro,
					@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
					Ventas.Valor-Costo.Valor Valor,Getdate() FechaGeneración
					FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 13) Ventas	
					LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 14) Costo
					ON Ventas.CodigoLinea = Costo.CodigoLinea and
					Ventas.CodigoCentro = Costo.CodigoCentro and
					Ventas.CodigoEmpresa = Costo.CodigoEmpresa

			END

		-- Fact. Taller Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 15
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Valor,0)) Valor,getdate() FechaGeneracion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TC'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- REP Taller Col Valor Ventas

			IF @CodigoTipo = 4 and @CodigoRenglon = 17
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Valor,0)) Valor,getdate() FechaGeneracion
					--,ID.CodDepartamento,ID.CodigoSeccion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TC'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- REP Taller Col Valor Costo

			IF @CodigoTipo = 4 and @CodigoRenglon = 18
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,0 CodigoLinea,ID.CodigoEmpresa,ID.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon Renglon,sum(isnull(ID.Costo,0)) Valor,getdate() FechaGeneracion
					--,ID.CodDepartamento,ID.CodigoSeccion
					from (
						SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,sum(valorNeto) Valor,sum(Coste) Costo,CodDepartamento
						FROM vw_cMandos_ComisionesSpigaTallerPorOT
								WHERE Ano_Spiga = @Año and Mes_Spiga = @Mes
								and TipoOperacion = 'MAT' 
								and CodDepartamento = 'TC'
								group by Ano_Spiga,Mes_Spiga,CodigoEmpresa,CodigoCentro,CodigoSeccion,CodDepartamento
					) ID 
					group by ID.CodigoEmpresa,ID.CodigoCentro,CodDepartamento,ID.CodigoSeccion

			END

		-- Utilidad Bruta Taller Col.

			IF @CodigoTipo = 4 and @CodigoRenglon = 16
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select Ventas.Año,Ventas.Mes,Ventas.CodigoLinea,Ventas.CodigoEmpresa,Ventas.CodigoCentro,
					@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
					Ventas.Valor-Costo.Valor Valor,Getdate() FechaGeneración
					FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 17) Ventas	
					LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 18) Costo
					ON Ventas.CodigoLinea = Costo.CodigoLinea and
					Ventas.CodigoCentro = Costo.CodigoCentro and
					Ventas.CodigoEmpresa = Costo.CodigoEmpresa

			END

		-- Valor Venta Veta

			ELSE IF @CodigoTipo = 4 and @CodigoRenglon = 19
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
						select Externas.Año,Externas.Mes,Externas.CodigoLinea,Externas.CodigoEmpresa,Externas.CodigoCentro,
						@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
						Externas.Valor+Internas.Valor+FacMec.Valor+FacCol.Valor Valor,Getdate() FechaGeneración
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
						select Externas.Año,Externas.Mes,Externas.CodigoLinea,Externas.CodigoEmpresa,Externas.CodigoCentro,
						@CodigoTipo CodigoTipo,@CodigoRenglon CodigoRenglon,
						Externas.Valor+Internas.Valor+FacMec.Valor+FacCol.Valor Valor,Getdate() FechaGeneración
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


		-- UTILIDAD RP    Este concepto tiene problemas por que no hay de donde sacar la empresa ni en centro de la consulta a las presentaciones

			--IF @CodigoTipo = 4 and @CodigoRenglon = 21 
			--BEGIN

			--	SET @msg = @Msg + 'Ok'

			--	insert into cMandos_Datos
			--		select Año,Mes,0 CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo ,@CodigoRenglon CodigoRenglon,ID.Valor,getdate()
			--		from (
			--			select Año,Mes,CodigoPresentacion,CodigoSede,Valor 
			--			from Test_InformesComiteDB.dbo.vw_InformesDefinitivos 
			--			where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 30002
			--		) ID 


			--END

		-- Valor Inventario

			IF @CodigoTipo = 4 and @CodigoRenglon = 22 
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,
					@CodigoTipo CodigoTipo ,@CodigoRenglon,sum(isnull(ID.Valor,0)) Valor,getdate() 
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede,CodigoCentroREP,REP 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
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
