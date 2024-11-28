# View: vw_RepuestosV2_Bolsas_Administrativa_4

## Usa los objetos:
- [[vw_RepuestosV2_Bolsas_Administrativa_3]]

```sql

CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_4]
AS
--SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, cod_marca, CodigoCentro, SUM(PesoTotal) AS PesoTotalConsolidado
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, cod_marca, CodigoCentro, SUM(PesoAsignadoBolsa) AS PesoTotalConsolidado -- JCS: 2023/05/18 - FUE NECESARIO MODIFICARLO PARA AJUSTAR LOS PESOS
FROM            dbo.vw_RepuestosV2_Bolsas_Administrativa_3
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, cod_marca, CodigoCentro

```
