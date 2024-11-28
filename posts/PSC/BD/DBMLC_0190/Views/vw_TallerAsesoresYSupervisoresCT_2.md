# View: vw_TallerAsesoresYSupervisoresCT_2

## Usa los objetos:
- [[vw_TallerAsesoresYSupervisoresCT_2_Detalle]]

```sql
CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaAsesorServicioResponsable, MAX(ValorVariable) AS ValorVariable, SUM(ValorNeto_MAT) AS ValorNeto_MAT, SUM(ValorNeto_MAT) / MAX(ValorVariable) 
                         AS ValorBase_MAT
FROM            dbo.vw_TallerAsesoresYSupervisoresCT_2_Detalle
GROUP BY Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaAsesorServicioResponsable


```
