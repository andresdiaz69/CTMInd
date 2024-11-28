# View: vw_Vehiculos_Nuevos_Finanzauto

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[spiga_TipoDeVentasVehiculos]]
- [[vw_Spiga_ModelosVehiculos]]
- [[vw_vehiculos_Carroceria]]

```sql
--Vehiculos Nuevos
--DROP VIEW vw_Vehiculos_Nuevos_Finanzauto
CREATE VIEW [dbo].[vw_Vehiculos_Nuevos_Finanzauto] AS
SELECT DISTINCT [Mes/Año], Marca, Clase, carroceria, Referencia1, Referencia2, Modelo, Condicion, Licencia, Kilometraje, NumeroFactura
FROM (
SELECT [Mes/Año],Marca,Clase =  Clase,carroceria, Referencia1,Referencia2,Modelo,Condicion,
		Licencia= case  when TipoVenta like '%Particular%' then 'Particular'
				when TipoVenta like '%Publico%' then 'Público'
				when TipoVenta like '%Oficial%' then 'Oficial'
				when TipoVenta like '%Público%' then 'Público'
				when TipoVenta like '%Empleados%' then 'Particular'
				when TipoVenta like '%Siniestrado%' then 'Particular'
				when TipoVenta like '%Ventas a Otros Concesionarios%' then 'Particular'
				when TipoVentaMarca like '%Particular%' then 'Particular'
				else '' end,Kilometraje,NumeroFactura
		 FROM(
					SELECT  'Mes/Año'= convert(varchar,month(v.FechaEntregaCliente)) + '/' + convert(varchar,year(v.FechaEntregaCliente)),
					v.Marca,Referencia1 = v.Gama,Referencia2=v.Modelo, Modelo = v.AñoModelo,Condicion='Nuevo',Kilometraje=0,
					Clase = m.NombreClasificacion,t.TipoVenta,t.TipoVentaMarca,v.NumeroFactura,v.nit,v.nombreTercero,c.carroceria,
					espacio = ' '
					FROM		ComisionesSpigaVN									v
					left join	[PSCService_DB].[dbo].[vw_Spiga_ModelosVehiculos]	m	on	m.PkFkMarcas = v.CodigoMArca
																							and m.PkFkGamas  = v.CodigoGama	
																							and v.CodigoModelo COLLATE DATABASE_DEFAULT = m.PkCodModelo 
																							and m.PkAñoModelo COLLATE DATABASE_DEFAULT = v.AñoModelo	
					FULL join	[PSCService_DB].[dbo].[spiga_TipoDeVentasVehiculos]	t	on	v.NumeroFactura = t.Factura
																							and t.vin = v.vin
					left join   [dbo].[vw_vehiculos_Carroceria]						c	on	c.vin = v.VIN
					WHERE v.Codigoempresa in (1,6,24)
					--and year(v.FechaEntregaCliente) = 2022
					--and month(v.FechaEntregaCliente) in (5)
					and t.TipoVenta not in ('Venta Interna')
					and v.marca not in ('John Deere Agrícola','Hamm','Implementos','Wirtgen','John Deere Construccion','John Deere Golf & Turf',
					'VÖGELE','KLEEMANN','CIBER')
					and v.EntregaEfectiva = 1
					and v.nit not in ('8300049938','9002830997')
				)a
 )b
 

```
