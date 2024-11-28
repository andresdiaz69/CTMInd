# View: vw_InformesArbolesCuentas

## Usa los objetos:
- [[InformesArboles]]
- [[InformesDatosArbol]]

```sql

CREATE VIEW [dbo].[vw_InformesArbolesCuentas]
AS
SELECT        TOP (100) PERCENT a.Empresa, a.Balance, a.CodigoConcepto, 
                         CASE WHEN Nivel2 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel3 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel4 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel5 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel6 <> 0
                          THEN '    ' ELSE '' END + a.NombreConcepto AS NombreConcepto, a.Nivel1, a.Nivel2, a.Nivel3, a.Nivel4, a.Nivel5, a.Nivel6, a.Orden, a.ConceptoPresupuesto, 
                         CASE WHEN a.DebeHaber = '0' THEN '' ELSE a.DebeHaber END AS DebeHaber, ISNULL(b.Cuenta, '') AS Cuenta, ISNULL(b.NombreCuenta, '') AS NombreCuenta
FROM            dbo.InformesArboles AS a LEFT OUTER JOIN
                         dbo.InformesDatosArbol AS b ON a.Empresa = b.Empresa AND a.CodigoConcepto = b.CodigoConcepto AND a.Balance = b.Balance
WHERE        (a.Balance = 17)
ORDER BY a.Nivel1, a.Nivel2, a.Nivel3, a.Nivel4, a.Nivel5, a.Nivel6

```
