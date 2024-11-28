# View: v_emp_centro_seccion_spiga

## Usa los objetos:
- [[EmpresasCentrosSecciones]]

```sql
CREATE view [dbo].[v_emp_centro_seccion_spiga] as
select Empresa_centro_seccion=convert(varchar,CodigoEmpresa) + convert(varchar,CodigoCentro) + convert(varchar,CodigoSeccion)
from [DBMLC_0190].DBO.EmpresasCentrosSecciones
where CodigoEmpresa In (1,3,4,5,6,22)

```
