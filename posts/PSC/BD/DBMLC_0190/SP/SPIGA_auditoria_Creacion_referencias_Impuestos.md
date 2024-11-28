# Stored Procedure: SPIGA_auditoria_Creacion_referencias_Impuestos

## Usa los objetos:
- [[spiga_AuditoriaCreacionDeReferenciasImpuestos]]

```sql


CREATE procedure [dbo].[SPIGA_auditoria_Creacion_referencias_Impuestos]

@fecha_ini	datetime,
@fecha_fin datetime

as

select distinct a.IdConsecutivo, a.Ano_Periodo, a.Mes_Periodo, a.FechaDeCorte, a.MR, a.PkReferencias, a.Descripcion, a.Empresa,
a.Centro, a.PrecioMedio, a.descImpuesto, a.Porc, a.fechaalta
from [PSCService_DB].dbo.spiga_AuditoriaCreacionDeReferenciasImpuestos a
where a.FechaAlta > = @fecha_ini
	and  a.FechaAlta <= @fecha_fin	

```
