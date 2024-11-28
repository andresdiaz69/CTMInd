# Stored Procedure: sp_cMandos_Usados

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[cMandos_Lineas]]
- [[vw_cMandos_ComisionesSpigaVOFechaFactura]]
- [[vw_cMandos_InformesDefinitivos]]
- [[vw_cMandos_InventarioVO]]
- [[vw_cMandos_VehiculosEntregados]]

```sql




CREATE PROCEDURE [dbo].[sp_cMandos_Usados] 
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


	PRINT '------------------- USADOS ------------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 3)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 3
	END

	DECLARE Cursor_Estructura CURSOR FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 3

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN
		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '
		
		-- VO FACTURAS 

			IF @CodigoTipo = 3 and @CodigoRenglon = 1
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- VO UNIDADES FACTURAS

			IF @CodigoTipo = 3 and @CodigoRenglon = 2
			BEGIN
				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
				@CodigoRenglon CodigoRenglon,isnull(FU.Cantidad,0) Cantidad,getdate() FechaGeneracion
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
					FROM [dbo].[cMandos_Lineas]
					WHERE CodigoLinea not in (28,29) and Activo = 1 
				) CML LEFT JOIN	vw_cMandos_ComisionesSpigaVOFechaFactura FU
				ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
				and Ano_Periodo = @Año and Mes_Periodo = @Mes
				order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- VO VALORES FACTURAS

			IF @CodigoTipo = 3 and @CodigoRenglon = 3
			BEGIN
				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,sum(isnull(FU.TotalFactura,0)-isnull(FU.ImporteImpuestos,0)) Valor,getdate() FechaGeneracion
					from 
					(SELECT DISTINCT [CodigoLinea]
							  ,[CodigoEmpresa]
							  ,[CodigoCentro]
							  ,[CRM]
							  ,[VN]
							  ,[VU]
							  ,[REP]
							  ,[TMEC]
							  ,[TCOL]
						  FROM [dbo].[cMandos_Lineas]
						  WHERE CodigoLinea not in (28,29) and Activo = 1 
					) CML left join vw_cMandos_ComisionesSpigaVOFechaFactura FU
					ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
					and Ano_Periodo = @Año and Mes_Periodo = @Mes
					group by CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro
					order by CodigoLinea,CodigoEmpresa,CodigoCentro 

			END

		-- VO ENTREGAS 

			IF @CodigoTipo = 3 and @CodigoRenglon = 4
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					WHERE CodigoLinea not in (28,29) and Activo = 1 
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end		

		-- VO ENTREGAS UNIDADES 

			IF @CodigoTipo = 3 and @CodigoRenglon = 5
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(FU.Cantidad,0) Cantidad,getdate() FechaGeneracion
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
						  FROM [dbo].[cMandos_Lineas]
						  WHERE CodigoLinea not in (28,29) and Activo = 1 
					) CML LEFT JOIN  vw_cMandos_VehiculosEntregados FU
					ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
					and Ano_Periodo = @Año and Mes_Periodo = @Mes and Tipo = 'Usados'
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro
			END

		-- VO ENTREGAS VALORES 

			IF @CodigoTipo = 3 and @CodigoRenglon = 6
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Año,@Mes Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor 
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 48
					) ID 
					ON ID.CodigoPresentacion = LN.CodigoLinea and ID.CodigoSede = LN.CodigoSede 
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- VO ENTREGAS COSTO 

			IF @CodigoTipo = 3 and @CodigoRenglon = 7
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Año,@Mes Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,sum(isnull(Valor,0)) Valor 
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto in (366,367,368)
						group by Año,Mes,CodigoPresentacion,CodigoSede
					) ID 
					ON ID.CodigoPresentacion = LN.CodigoLinea and ID.CodigoSede = LN.CodigoSede 
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- VO UTILIDAD VH

			IF @CodigoTipo = 3 and @CodigoRenglon = 8
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Año,@Mes Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor 
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 30001
					) ID 
					ON ID.CodigoPresentacion = LN.CodigoLinea and ID.CodigoSede = LN.CodigoSede 
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro
			END

		-- MARGEN

			IF @CodigoTipo = 3 and @CodigoRenglon = 9
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
						select @Año,@Mes,Valor.CodigoLinea,Valor.CodigoEmpresa,Valor.CodigoCentro,@CodigoTipo,@CodigoRenglon,
						case 
							when isnull(Valor.Valor,0) >0 then (1-(isnull(Costo.Valor,0)/isnull(Valor.Valor,0))) 
							else 0 end 
						Valor,
						Getdate() FechaGeneración
						FROM (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo and CodigoRenglon = 6) Valor	
						LEFT JOIN (select * from cMandos_Datos where año = @Año and mes = @Mes and CodigoTipo = @CodigoTipo  and CodigoRenglon = 7) Costo
						ON Valor.CodigoLinea = Costo.CodigoLinea and
						Valor.CodigoCentro = Costo.CodigoCentro and
						Valor.CodigoEmpresa = Costo.CodigoEmpresa

			END

		-- VO STOCK 

			IF @CodigoTipo = 3 and @CodigoRenglon = 10
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- STOCK UNIDADES

			IF @CodigoTipo = 3 and @CodigoRenglon = 11
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(IVN.Cantidad,0) Cantidad,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,Count(*) Cantidad
						from  vw_cMandos_InventarioVO
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						and UsoDestino = 'Stock VU'
						and IdCompraEstados = 'D'
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VO STOCK VALOR

			IF @CodigoTipo = 3 and @CodigoRenglon = 12
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(IVN.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum(isnull(BaseImponibleCompra,0)+isnull(GastosAumentanStock,0)+isnull(GastosPendientesAumentanStock,0)) Valor
						from  vw_cMandos_InventarioVo
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						and UsoDestino = 'Stock VU'
						and IdCompraEstados = 'D'
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VO INVENTARIO 

			IF @CodigoTipo = 3 and @CodigoRenglon = 13
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- VO INVENTARIO UNIDADES

			IF @CodigoTipo = 3 and @CodigoRenglon = 14
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(IVN.Cantidad,0) Cantidad,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,COUNT(*) Cantidad
						from  vw_cMandos_InventarioVO
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VO INVENTARIO VALOR

			IF @CodigoTipo = 3 and @CodigoRenglon = 15
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,LN.CodigoEmpresa,LN.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(IVN.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum(isnull(BaseImponibleCompra,0)+isnull(GastosAumentanStock,0)+isnull(GastosPendientesAumentanStock,0)) Valor
						from  vw_cMandos_InventarioVo
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

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
