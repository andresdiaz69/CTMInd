# View: v_CentroViaticos

## Usa los objetos:
- [[UnidadDeNegocio]]

```sql

create VIEW [dbo].[v_CentroViaticos]
AS
select distinct LTRIM(RTRIM(CodUnidadNegocio)) CodUnidadNegocio, LTRIM(RTRIM(CodCentro)) CodCentro, NombreCentro
from UnidadDeNegocio

```
