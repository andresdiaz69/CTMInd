# Stored Procedure: sp_Nuevos_Finanzauto2

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[spiga_TipoClasificacionesVehiculos]]
- [[spiga_TipoDeVentasVehiculos]]
- [[spiga_Vehiculos]]

```sql
--Vehiculos Nuevos Finanzauto2-51.840
--DROP   PROCEDURE sp_Nuevos_Finanzauto2
CREATE PROCEDURE sp_Nuevos_Finanzauto2
   @idEmpresa INT,  
   @Ano INT,  
   @Mes INT
AS   
		SELECT DISTINCT [Mes/Año], Marca, Clase, carroceria, Referencia1, Referencia2, Modelo, Condicion, Licencia, Kilometraje, NumeroFactura
		, sede, Gama, FechaFactura, cantidad, Combustible
		FROM (
			  SELECT [Mes/Año],Marca,Clase =  Clase, carroceria, Referencia1, Referencia2, Modelo, Condicion, a.Ano_Periodo, a.Mes_Periodo, Kilometraje, NumeroFactura 
			  , a.Gama, a.FechaFactura, cantidad, a.Combustible, sede
			  , Licencia= case  
			  WHEN TipoVenta LIKE '%Particular%'                    THEN 'Particular'
			  WHEN TipoVenta LIKE '%Publico%'                       THEN 'Público'
			  WHEN TipoVenta LIKE '%Público%'                       THEN 'Público'
			  WHEN TipoVenta LIKE '%Oficial%'                       THEN 'Oficial'	  
			  WHEN TipoVenta LIKE '%Empleados%'                     THEN 'Particular'
			  WHEN TipoVenta LIKE '%Siniestrado%'                   THEN 'Particular'
			  WHEN TipoVenta LIKE '%Ventas a Otros Concesionarios%' THEN 'Particular'
			  WHEN TipoVentaMarca LIKE '%Particular%'               THEN 'Particular'
			  ELSE '' END 
			  FROM(
				   SELECT 'Mes/Año'= convert(varchar,month(v.FechaEntregaCliente)) + '/' + convert(varchar,year(v.FechaEntregaCliente)) 
				   , v.Marca,Referencia1 = v.Gama,Referencia2=v.Modelo, Modelo = v.AñoModelo,Condicion='Nuevo',Kilometraje=0 
				   , Clase = m.NombreClasificacion, t.TipoVenta, t.TipoVentaMarca, v.NumeroFactura, v.nit, v.nombreTercero, c.carroceria, espacio = ' '
				   , v.Ano_Periodo, v.Mes_Periodo, v.Codigoempresa, v.Empresa, v.Gama, v.FechaFactura, cantidad='1', c.Combustible, sede=v.Centro
				   FROM [DBMLC_0190].dbo.ComisionesSpigaVN v	  
				   LEFT JOIN [PSCService_DB].[dbo].spiga_TipoClasificacionesVehiculos m ON m.PkFkMarcas = v.CodigoMArca
																						AND m.PkFkGamas = v.CodigoGama	
																						AND v.CodigoModelo COLLATE DATABASE_DEFAULT = m.PkCodModelo 
																						AND m.PkAnoModelo  COLLATE DATABASE_DEFAULT = v.AñoModelo	
		 FULL JOIN [PSCService_DB].[dbo].[spiga_TipoDeVentasVehiculos] t ON v.NumeroFactura = t.Factura AND t.vin = v.vin	   
		 LEFT JOIN (SELECT  VIN, Combustible, carroceria FROM (SELECT VIN, Combustible, carroceria, orden= row_number() over (partition by VIN order by Combustible desc)
			        FROM [PSCService_DB].dbo.spiga_Vehiculos )a WHERE orden =1) c ON c.vin = v.VIN 
		 WHERE v.Codigoempresa in (1,6,24)  
		 AND t.TipoVenta NOT IN ('Venta Interna')
		 AND v.marca NOT IN ('John Deere Agrícola', 'Hamm', 'Implementos', 'Wirtgen', 'John Deere Construccion', 'John Deere Golf & Turf', 'VÖGELE', 'KLEEMANN', 'CIBER')
		 AND v.EntregaEfectiva = 1
		 AND v.nit NOT IN ('8300049938','9002830997') 
       )a
	   WHERE Codigoempresa=@idEmpresa AND Ano_Periodo = @Ano AND Mes_Periodo = @Mes    
  )b
 
 
```
