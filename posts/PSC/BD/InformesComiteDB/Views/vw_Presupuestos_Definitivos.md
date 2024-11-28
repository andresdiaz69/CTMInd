# View: vw_Presupuestos_Definitivos

## Usa los objetos:
- [[Presupuestos_Definitivos]]
- [[Presupuestos_Jerarquias]]
- [[vw_Presupuestos_CentrosPorLinea]]

```sql

CREATE VIEW [dbo].[vw_Presupuestos_Definitivos]
AS
SELECT dbo.Presupuestos_Jerarquias.IdJerarquia, dbo.Presupuestos_Jerarquias.Nivel1, dbo.Presupuestos_Jerarquias.Nivel2, dbo.Presupuestos_Jerarquias.Nivel3, dbo.Presupuestos_Jerarquias.Nivel4, 
       dbo.Presupuestos_Jerarquias.Nivel5, dbo.Presupuestos_Jerarquias.Nivel6, dbo.Presupuestos_Jerarquias.CodigoConcepto, dbo.Presupuestos_Jerarquias.NombreConcepto, dbo.Presupuestos_Jerarquias.Editable, 
       dbo.Presupuestos_Definitivos.Ano_Periodo, dbo.Presupuestos_Definitivos.Mes_Periodo, vw_Presupuestos_CentrosPorLinea.NombreCentro, dbo.Presupuestos_Definitivos.CodigoCentro, dbo.Presupuestos_Definitivos.CodigoLinea, dbo.Presupuestos_Definitivos.Valor
  FROM dbo.Presupuestos_Definitivos 
 INNER JOIN dbo.Presupuestos_Jerarquias 
         ON dbo.Presupuestos_Definitivos.IdJerarquia = dbo.Presupuestos_Jerarquias.IdJerarquia
 INNER JOIN vw_Presupuestos_CentrosPorLinea 
         ON Presupuestos_Definitivos.CodigoCentro = vw_Presupuestos_CentrosPorLinea.codCentro

```
