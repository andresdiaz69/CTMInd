# View: v_SeccionViaticos

## Usa los objetos:
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[v_SeccionViaticos]
AS
select distinct LTRIM(RTRIM(CodUnidadNegocio)) CodUnidadNegocio, LTRIM(RTRIM(CodCentro)) CodCentro, LTRIM(RTRIM(CodSeccion)) CodSeccion, NombreSeccion 
from UnidadDeNegocio

```
