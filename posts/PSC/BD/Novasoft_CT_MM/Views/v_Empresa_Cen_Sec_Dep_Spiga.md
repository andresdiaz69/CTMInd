# View: v_Empresa_Cen_Sec_Dep_Spiga

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]

```sql
CREATE view [dbo].[v_Empresa_Cen_Sec_Dep_Spiga] as
select Cod_empresa, Nombre_Empresa,Cod_Centro, Nombre_Centro,Cod_seccion,Nombre_Seccion,Cod_Departamento,Nombre_Departamento
from	[PSCService_DB].[dbo].[spiga_EstructuraDeCostos]				
where Cod_empresa in (1,3,4,5,6,22)

```
