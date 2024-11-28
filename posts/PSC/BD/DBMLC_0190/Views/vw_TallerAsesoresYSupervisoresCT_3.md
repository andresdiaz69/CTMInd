# View: vw_TallerAsesoresYSupervisoresCT_3

## Usa los objetos:
- [[vw_TallerAsesoresYSupervisoresCT_3_Detalle]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_3]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaAsesorServicioResponsable, MAX(ValorVariable) AS ValorVariable, SUM(ValorNeto_MO) AS ValorNeto_MO, SUM(ValorNeto_MO) / MAX(ValorVariable) AS ValorBase_MO
FROM            dbo.vw_TallerAsesoresYSupervisoresCT_3_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaAsesorServicioResponsable


```
