# View: v_GMF_1_ValorMensualGMF_USC

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql
CREATE view [dbo].[v_GMF_1_ValorMensualGMF_USC] as
select Año=year(FechaAsiento), Mes=month(FechaAsiento),IdEmpresas,NombreEmpresa,cuenta,centro,NombreCentro,
Valor=sum(debe)-sum(haber)
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos
where IdEmpresas in (1,6) 
and Cuenta = '5215955005'
and centro in (48,78)
--and year(FechaAsiento) = 2021
--and month(FechaAsiento) = 3
group by year(FechaAsiento), month(FechaAsiento),IdEmpresas,NombreEmpresa,cuenta,centro,NombreCentro


```
