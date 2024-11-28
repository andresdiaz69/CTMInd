# View: vw_ComisionesFinanciacionAsesoresOrdenFin

## Usa los objetos:
- [[spiga_FinanciacionesVentasVnVo]]

```sql
CREATE view [dbo].[vw_ComisionesFinanciacionAsesoresOrdenFin] as
select orden = ROW_NUMBER() over (partition by f.vin order by convert(int,f.idsincronizacionspiga) desc),
f.NombreEmpresa,f.IdCentros,f.NombreCentro,f.IdEmpleados,f.NombreEmpleado,
f.IdMarcas,f.IdEmpleadosGestor,f.NombreGestor,f.ImporteFinanciado,f.vin
--from [PSCService_DB].dbo.spiga_ComisionesFinanciacion	f
from [PSCService_DB].dbo.spiga_FinanciacionesVentasVnVo f
where f.ImporteFinanciado > 0
and f.FechaInicio > '20210331'
and f.FechaEntregaCliente is not null
--and   f.vin like '%3MVDM2W7APL203798%'
--and a.Ano_Periodo = 2022
--and a.Mes_Periodo = 5

```
