# View: vw_ConsultaMonedaExtranjera

## Usa los objetos:
- [[Empresas]]
- [[spiga_CuentasPorPagar]]
- [[spiga_Terceros]]
- [[vw_vehiculosFechaEntrega]]

```sql
CREATE VIEW [dbo].[vw_ConsultaMonedaExtranjera] AS
SELECT Ano_Periodo,		        Mes_Periodo,			IdEmpresas,										NombreEmpresa,				IdTerceros,			
	   NombreTercero,			Factura,				FechaFactura,									FechaVencimiento,			IdMonedaOrigen,	    
	   DescripcionMoneda,		NombreDepartamento,		VIN,											FechaEntrega,				NombreCentro,		
	   FechaPago,				Valor = SUM(Valor),		ValorMonedaOrigen=SUM(ValorMonedaOrigen),		Saldo = SUM(Saldo),			SaldoMonedaOrigen=SUM(SaldoMonedaOrigen),
	   FactorCambioMoneda=SUM(FactorCambioMoneda),		NumRemesa,										FechaFicheroRemesa,
	   situacion
  FROM
       (SELECT Ano_Periodo,		    Mes_Periodo,		IdEmpresas,				NombreEmpresa,			IdTerceros,				NombreTercero,
		       Factura,				FechaFactura,		FechaVencimiento,		Valor,					ValorMonedaOrigen,		Saldo,
		       SaldoMonedaOrigen,	IdMonedaOrigen,		DescripcionMoneda,		NombreDepartamento,		VIN,					FechaEntrega,
		       NombreCentro,		NumRemesa,			FechaFicheroRemesa, situacion,
		       FechaPago=CASE WHEN FechaPago < FechaVencimiento THEN FechaPago ELSE FechaVencimiento END, FactorCambioMoneda
	      FROM
		       (SELECT Ano_Periodo,		        Mes_Periodo,				IdEmpresas,				NombreEmpresa,				
			           IdTerceros,				Factura,					FechaFactura,			FechaVencimiento,		
			           Valor=TotalFactura,		Saldo=ImportePendiente,		IdMonedaOrigen,			ValorMonedaOrigen=(TotalFactura * FactorCambioMoneda),
			           DescripcionMoneda,		NombreDepartamento,			VIN,					SaldoMonedaOrigen=(ImportePendiente * FactorCambioMoneda),
			           FechaEntrega,			NombreCentro,				NumRemesa,				FechaFicheroRemesa,
			           NombreTercero=REPLACE(REPLACE(REPLACE(UPPER(NombreTercero),' ','<>'),'><',''),'<>',' '), DescripcionSituacionEfectos situacion,
			           FechaPago=CASE WHEN Idterceros IN (245949,441634,460354) AND FechaEntrega IS NOT NULL THEN a.FechaPago ELSE FechaVencimiento END, FactorCambioMoneda
		          FROM
		              (SELECT c.Ano_Periodo,					c.Mes_Periodo,				c.IdEmpresas,				e.NombreEmpresa,						c.IdTerceros,						
				              t.NombreTercero,					c.factura,					c.FechaFactura,				c.FechaVencimiento,						c.IdSituacionEfectos,		
				              c.DescripcionSituacionEfectos,		c.Departamento,				c.NombreDepartamento,		c.TotalFactura,							c.ImportePendiente,		
				              c.NombreCentro,						c.NifCif,					c.IdPaises,					c.ciudad,								c.LimiteCredito,		
				              c.vin,								c.DescripcionSeccion,		c.FechaSaldado,				c.EstadoWF,								c.PagoBloqueado,
				              c.Referencia,						c.IdMonedaOrigen,			c.FactorCambioMoneda,		c.FactorCambioMonedaContravalor,		c.DescripcionMoneda,
				              c.NumRemesa,						c.FechaFicheroRemesa,		FechaEntrega=ISNULL(c.FechaEntregaVN,v.FechaEntregaCliente), 
				              FechaPago=DATEADD(d,-(DAY(DATEADD(m,1,ISNULL(c.FechaEntregaVN,v.FechaEntregaCliente)))),DATEADD(m,1,ISNULL(c.FechaEntregaVN,v.FechaEntregaCliente)))+10
			             FROM PSCService_DB.dbo.spiga_CuentasPorPagar c
			             LEFT JOIN (SELECT PkTerceros, 
					                       NombreTercero = MAX(ISNULL(Nombre, '')) + ' ' + MAX(ISNULL(Apellido1,'')) + ' ' + MAX(ISNULL(Apellido2,'')) 
				                      FROM [PSCService_DB].[dbo].[spiga_Terceros] c
				                     GROUP BY PkTerceros
			                        ) AS T on c.IdTerceros = t.PkTerceros
			             LEFT JOIN Empresas                     e   on	c.IdEmpresas = e.CodigoEmpresa
			             LEFT JOIN vw_vehiculosFechaEntrega		v	on  c.VIN = v.VIN
			            WHERE c.IdMonedaOrigen <> 3
			              AND c.IdMonedaOrigen IS NOT NULL
			              AND c.IdSituacionEfectos = 1
		            ) A
		      WHERE ImportePendiente <> 0
	       ) A
      ) A
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, IdTerceros, NombreTercero, Factura, FechaFactura, FechaVencimiento, 
	  IdMonedaOrigen, DescripcionMoneda, NombreDepartamento, VIN, FechaEntrega, NombreCentro, FechaPago, NumRemesa, FechaFicheroRemesa,situacion

```
