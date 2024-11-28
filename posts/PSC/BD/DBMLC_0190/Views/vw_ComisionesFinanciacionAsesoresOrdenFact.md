# View: vw_ComisionesFinanciacionAsesoresOrdenFact

## Usa los objetos:
- [[spiga_FacturasCargosAdicionales]]

```sql
CREATE view [dbo].[vw_ComisionesFinanciacionAsesoresOrdenFact] as
select orden = ROW_NUMBER() over (partition by a.vin order by convert(int,a.idsincronizacionspiga) desc),
a.Ano_Periodo,a.Mes_Periodo,a.IdEmpresas,a.vin,IdTercerosFinanciera=a.IdTerceros,NombreFinanciera=a.Nombre,a.NombreMarca,
Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.Nombre,a.BaseImponible,a.TotalFactura,
a.FechaFactura
from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
where a.IdEmpresas = 1
and a.FechaFactura > '20210331'
and a.IdFacturaCargoAdicionalTipos in (1,19)
and a.BaseImponible > 0
--and a.vin in ('MMBJLKL10PH000371','MMBJLKL10PH000357')
--and a.Ano_Periodo = 2022
--and a.Mes_Periodo = 5
union all
select orden = ROW_NUMBER() over (partition by a.vin order by convert(int,a.idsincronizacionspiga) desc),
a.Ano_Periodo,a.Mes_Periodo,a.IdEmpresas,a.vin,IdTercerosFinanciera=a.IdTerceros,NombreFinanciera=a.Nombre,a.NombreMarca,
Factura= a.SerieFactura + '/' + a.NumFactura + '/' + a.AñoFactura,a.IdTerceros,a.Nombre,a.BaseImponible,a.TotalFactura,
a.FechaFactura
from		[PSCService_DB].dbo.spiga_FacturasCargosAdicionales	a
where a.IdEmpresas = 6
and a.FechaFactura > '20210331'
and a.IdFacturaCargoAdicionalTipos in (9,14)
and a.BaseImponible > 0
--AND a.vin in ('MMBJLKL10PH000371','MMBJLKL10PH000357')
--and a.Ano_Periodo = 2022
--and a.Mes_Periodo = 5

```
