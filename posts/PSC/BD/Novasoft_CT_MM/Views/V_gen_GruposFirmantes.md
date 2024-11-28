# View: V_gen_GruposFirmantes

## Usa los objetos:
- [[gen_aplicacion_firmantes]]
- [[gen_grupos_firmantes]]

```sql
CREATE VIEW [dbo].[V_gen_GruposFirmantes]
AS
SELECT        G.cod_grup_firm, G.des_grup_firm, A.cod_apl
FROM            dbo.gen_grupos_firmantes AS G INNER JOIN
                         dbo.gen_aplicacion_firmantes AS A ON G.cod_grup_firm = A.cod_grup_firm

```
