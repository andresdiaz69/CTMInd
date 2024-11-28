# View: V_SST_ExternoSalud

## Usa los objetos:
- [[GTH_Emplea_Externo]]
- [[SST_ClasificaExterno]]

```sql
CREATE VIEW [dbo].[V_SST_ExternoSalud]
AS
SELECT        Respo.cod_emp_ext, Respo.nom_emp_ext
FROM            dbo.GTH_Emplea_Externo AS Respo INNER JOIN
                         dbo.SST_ClasificaExterno AS Clasif ON Clasif.cod_clas = Respo.cod_clas
WHERE        (Clasif.cod_clas = '6')

```
