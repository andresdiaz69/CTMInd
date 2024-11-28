# Stored Procedure: sp_cMandos_Nuevos

## Usa los objetos:
- [[cMandos_Datos]]
- [[cMandos_Estructura]]
- [[cMandos_Lineas]]
- [[cMandos_Lineas]]
- [[vw_cMandos_ComisionesSpigaVNFechaFactura]]
- [[vw_cMandos_InformesDefinitivos]]
- [[vw_cMandos_InventarioVN]]
- [[vw_cMandos_VehiculosEntregados]]

```sql
CREATE PROCEDURE [dbo].[sp_cMandos_Nuevos] 
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

	PRINT '------------------- NUEVOS ------------------------'

	IF EXISTS(Select * from cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 2)
	BEGIN
		PRINT 'Inicializando datos del mes'
		DELETE FROM cMandos_Datos where Año = @Año and Mes = @Mes and CodigoTipo = 2
	END

	DECLARE Cursor_Estructura CURSOR LOCAL FOR
		SELECT CodigoTipo,CodigoRenglon,NombreRenglon 
		FROM cMandos_Estructura
		where CodigoTipo = 2

	OPEN Cursor_Estructura

	FETCH NEXT FROM Cursor_Estructura INTO @CodigoTipo,@CodigoRenglon,@NombreRenglon

	WHILE @@fetch_status = 0
	BEGIN
		set @Msg = @NombreRenglon + '(' + CAST(@CodigoTipo AS VARCHAR) + ',' + CAST(@CodigoRenglon AS VARCHAR) + ')...  '
		
		-- VN FACTURAS 

			IF @CodigoTipo = 2 and @CodigoRenglon = 1
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end		

		-- VN UNIDADES FACTURAS

			IF @CodigoTipo = 2 and @CodigoRenglon = 2
			BEGIN
				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,isnull(FU.Cantidad,0) Cantidad,getdate() FechaGeneracion
					from  (
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
						--ORDER BY  [CodigoLinea],[CodigoEmpresa],[CodigoCentro]
					) CML LEFT JOIN vw_cMandos_ComisionesSpigaVNFechaFactura FU
					ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
					and Ano_Periodo = @Año and Mes_Periodo = @Mes
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro

			END

		-- VN VALORES FACTURAS

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 3
			BEGIN
				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
					@CodigoRenglon CodigoRenglon,sum(isnull(FU.TotalFactura,0)-isnull(FU.ImporteImpuestos,0)) Valor ,getdate() FechaGeneracion
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
					) CML LEFT JOIN vw_cMandos_ComisionesSpigaVNFechaFactura FU
					ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
					and Ano_Periodo = @Año and Mes_Periodo = @Mes	
					group by CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro
					Order by CodigoLinea,CodigoEmpresa,CodigoCentro	

			END

		-- VN ENTREGAS 

			IF @CodigoTipo = 2 and @CodigoRenglon = 4
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- VN ENTREGAS UNIDADES 

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 5
			BEGIN

				SET @msg = @Msg + 'Ok'

				IF object_id(N'tempdb.dbo.#cMandos_Temporal_Entregas', N'U') is not null
					DROP TABLE #cMandos_Temporal_Entregas 
		
				insert into cMandos_Datos
				select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CML.CodigoEmpresa,CML.CodigoCentro,@CodigoTipo CodigoTipo,
				@CodigoRenglon CodigoRenglon,isnull(FU.Cantidad,0) Valor,getdate() FechaGeneracion
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
				) CML LEFT JOIN vw_cMandos_VehiculosEntregados FU
				ON FU.Codigoempresa = CML.CodigoEmpresa and FU.CodigoCentro = CML.CodigoCentro
				and Ano_Periodo = @Año and Mes_Periodo = @Mes  and Tipo = 'Nuevos'
				Order by CodigoLinea,CodigoEmpresa,CodigoCentro	

			END

		-- VN ENTREGAS VALORES 

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 6
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo ,@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 18) ID 
					ON 
					ID.CodigoPresentacion = LN.CodigoLinea and
					ID.CodigoSede = LN.CodigoSede  	

			END

		-- VN ENTREGAS COSTO 

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 7
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo ,@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor 
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 365) ID 
					ON 
					ID.CodigoPresentacion = LN.CodigoLinea and
					ID.CodigoSede = LN.CodigoSede  	

			END

		-- VN UTILIDAD VH

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 8
			BEGIN

				SET @msg = @Msg + 'Ok'

				insert into cMandos_Datos
					select @Año Ano_Periodo,@Mes Mes_Periodo,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo CodigoTipo ,@CodigoRenglon CodigoRenglon,isnull(ID.Valor,0) Valor,getdate()
					from (
						select CodigoLinea,CodigoEmpresa,CodigoCentro,CodigoSede 
						from cMandos_Lineas 
						WHERE CodigoLinea not in (28,29) and Activo = 1 
					) LN
					Left Join (
						select Año,Mes,CodigoPresentacion,CodigoSede,isnull(Valor,0) Valor 
						from vw_cMandos_InformesDefinitivos 
						where Balance = 17 and Año = @Año and Mes = @Mes and CodigoConcepto = 30000) ID 
					ON 
					ID.CodigoPresentacion = LN.CodigoLinea and
					ID.CodigoSede = LN.CodigoSede  	

			END

		-- VN MARGEN

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 9
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

		-- VN STOCK

			IF @CodigoTipo = 2 and @CodigoRenglon = 10
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- VN STOCK UNIDADES

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 11
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
						from  vw_cMandos_InventarioVN
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						and UsoDestino = 'Stock VN'
						and IdCompraEstados = 'D'
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VN STOCK VALOR

			ELSE IF @CodigoTipo = 2 and @CodigoRenglon = 12
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
				--		select Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro,sum(isnull(PrecioListaAntesDeImpuestos,0)) Valor
						from  vw_cMandos_InventarioVN
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						and UsoDestino = 'Stock VN'
						and IdCompraEstados = 'D'
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VN INVENTARIO

			IF @CodigoTipo = 2 and @CodigoRenglon = 13
			begin
				insert into cMandos_Datos
					select distinct @Año,@Mes,CodigoLinea,CodigoEmpresa,CodigoCentro,@CodigoTipo,@CodigoRenglon,0,getdate() 
					from cMandos_Lineas
					order by CodigoLinea,CodigoCentro,CodigoEmpresa 
			end	

		-- VN INVENTARIO UNIDADES

			IF @CodigoTipo = 2 and @CodigoRenglon = 14
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
						from  vw_cMandos_InventarioVN
						where Ano_Periodo = @Año
						and Mes_Periodo = @Mes
						group by Ano_Periodo,Mes_Periodo,CodigoEmpresa,CodigoCentro
					) IVN
					ON 
					LN.CodigoEmpresa = IVN.CodigoEmpresa and
					LN.CodigoCentro = IVN.CodigoCentro  	

			END

		-- VN INVENTARIO VALOR

			IF @CodigoTipo = 2 and @CodigoRenglon = 15
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
						from  vw_cMandos_InventarioVN
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
