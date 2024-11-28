# View: v_HojasDeGastosPendientes

## Usa los objetos:
- [[spiga_HojasDeGastosPendientes]]
- [[v_EmpleadosSpiga]]

```sql
CREATE view [dbo].[v_HojasDeGastosPendientes] as
select h.Ano_Periodo,h.Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,FechaFactura,FechaAsiento,IdAsientos,IdAñoAsiento,
h.IdTerceros,NombreTercero,Concepto,IdSeries,IdNumFactura,IdAñoFactura,ImporteBI,ImporteBE,ImporteBNS,ImporteTotalFactura,
DescripcionPagoFormas,IdMonedas,FactorCambioMoneda,FactorCambioMonedaContravalor,
e.NifCif,e.estado,e.codigo_centro,e.nombre_centro
from		[PSCService_DB].dbo.spiga_HojasDeGastosPendientes	h
left join	v_EmpleadosSpiga									e	on	h.IdTerceros = e.IdTerceros
--where h.Ano_Periodo = 2021
--and h.Mes_Periodo = 8

```
