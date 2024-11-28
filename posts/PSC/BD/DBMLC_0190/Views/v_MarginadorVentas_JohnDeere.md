# View: v_MarginadorVentas_JohnDeere

## Usa los objetos:
- [[v_MarginadorMostradorJohnDeere]]
- [[v_MarginadorTallerJohnDeere]]

```sql

CREATE view [dbo].[v_MarginadorVentas_JohnDeere] as
select distinct año,mes,IdEmpresas,
CodMarca, 
marca,
		NumeroFactura,FechaFactura
from(
		select año,mes,IdEmpresas,--IdCentros,NombreCentro,IdSecciones,NombreSeccion,
		CodMarca=convert(varchar,CodMarcaNuevo),MarcaNueva marca,NumeroFactura,FechaFactura--,valor
		from v_MarginadorTallerJohnDeere
		union all
		select año,mes,Codigoempresa,--CodigoCentro,Centro,Codigoseccion,Seccion,
		CodMarcaNuevo CodMarca,MarcaNueva marca,NumeroFactura,FechaFactura--,valor
		from v_MarginadorMostradorJohnDeere
)a 
--where año = 2021
--and mes= 9

```
