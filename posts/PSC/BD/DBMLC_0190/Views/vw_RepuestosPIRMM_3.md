# View: vw_RepuestosPIRMM_3

## Usa los objetos:
- [[vw_RepuestosPIRMM_3_Detalle]]

```sql

CREATE VIEW [dbo].[vw_RepuestosPIRMM_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro, MAX(PIRPorcentaje) AS PIRPorcentaje, MAX(PIRPuntos) AS PIRPuntos, SUM(ValorNetoTaller) AS ValorNetoTaller
FROM            dbo.vw_RepuestosPIRMM_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, Empresa, CodigoSede, NombreSede, CodigoCentro, NombreCentro




```
