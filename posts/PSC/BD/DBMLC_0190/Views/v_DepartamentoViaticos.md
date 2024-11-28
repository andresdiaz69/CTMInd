# View: v_DepartamentoViaticos

## Usa los objetos:
- [[UnidadDeNegocio]]

```sql

create VIEW [dbo].[v_DepartamentoViaticos]
AS
select distinct LTRIM(RTRIM(CodUnidadNegocio)) CodUnidadNegocio, LTRIM(RTRIM(CodCentro)) CodCentro, LTRIM(RTRIM(CodSeccion)) CodSeccion, 
 LTRIM(RTRIM(CodDepartamento)) CodDepartamento , NombreDepartamento 
from UnidadDeNegocio

```
