# Stored Procedure: usp_CotizacionSeguros

## Usa los objetos:
- [[spiga_CotizacionSeguros]]

```sql

CREATE procedure [usp_CotizacionSeguros] (@IdEmpresas smallint, @mes int, @año int)
AS

SELECT CodigoEmpresa,  Empresa, CodigoCentro,  NombreCentro,  CodigoSeccion, NombreSeccion,NombresCliente, 
	   CedulaCliente,  FechaDeNacimiento, Direccion,   Telefono, Celular,  CorreoElectronico,
	   Ocupacion,  Genero, Placa,  Marca,  Gama,  Modelo,  Año, Servicio,  Motor,
	   VIN,  Color, Cilindrada, NumeroPasajeros, CiudadMatricula
  FROM [PSCService_DB]..spiga_CotizacionSeguros t1
 where CodigoEmpresa=@IdEmpresas 
   and month(FechaEntregaCliente)=@mes 
   and year(FechaEntregaCliente)=@año 


```
