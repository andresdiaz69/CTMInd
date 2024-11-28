# Stored Procedure: SPIGA_auditoria_Creacion_referencias

## Usa los objetos:
- [[spiga_AuditoriaCreacionDeReferencias]]

```sql

CREATE procedure [dbo].[SPIGA_auditoria_Creacion_referencias]

@fecha_ini datetime,
@fecha_fin datetime

as

select distinct a.MR, a.DescMR, a.Referencia, a.Descripcion, a.Clasificacion1, a.Clasificacion2, a.Clasificacion3, a.Clasificacion4, a.Clasificacion5,
a.Clasificacion6, a.PrecioCompra, a.PrecioVenta, a.UndEnvaseCompra, a.UndEnvaseVenta, a.CodPartidaArancelaria, a.PartidaArancelaria, a.Fabricante,
a.Marca, a.Gama, a.CodModelo, a.Peso, a.Alto, a.Ancho, a.Largo, a.Volumen, a.FechaAlta
from PSCService_DB.dbo.spiga_AuditoriaCreacionDeReferencias a
where a.FechaAlta > = @fecha_ini
and  a.FechaAlta <= @fecha_fin 

```
