# View: vw_ActivosFijos

## Usa los objetos:
- [[spiga_ActivosFijos]]

```sql
CREATE  view [dbo].[vw_ActivosFijos] as
 select  ano_periodo,mes_periodo,IdEmpresas,SUBSTRING(IdContCtasInmovilizado,1,4)IdContCtasInmovilizado,
ValorAmortizable=isnull(ValorAmortizable*porcentaje,0),AmortizacionAcumulada= isnull(AmortizacionAcumulada*porcentaje,0),
IdCentrosDesg,NombreCentroDesg
from [PSCService_DB].dbo.spiga_ActivosFijos with (nolock) 
where FechaBaja is null
  --and Ano_Periodo = 2023
  --and Mes_Periodo = 5
  --and idempresas =5

```
