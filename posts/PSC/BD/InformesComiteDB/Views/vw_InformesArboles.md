# View: vw_InformesArboles

## Usa los objetos:
- [[InformesArboles]]

```sql


CREATE VIEW [dbo].[vw_InformesArboles]
AS
SELECT        TOP (1000) Empresa, Balance, CodigoConcepto, 
                         CASE WHEN Nivel2 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel3 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel4 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel5 <> 0 THEN '    ' ELSE '' END + CASE WHEN Nivel6 <> 0
                          THEN '    ' ELSE '' END + NombreConcepto AS NombreConcepto, Nivel1, Nivel2, Nivel3, Nivel4, Nivel5, Nivel6, Orden, ConceptoPresupuesto, DebeHaber
FROM            dbo.InformesArboles
ORDER BY Balance, Nivel1, Nivel2, Nivel3, Nivel4, Nivel5, Nivel6

```
