# View: v_gen_ProcesoFirmado

## Usa los objetos:
- [[Fn_rhh_NombreCompleto]]
- [[gen_ProcesoFirmado]]

```sql
CREATE VIEW [dbo].[v_gen_ProcesoFirmado]
AS
SELECT        cod_firm, dbo.Fn_rhh_NombreCompleto(cod_firm, 2) AS nom_firm
FROM            dbo.gen_ProcesoFirmado
GROUP BY cod_firm

```
