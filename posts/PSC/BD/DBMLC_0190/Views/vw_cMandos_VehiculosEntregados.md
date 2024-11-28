# View: vw_cMandos_VehiculosEntregados

## Usa los objetos:
- [[spiga_VehiculosEntregados]]

```sql






CREATE VIEW [dbo].[vw_cMandos_VehiculosEntregados]
AS
SELECT CodigoEmpresa,CodigoCentro,Ano_Periodo, Mes_Periodo,sum(Cantidad) Cantidad, sum(Valor) Valor,tipo
FROM PSCService_DB.dbo.spiga_VehiculosEntregados
GROUP BY CodigoEmpresa,CodigoCentro,Ano_Periodo, Mes_Periodo,tipo

```
