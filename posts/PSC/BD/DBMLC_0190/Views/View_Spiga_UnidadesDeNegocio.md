# View: View_Spiga_UnidadesDeNegocio

## Usa los objetos:
- [[UnidadDeNegocio]]

```sql
CREATE VIEW View_Spiga_UnidadesDeNegocio AS
SELECT CodUnidadNegocio, NombreUnidadNegocio FROM UnidadDeNegocio
GROUP BY CodUnidadNegocio, NombreUnidadNegocio

```
